const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'game.js'), 'utf8');
const constants = source.match(/const MATH_SPEED_FACTORS = \[[^\]]+\];\s*const MATH_RESPONSE_SECONDS = \[[^\]]+\];/);
const questionsPerTour = source.match(/const QUESTIONS_PER_TOUR = \d+;/);
const speedFunction = source.match(/function calculateMeteorFallSpeed\([^\n]*\) \{[\s\S]*?\n\}/);
const meteorLimitFunction = source.match(/function getMaxActiveMeteorCount\([^\n]*\) \{[\s\S]*?\n\}/);
const survivalLimitFunction = source.match(/function getSurvivalQuestionLimit\([^\n]*\) \{[\s\S]*?\n\}/);
assert.ok(constants, 'Math speed profiles are present');
assert.ok(questionsPerTour, 'Campaign round length is present');
assert.ok(speedFunction, 'Meteor fall speed calculation is present');
assert.ok(meteorLimitFunction, 'Concurrent meteor limit calculation is present');
assert.ok(survivalLimitFunction, 'Survival question limit respects the selected bank capacity');

const context = {};
vm.runInNewContext(
    `${constants[0]}\n${questionsPerTour[0]}\n${speedFunction[0]}\n${meteorLimitFunction[0]}\n` +
    `const SURVIVAL_QUESTION_LIMIT = 240;\n` +
    `const QuestionManager = { getBankStats: () => ({ basique: { geo: 99 }, master: { anglais: 240, culture: 41 } }) };\n` +
    `${survivalLimitFunction[0]}\n` +
    'globalThis.calculateSpeed = calculateMeteorFallSpeed;\n' +
    'globalThis.responseWindows = MATH_RESPONSE_SECONDS;\n' +
    'globalThis.maxActiveMeteors = getMaxActiveMeteorCount;\n' +
    'globalThis.survivalQuestionLimit = getSurvivalQuestionLimit;',
    context
);

test('math meteors allow the configured thinking time in both modes and every tier', () => {
    for (const mode of ['tours', 'survival']) {
        for (let level = 0; level < context.responseWindows.length; level++) {
            for (const distance of [260, 600]) {
                const speed = context.calculateSpeed('maths', true, level, mode, 2, 19, 239, distance);
                assert.ok(Number.isFinite(speed) && speed > 0);
                assert.ok(
                    distance / speed >= context.responseWindows[level] - 1e-9,
                    `${mode}, tier ${level}, distance ${distance}`
                );
            }
        }
    }
});

test('math remains slower than other themes while campaign pacing stays monotonic', () => {
    const otherSpeeds = [];
    for (let level = 0; level < 6; level++) {
        const mathSpeed = context.calculateSpeed('maths', false, level, 'tours', 2, 19, 0, 600);
        const otherSpeed = context.calculateSpeed('geo', false, level, 'tours', 2, 19, 0, 600);
        assert.ok(mathSpeed < otherSpeed);
        if (otherSpeeds.length) assert.ok(otherSpeed > otherSpeeds[otherSpeeds.length - 1]);
        otherSpeeds.push(otherSpeed);
    }
    const firstTourEnd = context.calculateSpeed('geo', false, 0, 'tours', 1, 19, 0, 600);
    const secondTourStart = context.calculateSpeed('geo', false, 0, 'tours', 2, 0, 0, 600);
    const secondTourEnd = context.calculateSpeed('geo', false, 0, 'tours', 2, 19, 0, 600);
    const nextLevelStart = context.calculateSpeed('geo', false, 1, 'tours', 1, 0, 0, 600);
    assert.ok(secondTourStart > firstTourEnd);
    assert.ok(secondTourEnd > secondTourStart);
    assert.ok(nextLevelStart > secondTourEnd);
    assert.equal(context.calculateSpeed('geo', false, 0, 'tours', 1, 19, 0, 600), 47.325);
    assert.equal(context.calculateSpeed('geo', false, 0, 'survival', 1, 0, 239, 600), 62.28);
});

test('math mode keeps one falling question at a time', () => {
    assert.equal(context.maxActiveMeteors('maths', []), 1);
    assert.equal(context.maxActiveMeteors('random', [{ theme: 'maths' }]), 1);
    assert.equal(context.maxActiveMeteors('geo', [{ theme: 'geo' }]), 2);
});

test('fixed-theme survival ends before a question bank would have to repeat', () => {
    assert.equal(context.survivalQuestionLimit('geo', 'basique'), 99);
    assert.equal(context.survivalQuestionLimit('anglais', 'master'), 240);
    assert.equal(context.survivalQuestionLimit('culture', 'master'), 41);
    assert.equal(context.survivalQuestionLimit('maths', 'basique'), 240);
    assert.equal(context.survivalQuestionLimit('random', 'basique'), 240);
    assert.throws(() => context.survivalQuestionLimit('culture', 'unknown'), /Niveau de difficulté invalide/);
});
