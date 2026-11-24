const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = {
    window: {
        devicePixelRatio: 1,
        addEventListener() {},
        removeEventListener() {}
    }
};
vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, 'retry.js'), 'utf8'),
    context,
    { filename: 'retry.js' }
);

test('retry tiers produce valid, varied trails without central articulation points', () => {
    const retry = context.window.RetryTrace;
    let previousMaxEdges = 0;

    for (let tier = 0; tier < 6; tier++) {
        const figures = retry.getFiguresForLevel(tier);
        assert.equal(figures.length, 15);
        const edgeCounts = figures.map(figure => figure.edges);
        const shapes = new Set(figures.map(figure => figure.shapeSignature));

        for (const figure of figures) {
            assert.equal(figure.connected, true);
            assert.equal(figure.articulationPoints, 0);
            assert.ok(figure.oddEndpoints === 0 || figure.oddEndpoints === 2);
            assert.equal(figure.hasFixedEndpoints, figure.oddEndpoints === 2);
            assert.ok(figure.maxDegree <= 4);
            if (figure.hasFixedEndpoints) {
                assert.ok(figure.startHint >= 0);
                assert.ok(figure.endHint >= 0);
                assert.notEqual(figure.startHint, figure.endHint);
            } else {
                assert.equal(figure.startHint, -1);
                assert.equal(figure.endHint, -1);
            }
        }
        if (tier >= 2) assert.ok(shapes.size > 1, `tier ${tier} should vary its geometry`);

        const minEdges = Math.min(...edgeCounts);
        const maxEdges = Math.max(...edgeCounts);
        assert.ok(minEdges > previousMaxEdges, `tier ${tier} should increase in edge count`);
        previousMaxEdges = maxEdges;
    }
});

test('retry traces stay unique across difficulties and saved-run restoration', () => {
    const retry = context.window.RetryTrace;
    const context2d = new Proxy({}, {
        get(target, key) {
            if (!(key in target)) target[key] = () => {};
            return target[key];
        },
        set(target, key, value) {
            target[key] = value;
            return true;
        }
    });
    const canvas = {
        width: 400,
        height: 400,
        getContext: () => context2d,
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 400 }),
        addEventListener() {},
        removeEventListener() {}
    };
    const seen = new Set();
    retry.resetRun();

    for (let tier = 0; tier < 6; tier++) {
        for (let index = 0; index < 8; index++) {
            retry.start(canvas, tier);
            retry.stop();
            const history = JSON.parse(JSON.stringify(retry.getRunHistory()));
            const signatures = history.traceSignatures;
            assert.equal(signatures.length, seen.size + 1);
            assert.equal(new Set(signatures).size, signatures.length);
            seen.add(signatures[signatures.length - 1]);
            assert.equal(seen.size, signatures.length);

            if (tier === 2 && index === 3) {
                retry.resetRun(history);
            }
        }
    }
});

test('legacy saved retry indices are restored without reusing their traces', () => {
    const retry = context.window.RetryTrace;
    const canvas = {
        width: 400,
        height: 400,
        getContext: () => new Proxy({}, {
            get(target, key) {
                if (!(key in target)) target[key] = () => {};
                return target[key];
            },
            set(target, key, value) {
                target[key] = value;
                return true;
            }
        }),
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 400 }),
        addEventListener() {},
        removeEventListener() {}
    };
    retry.resetRun();
    retry.start(canvas, 0);
    retry.stop();
    const legacyHistory = JSON.parse(JSON.stringify(retry.getRunHistory()))
        .tiers.map(entry => entry.figureIndices);
    retry.resetRun(legacyHistory);
    const restored = JSON.parse(JSON.stringify(retry.getRunHistory()));
    assert.equal(restored.traceSignatures.length, 1);

    retry.start(canvas, 0);
    retry.stop();
    const afterNextFigure = JSON.parse(JSON.stringify(retry.getRunHistory()));
    assert.equal(afterNextFigure.traceSignatures.length, 2);
    assert.equal(new Set(afterNextFigure.traceSignatures).size, 2);
});
