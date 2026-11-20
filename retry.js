(() => {
    // Chaque figure est composée de boucles polygonales. Toutes les lignes forment donc un parcours fermé sans repasser.
    const TIERS = [
        { name: 'BASIQUE', steps: 6, variants: [[3, 3]] },
        { name: 'FACILE', steps: 9, variants: [[3, 3, 3], [4, 5]] },
        { name: 'MOYEN', steps: 12, variants: [[3, 3, 3, 3], [4, 4, 4]] },
        { name: 'DIFFICILE', steps: 15, variants: [[3, 3, 3, 3, 3], [5, 5, 5]] },
        { name: 'TRÈS DIFFICILE', steps: 19, variants: [[3, 3, 3, 5, 5], [4, 5, 5, 5]] },
        { name: 'MASTER', steps: 25, variants: [[5, 5, 5, 5, 5], [3, 3, 4, 4, 4, 4, 3]] }
    ];
    const NODE_HIT_RADIUS = [27, 24, 22, 20, 18, 16];
    const MAX_FIGURE_ID = 0x100000000;
    let runHistory = Array.from({ length: TIERS.length }, () => new Set());
    let active = null;

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
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
    function generateFigure(tierIndex, figureIndex) {
        const tier = TIERS[tierIndex];
        const rand = createPRNG((figureIndex ^ Math.imul(tierIndex + 1, 0x9E3779B9)) >>> 0);
        const variants = tier.variants;
        const cycles = variants[figureIndex % variants.length];
        const nodes = [{ x: 200, y: 200 }];
        const edges = [];
        const rotation = rand() * Math.PI * 2;
        const radius = 126 + rand() * 12;
        const sector = Math.PI * 2 / cycles.length;

        cycles.forEach((sideCount, loopIndex) => {
            const centerAngle = rotation + loopIndex * sector;
            const halfSpan = sector * 0.36;
            const outer = [];
            for (let pointIndex = 0; pointIndex < sideCount - 1; pointIndex++) {
                const fraction = sideCount === 2 ? 0 : pointIndex / (sideCount - 2);
                const angle = centerAngle + (fraction * 2 - 1) * halfSpan;
                const pointRadius = radius + Math.sin((fraction + loopIndex) * Math.PI) * 5;
                outer.push(nodes.length);
                nodes.push({ x: 200 + Math.cos(angle) * pointRadius, y: 200 + Math.sin(angle) * pointRadius });
            }
            const loop = [0, ...outer, 0];
            for (let i = 0; i < loop.length - 1; i++) edges.push({ u: loop[i], v: loop[i + 1], done: false });
        });
        return { nodes, edges, startHint: 0, level: tierIndex, index: figureIndex };
    }
    function takeFigure(tierIndex) {
        const used = runHistory[tierIndex];
        let figureIndex = Math.floor(Math.random() * MAX_FIGURE_ID);
        while (used.has(figureIndex)) figureIndex = (figureIndex + 1) % MAX_FIGURE_ID;
        used.add(figureIndex);
        return generateFigure(tierIndex, figureIndex);
    }
    function resetRun(history = null) {
        runHistory = Array.from({ length: TIERS.length }, (_, tierIndex) => new Set(
            Array.isArray(history?.[tierIndex])
                ? history[tierIndex].filter(index => Number.isInteger(index) && index >= 0 && index < MAX_FIGURE_ID)
                : []
        ));
    }
    function getRunHistory() { return runHistory.map(used => [...used]); }
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
        const degree = Array(figure.nodes.length).fill(0);
        figure.edges.forEach(edge => { degree[edge.u]++; degree[edge.v]++; });
        const oddNodes = degree.map((value, index) => value % 2 ? index : -1).filter(index => index >= 0);
        active = {
            canvas, figure, callbacks, tierIndex, degree, oddNodes,
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
                fail('Tu as quitté le tracé. La clé Retry a été utilisée.');
                return;
            }
            if (edge.done) {
                fail('Tu as repassé sur une ligne. La clé Retry a été utilisée.');
                return;
            }
            edge.done = true; current.visitedEdges++; current.currentNode = hit;
            event.preventDefault(); draw();
            if (current.visitedEdges === current.figure.edges.length) {
                if (current.currentNode === current.startNode) succeed();
                else fail('Referme la figure en revenant à ton point de départ.');
            }
        }
        function up(event) {
            if (!active || active !== current || !current.dragging) return;
            move(event);
            if (active && active === current) fail('Tu as levé le doigt avant d’avoir terminé. La clé Retry a été utilisée.');
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
        if (callbacks.onReady) callbacks.onReady({ level: TIERS[tierIndex].name });
    }
    function stop() { stopListeners(); }
    function getFiguresForLevel(index) {
        return Array.from({ length: 15 }, (_, figureIndex) => generateFigure(index, figureIndex)).map(figure => {
            const degree = Array(figure.nodes.length).fill(0);
            figure.edges.forEach(edge => { degree[edge.u]++; degree[edge.v]++; });
            return { nodes: figure.nodes.length, edges: figure.edges.length, oddEndpoints: degree.filter(value => value % 2).length };
        });
    }
    window.RetryTrace = { start, stop, getFiguresForLevel, resetRun, getRunHistory };
})();
