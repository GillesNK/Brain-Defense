const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const random = Object.create(Math);
const context = { window: {}, Math: random };
for (const language of ['en', 'es', 'de', 'zh', 'ru']) {
    for (const theme of ['geo', 'culture']) {
        vm.runInNewContext(
            fs.readFileSync(path.join(__dirname, `${theme}_${language}.js`), 'utf8'),
            context,
            { filename: `${theme}_${language}.js` }
        );
    }
}
vm.runInNewContext(
    `${fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8')}\n` +
    'globalThis.__questionManager = QuestionManager; globalThis.__selectQuestionOptions = selectQuestionOptions; ' +
    'globalThis.__frenchGeo = GEO_QUESTIONS; globalThis.__frenchCulture = CULTURE_QUESTIONS; ' +
    'globalThis.__normalizeAnswerChoice = normalizeAnswerChoice; globalThis.__generateVariedMath = generateVariedMath;',
    context,
    { filename: 'questions.js' }
);

test('question options randomly sample two distinct distractors from the bank', () => {
    const select = context.__selectQuestionOptions;
    const expectedPairs = [
        { values: [0, 0, 0, 0], pair: ['wrong A', 'wrong B'] },
        { values: [0, 0.99, 0, 0], pair: ['wrong A', 'wrong C'] },
        { values: [0.5, 0.99, 0, 0], pair: ['wrong B', 'wrong C'] }
    ];

    for (const { values, pair } of expectedPairs) {
        let index = 0;
        random.random = () => values[index++] ?? 0;
        const options = select('Question?', 'Correct', ['wrong A', 'wrong B', 'wrong C']);
        assert.equal(options.length, 3);
        assert.equal(options.filter(option => option === 'Correct').length, 1);
        assert.deepEqual(new Set(options.filter(option => option !== 'Correct')), new Set(pair));
    }
    random.random = Math.random;
});

test('option sampling accepts two valid distractors and rejects fewer than two', () => {
    const select = context.__selectQuestionOptions;
    random.random = () => 0;
    assert.equal(select('Question?', 'Correct', ['Correct', 'Wrong', 'Other', 'Wrong']).length, 3);
    assert.throws(() => select('Question?', 'Correct', ['Correct', 'Wrong']), /Pas assez de choix distincts/);
    random.random = Math.random;
});

test('math generation supplies three distractors before two are sampled', () => {
    for (const level of ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master']) {
        for (let i = 0; i < 10; i++) {
            const generated = context.__generateVariedMath(level, 'fr');
            assert.equal(generated.options.length, 4, `${level} math questions have one answer and three distractors`);
            assert.equal(new Set(generated.options).size, 4);
        }
        const question = context.__questionManager.getNextQuestion('maths', level);
        assert.equal(question.options.length, 3);
        assert.equal(question.options.filter(option => option === question.answer).length, 1);
    }
});

test('each translation language pair has forty distinct questions at every difficulty', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];

    for (const source of languages) {
        for (const target of languages) {
            if (source === target) continue;
            assert.equal(manager.setLangPair(source, target), true);
            for (const level of levels) {
                manager.resetHistory();
                const questions = new Set();
                for (let i = 0; i < 40; i++) {
                    const question = manager.getNextQuestion('anglais', level);
                    assert.equal(question.options.length, 3);
                    assert.equal(question.options.filter(option => option === question.answer).length, 1);
                    questions.add(question.question);
                }
                assert.equal(questions.size, 40, `${source}→${target}, ${level}`);
            }
        }
    }
});

test('only translation answers use the target language', () => {
    const manager = context.__questionManager;
    const hasHan = /[\u4e00-\u9fff]/;
    manager.setLangPair('zh', 'fr');
    const translation = manager.getNextQuestion('anglais', 'basique');
    const geography = manager.getNextQuestion('geo', 'basique');

    assert.ok(hasHan.test(translation.question));
    assert.ok(!hasHan.test(translation.answer));
    assert.ok(geography.options.every(option => hasHan.test(option)));
});

test('geography and culture questions return three choices in every interface language', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const themes = ['geo', 'culture'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];

    for (const source of languages) {
        assert.equal(manager.setLangPair(source, languages.find(language => language !== source)), true);
        for (const theme of themes) {
            for (const level of levels) {
                const question = manager.getNextQuestion(theme, level);
                assert.equal(question.options.length, 3, `${source}, ${theme}, ${level}`);
                assert.equal(question.options.filter(option => option === question.answer).length, 1);
            }
        }
    }
});

test('all raw geography and culture banks have three distinct distractors', () => {
    const normalize = context.__normalizeAnswerChoice;
    for (const language of ['fr', 'en', 'es', 'de', 'zh', 'ru']) {
        for (const theme of ['geo', 'culture']) {
            const rows = language === 'fr'
                ? context[`__french${theme === 'geo' ? 'Geo' : 'Culture'}`]
                : context[`${theme.toUpperCase()}_QUESTIONS_${language.toUpperCase()}`];
            for (const [index, row] of rows.entries()) {
                assert.equal(row[2].length, 3, `${theme}_${language} row ${index} has three distractors`);
                assert.equal(new Set(row[2].map(normalize)).size, 3, `${theme}_${language} row ${index} has distinct distractors`);
                assert.ok(row[2].every(choice => normalize(choice) !== normalize(row[1])), `${theme}_${language} row ${index} excludes the answer`);
            }
        }
    }
});
