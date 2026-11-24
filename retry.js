(() => {
    const TIERS = [
        { name: 'BASIQUE', steps: 7, cells: 2 },
        { name: 'FACILE', steps: 10, cells: 3 },
        { name: 'MOYEN', steps: 13, cells: 4 },
        { name: 'DIFFICILE', steps: 16, cells: 5 },
        { name: 'TRÈS DIFFICILE', steps: 19, cells: 6 },
        { name: 'MASTER', steps: 25, cells: 8 }
    ];
    const NODE_HIT_RADIUS = [27, 24, 22, 20, 18, 16];
    const GRID_DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const MAX_FIGURE_ID = 0x100000000;
    const MAX_GENERATION_ATTEMPTS = 512;
    function emptyRunHistory() {
        return Array.from({ length: TIERS.length }, () => ({
            figureIndices: new Set()
        }));
    }
    let runHistory = emptyRunHistory();
    let usedTraceSignatures = new Set();
    let active = null;

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    function retryMessage(key, fallback) { return window.UI18n?.t(key) || fallback; }
    function createPRNG(seed) {
        let state = seed >>> 0;
        return () => {
            state = (state + 0x6D2B79F5) >>> 0;
            let value = state;
            value = Math.imul(value ^ (value >>> 15), value | 1);
            value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
    }
    function growCells(count, rand) {
        const cells = [{ x: 0, y: 0 }];
        const occupied = new Set(['0,0']);
        while (cells.length < count) {
            const frontier = new Map();
            cells.forEach(cell => GRID_DIRECTIONS.forEach(([dx, dy]) => {
                const x = cell.x + dx, y = cell.y + dy, key = `${x},${y}`;
                if (!occupied.has(key)) frontier.set(key, { x, y });
            }));
            const choices = [...frontier.values()];
            const next = choices[Math.floor(rand() * choices.length)];
            cells.push(next);
            occupied.add(`${next.x},${next.y}`);
        }
        return cells;
    }
    function canonicalCellSignature(cells) {
        const signatures = [];
        for (const swap of [false, true]) for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
            const transformed = cells.map(({ x, y }) => ({
                x: (swap ? y : x) * sx,
                y: (swap ? x : y) * sy
            }));
            const minX = Math.min(...transformed.map(cell => cell.x));
            const minY = Math.min(...transformed.map(cell => cell.y));
            signatures.push(transformed
                .map(cell => `${cell.x - minX},${cell.y - minY}`)
                .sort()
                .join(';'));
        }
        return signatures.sort()[0];
    }
    function buildCellGraph(cells) {
        const nodes = [], nodeIds = new Map(), edgeIds = new Set(), edges = [];
        function getNodeId(x, y) {
            const key = `${x},${y}`;
            if (!nodeIds.has(key)) {
                nodeIds.set(key, nodes.length);
                nodes.push({ x, y });
            }
            return nodeIds.get(key);
        }
        function addEdge(u, v) {
            const key = u < v ? `${u},${v}` : `${v},${u}`;
            if (edgeIds.has(key)) return;
            edgeIds.add(key);
            edges.push({ u, v, done: false });
        }
        cells.forEach(({ x, y }) => {
            const corners = [
                getNodeId(x, y), getNodeId(x + 1, y),
                getNodeId(x + 1, y + 1), getNodeId(x, y + 1)
            ];
            for (let i = 0; i < corners.length; i++) addEdge(corners[i], corners[(i + 1) % corners.length]);
        });
        return { nodes, edges, shapeSignature: canonicalCellSignature(cells) };
    }
    function analyzeGraph(nodes, edges) {
        const adjacency = nodes.map(() => []);
        const degree = Array(nodes.length).fill(0);
        edges.forEach(({ u, v }) => {
            adjacency[u].push(v);
            adjacency[v].push(u);
            degree[u]++;
            degree[v]++;
        });
        function reachableCount(start, excluded = -1) {
            if (start === excluded) return 0;
            const visited = new Set([start]), queue = [start];
            while (queue.length) {
                const node = queue.pop();
                adjacency[node].forEach(next => {
                    if (next !== excluded && !visited.has(next)) {
                        visited.add(next);
                        queue.push(next);
                    }
                });
            }
            return visited.size;
        }
        const connected = nodes.length > 0 && reachableCount(0) === nodes.length;
        let articulationPoints = 0;
        if (connected) {
            for (let excluded = 0; excluded < nodes.length; excluded++) {
                const start = excluded === 0 ? 1 : 0;
                if (reachableCount(start, excluded) !== nodes.length - 1) articulationPoints++;
            }
        }
        return {
            degree,
            oddNodes: degree.map((value, index) => value % 2 ? index : -1).filter(index => index >= 0),
            connected,
            articulationPoints
        };
    }
    function transformNodes(nodes, rand) {
        const rotation = rand() * Math.PI * 2;
        const cos = Math.cos(rotation), sin = Math.sin(rotation);
        const scaleX = 0.9 + rand() * 0.2, scaleY = 0.9 + rand() * 0.2;
        const skew = (rand() - 0.5) * 0.18;
        const transformed = nodes.map(({ x, y }) => {
            const px = x * scaleX + y * skew, py = y * scaleY;
            return { x: px * cos - py * sin, y: px * sin + py * cos };
        });
        const minX = Math.min(...transformed.map(node => node.x));
        const maxX = Math.max(...transformed.map(node => node.x));
        const minY = Math.min(...transformed.map(node => node.y));
        const maxY = Math.max(...transformed.map(node => node.y));
        const scale = 300 / Math.max(maxX - minX, maxY - minY);
        const offsetX = (400 - (maxX - minX) * scale) / 2;
        const offsetY = (400 - (maxY - minY) * scale) / 2;
        return transformed.map(node => ({
            x: offsetX + (node.x - minX) * scale,
            y: offsetY + (node.y - minY) * scale
        }));
    }
    function createTraceSignature(nodes, edges) {
        const pointKeys = nodes.map(({ x, y }) => `${Math.round(x * 1000)},${Math.round(y * 1000)}`);
        return edges.map(({ u, v }) => {
            const first = pointKeys[u], second = pointKeys[v];
            return first < second ? `${first}|${second}` : `${second}|${first}`;
        }).sort().join(';');
    }
    function generateFigure(tierIndex, figureIndex) {
        const tier = TIERS[tierIndex];
        if (!tier) throw new RangeError(`Unknown retry difficulty: ${tierIndex}`);
        const rand = createPRNG((figureIndex ^ Math.imul(tierIndex + 1, 0x9E3779B9)) >>> 0);
        const exactCandidates = [];
        let closestCandidate = null, closestDistance = Infinity;
        for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
            const graph = buildCellGraph(growCells(tier.cells, rand));
            const analysis = analyzeGraph(graph.nodes, graph.edges);
            if (!analysis.connected || (analysis.oddNodes.length !== 0 && analysis.oddNodes.length !== 2) ||
                analysis.articulationPoints > 0) continue;
            const distance = Math.abs(graph.edges.length - tier.steps);
            if (distance < closestDistance || (distance === closestDistance && rand() < 0.5)) {
                closestCandidate = { ...graph, analysis };
                closestDistance = distance;
            }
            if (distance === 0) {
                exactCandidates.push({ ...graph, analysis });
                if (exactCandidates.length >= 6) break;
            }
        }
        const candidates = exactCandidates.length ? exactCandidates : (closestCandidate ? [closestCandidate] : []);
        if (!candidates.length) throw new Error(`Could not generate a valid retry figure for ${tier.name}.`);
        const selected = candidates[Math.floor(rand() * candidates.length)];
        const oddNodes = selected.analysis.oddNodes;
        const startHint = oddNodes.length === 2 && rand() < 0.5 ? oddNodes[1] : (oddNodes[0] ?? -1);
        const endHint = oddNodes.length === 2 ? oddNodes.find(node => node !== startHint) : -1;
        const nodes = transformNodes(selected.nodes, rand);
        return {
            nodes,
            edges: selected.edges,
            startHint,
            endHint,
            shapeSignature: selected.shapeSignature,
            traceSignature: createTraceSignature(nodes, selected.edges),
            level: tierIndex,
            index: figureIndex
        };
    }
    function takeFigure(tierIndex) {
        const used = runHistory[tierIndex];
        while (used.figureIndices.size < MAX_FIGURE_ID) {
            let figureIndex = Math.floor(Math.random() * MAX_FIGURE_ID);
            while (used.figureIndices.has(figureIndex)) figureIndex = (figureIndex + 1) % MAX_FIGURE_ID;
            used.figureIndices.add(figureIndex);
            const figure = generateFigure(tierIndex, figureIndex);
            if (usedTraceSignatures.has(figure.traceSignature)) continue;
            usedTraceSignatures.add(figure.traceSignature);
            return figure;
        }
        throw new Error(`Retry figure space exhausted for ${TIERS[tierIndex].name}.`);
    }
    function resetRun(history = null) {
        const legacy = Array.isArray(history);
        const tiers = legacy ? history : history?.tiers;
        runHistory = Array.from({ length: TIERS.length }, (_, tierIndex) => {
            const entry = tiers?.[tierIndex];
            const indices = legacy ? entry : entry?.figureIndices;
            return {
                figureIndices: new Set(Array.isArray(indices)
                    ? indices.filter(index => Number.isInteger(index) && index >= 0 && index < MAX_FIGURE_ID)
                    : [])
            };
        });
        usedTraceSignatures = new Set(Array.isArray(history?.traceSignatures)
            ? history.traceSignatures.filter(signature => typeof signature === 'string' && signature.length > 0)
            : []);
        if (legacy) {
            runHistory.forEach(({ figureIndices }, tierIndex) => {
                figureIndices.forEach(figureIndex => {
                    usedTraceSignatures.add(generateFigure(tierIndex, figureIndex).traceSignature);
                });
            });
        }
    }
    function getRunHistory() {
        return {
            tiers: runHistory.map(({ figureIndices }) => ({
                figureIndices: [...figureIndices]
            })),
            traceSignatures: [...usedTraceSignatures]
        };
    }
    function pointFromEvent(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    function stopListeners() {
        if (!active) return;
        const { canvas, handlers } = active;
        canvas.removeEventListener('pointerdown', handlers.down);
        canvas.removeEventListener('pointermove', handlers.move);
        canvas.removeEventListener('pointerup', handlers.up);
        canvas.removeEventListener('pointercancel', handlers.cancel);
        window.removeEventListener('resize', handlers.resize);
        active = null;
    }
    function layout(canvas) {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width), height = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
            canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        }
        const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const size = Math.max(1, Math.min(width, height) - 60);
        const offsetX = (width - size) / 2, offsetY = (height - size) / 2;
        const nodes = active.figure.nodes.map(node => ({ x: offsetX + node.x / 400 * size, y: offsetY + node.y / 400 * size }));
        return { ctx, width, height, nodes };
    }
    function draw() {
        if (!active) return;
        const { ctx, width, height, nodes } = layout(active.canvas);
        const { edges } = active.figure;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#120b32'; ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(139,92,246,.1)'; ctx.lineWidth = 1;
        for (let x = 18; x < width; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
        for (let y = 12; y < height; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

        // Même palette néon que le défi actuel ; seules les arêtes déjà tracées verdissent.
        ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 8;
        edges.forEach(edge => {
            const a = nodes[edge.u], b = nodes[edge.v];
            ctx.strokeStyle = edge.done ? '#83ff36' : '#ff168c';
            ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = edge.done ? 11 : 8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        });
        ctx.shadowBlur = 0;
        if (active.dragging && active.currentNode >= 0 && active.pointer) {
            const point = nodes[active.currentNode];
            ctx.strokeStyle = 'rgba(131,255,54,.64)'; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(active.pointer.x, active.pointer.y); ctx.stroke();
        }
        nodes.forEach((point, index) => {
            if (index === active.figure.startHint || index === active.figure.endHint) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 13, 0, Math.PI * 2);
                ctx.strokeStyle = index === active.figure.startHint ? '#83ff36' : '#facc15';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            const current = active.currentNode === index && active.dragging;
            ctx.fillStyle = current ? '#83ff36' : '#f8fbff';
            ctx.shadowColor = current ? '#83ff36' : '#dce8ff'; ctx.shadowBlur = current ? 13 : 4;
            ctx.beginPath(); ctx.arc(point.x, point.y, current ? 7 : 5, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0; ctx.lineWidth = 2; ctx.strokeStyle = '#201244'; ctx.stroke();
        });
        ctx.restore();
    }
    function fail(reason) {
        if (!active) return;
        const callback = active.callbacks.onFail;
        stopListeners();
        if (callback) callback(reason);
    }
    function succeed() {
        if (!active) return;
        const callback = active.callbacks.onComplete;
        stopListeners();
        if (callback) callback();
    }
    function findNode(point, nodes, radius) {
        let nearest = -1, nearestDistance = radius;
        nodes.forEach((node, index) => {
            const distance = Math.hypot(node.x - point.x, node.y - point.y);
            if (distance <= nearestDistance) { nearest = index; nearestDistance = distance; }
        });
        return nearest;
    }
    function start(canvas, difficultyIndex, callbacks = {}) {
        stopListeners();
        const tierIndex = clamp(Number(difficultyIndex) || 0, 0, TIERS.length - 1);
        const figure = takeFigure(tierIndex);
        active = {
            canvas, figure, callbacks, tierIndex,
            tolerance: NODE_HIT_RADIUS[tierIndex], currentNode: -1, startNode: -1, resumeNode: -1,
            dragging: false, pointer: null, visitedEdges: 0, handlers: {}
        };
        const current = active;
        function resize() { draw(); }
        function down(event) {
            if (!active || active !== current || current.dragging) return;
            const { nodes } = layout(canvas), point = pointFromEvent(event, canvas);
            const hit = findNode(point, nodes, current.tolerance);
            if (hit < 0) return;
            if (current.startNode < 0 && current.figure.startHint >= 0 && hit !== current.figure.startHint) return;
            if (current.resumeNode >= 0 && hit !== current.resumeNode) return;
            current.dragging = true;
            if (current.resumeNode < 0) current.startNode = hit;
            current.resumeNode = -1; current.currentNode = hit; current.pointer = point;
            canvas.setPointerCapture?.(event.pointerId); draw(); event.preventDefault();
        }
        function move(event) {
            if (!active || active !== current || !current.dragging) return;
            const { nodes } = layout(canvas), point = pointFromEvent(event, canvas);
            current.pointer = point;
            const hit = findNode(point, nodes, current.tolerance);
            if (hit < 0 || hit === current.currentNode) { draw(); return; }
            const edge = current.figure.edges.find(item =>
                (item.u === current.currentNode && item.v === hit) || (item.v === current.currentNode && item.u === hit));
            if (!edge) {
                fail(retryMessage('retryOffPath', 'Tu as quitté le tracé. La clé Retry a été utilisée.'));
                return;
            }
            if (edge.done) {
                fail(retryMessage('retryRepeatedEdge', 'Tu as repassé sur une ligne. La clé Retry a été utilisée.'));
                return;
            }
            edge.done = true; current.visitedEdges++; current.currentNode = hit;
            event.preventDefault(); draw();
            if (current.visitedEdges === current.figure.edges.length) {
                const expectedEnd = current.figure.endHint >= 0 ? current.figure.endHint : current.startNode;
                if (current.currentNode === expectedEnd) succeed();
                else fail(retryMessage('retryWrongEndpoint', 'Termine au point d’arrivée indiqué.'));
            }
        }
        function up(event) {
            if (!active || active !== current || !current.dragging) return;
            move(event);
            if (active && active === current) {
                fail(retryMessage('retryLifted', 'Tu as levé le doigt avant d’avoir terminé. La clé Retry a été utilisée.'));
            }
        }
        function cancel() {
            if (!active || active !== current || !current.dragging) return;
            // A phone call or browser gesture may cancel the pointer. Keep the
            // partial trace and let the player resume from the current junction.
            current.dragging = false;
            current.pointer = null;
            current.resumeNode = current.currentNode;
            draw();
        }
        current.handlers = { down, move, up, cancel, resize };
        canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
        canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', cancel);
        window.addEventListener('resize', resize); draw();
        if (callbacks.onReady) callbacks.onReady({
            level: TIERS[tierIndex].name,
            tierIndex,
            hasFixedEndpoints: figure.endHint >= 0
        });
    }
    function stop() { stopListeners(); }
    function getFiguresForLevel(index) {
        return Array.from({ length: 15 }, (_, figureIndex) => generateFigure(index, figureIndex)).map(figure => {
            const analysis = analyzeGraph(figure.nodes, figure.edges);
            return {
                nodes: figure.nodes.length,
                edges: figure.edges.length,
                oddEndpoints: analysis.oddNodes.length,
                connected: analysis.connected,
                articulationPoints: analysis.articulationPoints,
                maxDegree: Math.max(...analysis.degree),
                hasFixedEndpoints: figure.endHint >= 0,
                startHint: figure.startHint,
                endHint: figure.endHint,
                shapeSignature: figure.shapeSignature
            };
        });
    }
    window.RetryTrace = { start, stop, getFiguresForLevel, resetRun, getRunHistory };
})();
