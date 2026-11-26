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
    fs.readFileSync(path.join(__dirname, 'geo_wikidata.js'), 'utf8'),
    context,
    { filename: 'geo_wikidata.js' }
);
vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, 'culture_wikidata.js'), 'utf8'),
    context,
    { filename: 'culture_wikidata.js' }
);
vm.runInNewContext(
    `${fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8')}\n` +
    'globalThis.__questionManager = QuestionManager; globalThis.__selectQuestionOptions = selectQuestionOptions; ' +
    'globalThis.__frenchGeo = GEO_QUESTIONS; globalThis.__frenchCulture = CULTURE_QUESTIONS; ' +
    'globalThis.__wikidataGeoQuestions = GEO_WIKIDATA_QUESTIONS; ' +
    'globalThis.__wikidataCultureQuestions = CULTURE_WIKIDATA_QUESTIONS; ' +
    'globalThis.__normalizeAnswerChoice = normalizeAnswerChoice; globalThis.__normalizeQuestionText = normalizeQuestionText; ' +
    'globalThis.__geoLevels = GEO_QUESTIONS_BY_LEVEL; globalThis.__cultureLevels = CULTURE_QUESTIONS_BY_LEVEL; ' +
    'globalThis.__generateVariedMath = generateVariedMath; globalThis.__translationExpansion = LANG_GENERATED_CHALLENGES;',
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

test('translation difficulty pools support a full campaign without recycling or easy words in advanced tiers', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];

    for (const source of languages) {
        for (const target of languages) {
            if (source === target) continue;
            assert.equal(manager.setLangPair(source, target), true);
            manager.resetHistory();
            const runQuestions = new Set();
            for (const level of levels) {
                for (let i = 0; i < 40; i++) {
                    const question = manager.getNextQuestion('anglais', level);
                    assert.equal(question.diffKey, level);
                    assert.equal(question.options.length, 3);
                    assert.equal(question.options.filter(option => option === question.answer).length, 1);
                    assert.ok(!runQuestions.has(question.question), `${source}→${target}, duplicate: ${question.question}`);
                    if (['difficile', 'tres_difficile', 'master'].includes(level)) {
                        assert.ok(!/^Traduis le mot\b/.test(question.question), `${level} contains an easy vocabulary item`);
                    }
                    runQuestions.add(question.question);
                }
            }
            assert.equal(manager.getRunHistory().length, runQuestions.size);
        }
    }
});

test('translation banks provide 240 questions at every survival difficulty in every language pair', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];
    const generated = context.__translationExpansion;

    assert.equal(generated.length, 1200);
    for (const level of levels) {
        const rows = generated.filter(row => row[0] === level);
        assert.equal(rows.length, 200, `${level} generated phrase count`);
        for (let languageIndex = 0; languageIndex < languages.length; languageIndex++) {
            const phrases = rows.map(row => context.__normalizeQuestionText(row[languageIndex + 1]));
            assert.equal(new Set(phrases).size, 200, `${languages[languageIndex]}, ${level} generated phrases`);
        }
    }

    for (const source of languages) {
        for (const target of languages) {
            if (source === target) continue;
            manager.setLangPair(source, target);
            const stats = manager.getBankStats();
            for (const level of levels) {
                assert.ok(stats[level].anglais >= 240, `${source}→${target}, ${level}: ${stats[level].anglais}`);
            }
        }
    }

    manager.setLangPair('fr', 'en');
    for (const level of levels) {
        manager.resetHistory();
        const questions = new Set();
        for (let i = 0; i < 240; i++) {
            const question = manager.getNextQuestion('anglais', level);
            assert.ok(!questions.has(question.question), `${level}, duplicate: ${question.question}`);
            questions.add(question.question);
        }
        assert.equal(questions.size, 240, level);
    }
});

test('maths can serve 240 distinct questions at every difficulty in one run', () => {
    const manager = context.__questionManager;
    manager.setLangPair('fr', 'en');
    for (const level of ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master']) {
        manager.resetHistory();
        const questions = new Set();
        for (let i = 0; i < 240; i++) {
            const question = manager.getNextQuestion('maths', level);
            assert.ok(!questions.has(question.question), `${level}, duplicate: ${question.question}`);
            questions.add(question.question);
        }
        assert.equal(questions.size, 240, level);
    }
});

test('geography and culture provide 40 unique questions per level for both campaign rounds', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];
    for (const source of languages) {
        manager.setLangPair(source, source === 'en' ? 'fr' : 'en');
        manager.resetHistory();
        for (const theme of ['geo', 'culture']) {
            for (const level of levels) {
                for (let i = 0; i < 40; i++) {
                    const question = manager.getNextQuestion(theme, level);
                    assert.equal(question.diffKey, level);
                }
            }
        }
    }
});

test('familiar geography and culture questions do not leak into difficult tiers', () => {
    const normalize = context.__normalizeQuestionText;
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];
    const cases = [
        ['geo', 'Sur quel continent se trouve l’Afrique du Sud ?', 2],
        ['geo', 'Quelle est la capitale de la Colombie ?', 2],
        ['culture', 'Qui a inventé le World Wide Web ?', 2],
        ['culture', 'Qui a écrit Harry Potter à l’école des sorciers ?', 2],
        ['culture', 'Qui a écrit Le Petit Prince ?', 2],
        ['culture', 'Qui a peint la Joconde ?', 2],
        ['culture', 'Qui a découvert la pénicilline ?', 2]
    ];
    for (const [theme, prompt, highestTier] of cases) {
        const bank = theme === 'geo' ? context.__geoLevels : context.__cultureLevels;
        const promptKey = normalize(prompt);
        const tierIndex = levels.findIndex(level => bank[level].some(row => normalize(row[0]) === promptKey));
        assert.ok(tierIndex >= 0, `question exists: ${prompt}`);
        assert.ok(tierIndex <= highestTier, `${prompt} was assigned to ${levels[tierIndex]}`);
    }
});

test('every static question is drawn once at most, then the exhausted pool fails explicitly', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];
    for (const source of languages) {
        manager.setLangPair(source, source === 'en' ? 'fr' : 'en');
        const stats = manager.getBankStats();
        for (const theme of ['geo', 'anglais', 'culture']) {
            for (const level of levels) {
                manager.resetHistory();
                for (let i = 0; i < stats[level][theme]; i++) {
                    manager.getNextQuestion(theme, level);
                }
                assert.throws(() => manager.getNextQuestion(theme, level), /Banque épuisée sans répétition/);
            }
        }
    }
});

test('restored run history prevents a question from returning after resuming', () => {
    const manager = context.__questionManager;
    manager.setLangPair('fr', 'en');
    manager.resetHistory();
    const seen = new Set();
    const level = 'basique';
    const capacity = manager.getBankStats()[level].geo;
    for (let i = 0; i < 20; i++) {
        seen.add(manager.getNextQuestion('geo', level).question);
    }

    const savedHistory = manager.getRunHistory();
    manager.resetHistory();
    manager.restoreHistory(savedHistory);
    assert.deepEqual(manager.getRunHistory(), savedHistory);
    for (let i = 20; i < capacity; i++) {
        const question = manager.getNextQuestion('geo', level);
        assert.ok(!seen.has(question.question), `resumed duplicate: ${question.question}`);
        seen.add(question.question);
    }
    assert.equal(seen.size, capacity);
    assert.throws(() => manager.getNextQuestion('geo', level), /Banque épuisée sans répétition/);
});

test('random-theme runs avoid exhausted banks while keeping question text unique', () => {
    const manager = context.__questionManager;
    manager.setLangPair('fr', 'en');
    manager.resetHistory();
    const questions = new Set();
    for (let i = 0; i < 240; i++) {
        const question = manager.getNextQuestion('random', 'basique');
        assert.ok(!questions.has(question.question), `duplicate: ${question.question}`);
        questions.add(question.question);
    }
    assert.equal(questions.size, 240);
});

test('translation prompts follow the interface language and answers use the target language', () => {
    const manager = context.__questionManager;
    const hasHan = /[\u4e00-\u9fff]/;
    const prompts = {
        fr: ['Traduis :', 'Traduis le mot'],
        en: ['Translate:', 'Translate the word'],
        es: ['Traduce:', 'Traduce la palabra'],
        de: ['Übersetze:', 'Übersetze das Wort'],
        zh: ['翻译：', '翻译单词：'],
        ru: ['Переведи:', 'Переведи слово']
    };
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];

    for (const source of languages) {
        context.window.UI18n = { language: source };
        manager.setLangPair(source, source === 'en' ? 'fr' : 'en');
        manager.resetHistory();
        const translation = manager.getNextQuestion('anglais', 'basique');
        assert.ok(prompts[source].some(prefix => translation.question.startsWith(prefix)), `${source} prompt: ${translation.question}`);
        if (source === 'zh') {
            assert.ok(hasHan.test(translation.question));
            assert.ok(!hasHan.test(translation.answer));
            const geography = manager.getNextQuestion('geo', 'basique');
            assert.ok(geography.options.every(option => hasHan.test(option)));
        }
    }
    context.window.UI18n = undefined;
});

test('geography and culture questions return three choices in every interface language', () => {
    const manager = context.__questionManager;
    const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const themes = ['geo', 'culture'];
    const levels = ['basique', 'facile', 'moyen', 'difficile', 'tres_difficile', 'master'];

    for (const source of languages) {
        assert.equal(manager.setLangPair(source, languages.find(language => language !== source)), true);
        manager.resetHistory();
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

test('Wikidata geography supplements are localized, well-formed, and fill every language tier', () => {
    const data = context.__wikidataGeoQuestions;
    const manager = context.__questionManager;
    const expectedAdditions = {
        basique: 143,
        facile: 144,
        moyen: 144,
        difficile: 141,
        tres_difficile: 142,
        master: 142
    };
    const promptMarkers = {
        fr: 'Dans quel pays se trouve la ville de ',
        en: 'Which country is the city of ',
        es: '¿En qué país se encuentra la ciudad de ',
        de: 'In welchem Land liegt die Stadt ',
        zh: '位于哪个国家？',
        ru: 'В какой стране находится город '
    };

    for (const language of ['fr', 'en', 'es', 'de', 'zh', 'ru']) {
        for (const [level, expectedCount] of Object.entries(expectedAdditions)) {
            const rows = data[language][level];
            assert.equal(rows.length, expectedCount, `${language}, ${level} additions`);
            assert.equal(
                new Set(rows.map(row => context.__normalizeQuestionText(row[0]))).size,
                rows.length,
                `${language}, ${level} unique prompts`
            );
            for (const [index, row] of rows.entries()) {
                assert.equal(row.length, 3, `${language}, ${level}, row ${index}`);
                assert.equal(row[2].length, 3, `${language}, ${level}, row ${index}`);
                assert.equal(new Set([row[1], ...row[2]].map(context.__normalizeAnswerChoice)).size, 4);
                assert.ok(row[0].includes(promptMarkers[language]), `${language}, ${level}, row ${index}`);
            }
        }

        manager.setLangPair(language, language === 'en' ? 'fr' : 'en');
        const stats = manager.getBankStats();
        for (const level of Object.keys(expectedAdditions)) {
            assert.ok(stats[level].geo >= 240, `${language}, ${level}: ${stats[level].geo}`);
        }
    }
});

test('Wikidata culture supplements are localized, well-formed, and fill every language tier', () => {
    const data = context.__wikidataCultureQuestions;
    const manager = context.__questionManager;
    const expectedAdditions = {
        basique: 198,
        facile: 199,
        moyen: 199,
        difficile: 198,
        tres_difficile: 199,
        master: 199
    };
    const promptMarkers = {
        fr: 'Qui a ',
        en: 'Who ',
        es: '¿Quién ',
        de: 'Wer ',
        zh: null,
        ru: 'Кто '
    };

    for (const language of ['fr', 'en', 'es', 'de', 'zh', 'ru']) {
        for (const [level, expectedCount] of Object.entries(expectedAdditions)) {
            const rows = data[language][level];
            assert.equal(rows.length, expectedCount, `${language}, ${level} additions`);
            assert.equal(
                new Set(rows.map(row => context.__normalizeQuestionText(row[0]))).size,
                rows.length,
                `${language}, ${level} unique prompts`
            );
            for (const [index, row] of rows.entries()) {
                assert.equal(row.length, 3, `${language}, ${level}, row ${index}`);
                assert.equal(row[2].length, 3, `${language}, ${level}, row ${index}`);
                assert.equal(new Set([row[1], ...row[2]].map(context.__normalizeAnswerChoice)).size, 4);
                if (language === 'zh') {
                    assert.ok(
                        row[0].startsWith('谁') || row[0].startsWith('电影《') || row[0].startsWith('《'),
                        `${language}, ${level}, row ${index}`
                    );
                } else {
                    assert.ok(row[0].startsWith(promptMarkers[language]), `${language}, ${level}, row ${index}`);
                }
            }
        }

        manager.setLangPair(language, language === 'en' ? 'fr' : 'en');
        const stats = manager.getBankStats();
        for (const level of Object.keys(expectedAdditions)) {
            assert.ok(stats[level].culture >= 240, `${language}, ${level}: ${stats[level].culture}`);
        }
    }
});
