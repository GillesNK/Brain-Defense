(() => {
    const supported = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
    const copy = {
        fr: {
            tagline: 'RÉFLÉCHIS • VISE • DÉFENDS', subtitle: 'Choisis ton arsenal mental et défends ta base.',
            maths: 'Maths', geo: 'Géographie', translation: 'Traduction', culture: 'Culture G.', random: 'Mode Aléatoire',
            garage: 'Garage Défense', resume: '▶️ Reprendre la partie', campaign: 'Mode Parcours', campaignSmall: '6 niveaux · 2 tours chacun', survival: 'Mode Survival', survivalSmall: '240 questions · difficulté fixe',
            configure: 'CONFIGURATION', settings: 'Paramètres', settingsIntro: 'Personnalise ta défense avant le lancement.', sound: '🔊 Son', soundHelp: 'Effets audio du jeu', vibration: '📳 Vibrations', vibrationHelp: 'Retour tactile sur mobile', mobile: '📱 Interface mobile', mobileHelp: 'Commandes tactiles agrandies',
            target: '🌐 Langue cible', targetHelp: 'Pour les questions de traduction', uiLanguage: '🌍 Langue de l’interface', uiLanguageHelp: 'Automatique selon la langue du mobile, ou choix manuel', auto: 'Automatique (langue du mobile)', done: 'Terminé',
            survivalConfig: 'CONFIGURATION SURVIVAL', prepare: 'Prépare ta défense', survivalIntro: 'Choisis le thème et ta difficulté fixe pour les 240 questions.', theme: 'Thème', difficulty: 'Difficulté fixe', back: '← Retour', launch: 'Lancer le Survival',
            pause: '⏸️ Pause', manualPause: 'Le jeu est en pause. Que veux-tu faire ?', quit: '❌ Quitter au menu', continue: '▶️ Reprendre',
            retryTitle: 'Trace la figure', retryIntro: 'Une clé est en jeu. Le Roi Paresse te met à l’épreuve.', retryCancel: '✖️ Abandonner cette reprise',
            interrupted: 'Partie interrompue', recovery: 'Une erreur a interrompu le jeu. Ta dernière progression est conservée.',
            home: '🏠 Retour au menu', stars: 'ÉTOILES', retryKeys: 'CLÉS RETRY', ad: 'Pub récompensée',
            themeWon: '★ GAGNÉ', record: 'Record', score: 'SCORE', best: 'Record', combo: 'COMBO', wanted: 'WANTED', retry: 'RETRY',
            gameover: '💥 Base Détruite', retryContinue: '🔑 Continuer avec une clé Retry', retryEmpty: 'Aucune clé Retry. Tu peux en gagner à l’accueil avec une pub récompensée.', playAgain: '🔄 Rejouer ce thème', challenge: '📤 Défier un ami', changeTheme: '🏠 Changer de thème',
            retryKicker: 'ÉPREUVE DE REPRISE', recoveryKicker: 'RÉCUPÉRATION', garageKicker: 'ATELIER DE DÉFENSE', garageIntro: 'Équipe ton canon et personnalise ta base.', garageWallet: 'RESSOURCES DISPONIBLES',
            publicAd: '📺 Publicité récompensée', reward: 'Récompense', availableIn: 'Disponible dans', seconds: 'secondes...', copied: '✅ Copié !',
            tier_basic: 'Basique', tier_easy: 'Facile', tier_medium: 'Moyen', tier_hard: 'Difficile', tier_very_hard: 'Très difficile', tier_master: 'Master'
        },
        en: {
            tagline: 'THINK • AIM • DEFEND', subtitle: 'Choose your mental arsenal and defend your base.', maths: 'Math', geo: 'Geography', translation: 'Translation', culture: 'Trivia', random: 'Random Mode',
            garage: 'Defense Garage', resume: '▶ Resume game', campaign: 'Campaign Mode', campaignSmall: '6 levels · 2 rounds each', survival: 'Survival Mode', survivalSmall: '240 questions · fixed difficulty',
            configure: 'SETUP', settings: 'Settings', settingsIntro: 'Customize your defense before launch.', sound: '🔊 Sound', soundHelp: 'Game audio effects', vibration: '📳 Vibration', vibrationHelp: 'Tactile feedback on mobile', mobile: '📱 Mobile interface', mobileHelp: 'Larger touch controls',
            target: '🌐 Target language', targetHelp: 'For translation questions', uiLanguage: '🌍 Interface language', uiLanguageHelp: 'Automatic from your device, or choose manually', auto: 'Automatic (device language)', done: 'Done',
            survivalConfig: 'SURVIVAL SETUP', prepare: 'Prepare your defense', survivalIntro: 'Choose a theme and fixed difficulty for all 240 questions.', theme: 'Theme', difficulty: 'Fixed difficulty', back: '← Back', launch: 'Start Survival',
            pause: '⏸️ Paused', manualPause: 'The game is paused. What would you like to do?', quit: '❌ Quit to menu', continue: '▶️ Resume', retryTitle: 'Trace the figure', retryIntro: 'A key is at stake. King Laziness is testing you.', retryCancel: 'Abandon this retry',
            interrupted: 'Game interrupted', recovery: 'An error stopped the game. Your latest progress is saved.', home: 'Back to menu', stars: 'STARS', retryKeys: 'RETRY KEYS', ad: 'Reward ad', themeWon: '★ CLEARED', record: 'Record', score: 'SCORE', best: 'Best', combo: 'COMBO', wanted: 'WANTED', retry: 'RETRY',
            gameover: '💥 Base Destroyed', retryContinue: '🔑 Continue with a Retry Key', retryEmpty: 'No Retry Key. Earn one from a rewarded ad on the home screen.', playAgain: 'Replay this theme', challenge: '📤 Challenge a friend', changeTheme: 'Change theme', retryKicker: 'RETRY CHALLENGE', recoveryKicker: 'RECOVERY', garageKicker: 'DEFENSE WORKSHOP', garageIntro: 'Equip your cannon and customize your base.', garageWallet: 'AVAILABLE RESOURCES', publicAd: '📺 Rewarded ad', reward: 'Reward', availableIn: 'Available in', seconds: 'seconds...', copied: '✅ Copied!', tier_basic: 'Basic', tier_easy: 'Easy', tier_medium: 'Medium', tier_hard: 'Hard', tier_very_hard: 'Very hard', tier_master: 'Master'
        },
        es: {
            tagline: 'PIENSA • APUNTA • DEFIENDE', subtitle: 'Elige tu arsenal mental y defiende tu base.', maths: 'Matemáticas', geo: 'Geografía', translation: 'Traducción', culture: 'Cultura general', random: 'Modo aleatorio', garage: 'Garaje de defensa', resume: '▶ Reanudar partida', campaign: 'Modo campaña', campaignSmall: '6 niveles · 2 rondas cada uno', survival: 'Modo supervivencia', survivalSmall: '240 preguntas · dificultad fija',
            configure: 'CONFIGURACIÓN', settings: 'Ajustes', settingsIntro: 'Personaliza tu defensa antes de empezar.', sound: '🔊 Sonido', soundHelp: 'Efectos de audio del juego', vibration: '📳 Vibración', vibrationHelp: 'Respuesta táctil en móvil', mobile: '📱 Interfaz móvil', mobileHelp: 'Controles táctiles ampliados', target: '🌐 Idioma objetivo', targetHelp: 'Para las preguntas de traducción', uiLanguage: '🌍 Idioma de la interfaz', uiLanguageHelp: 'Automático según el móvil o selección manual', auto: 'Automático (idioma del móvil)', done: 'Listo', survivalConfig: 'CONFIGURACIÓN DE SUPERVIVENCIA', prepare: 'Prepara tu defensa', survivalIntro: 'Elige tema y dificultad fija para las 240 preguntas.', theme: 'Tema', difficulty: 'Dificultad fija', back: '← Volver', launch: 'Iniciar supervivencia', pause: '⏸️ Pausa', manualPause: 'El juego está en pausa. ¿Qué quieres hacer?', quit: '❌ Salir al menú', continue: '▶️ Continuar', retryTitle: 'Traza la figura', retryIntro: 'Hay una llave en juego. El Rey Pereza te pone a prueba.', retryCancel: 'Abandonar esta reanudación', interrupted: 'Partida interrumpida', recovery: 'Un error detuvo el juego. Tu último progreso está guardado.', home: 'Volver al menú', stars: 'ESTRELLAS', retryKeys: 'LLAVES RETRY', ad: 'Anuncio recompensado', themeWon: '★ SUPERADO', record: 'Récord', score: 'PUNTUACIÓN', best: 'Récord', combo: 'COMBO', wanted: 'VIDAS', retry: 'RETRY', gameover: '💥 Base destruida', retryContinue: '🔑 Continuar con una llave Retry', retryEmpty: 'No tienes llaves Retry. Puedes conseguir una con un anuncio en el inicio.', playAgain: 'Repetir este tema', challenge: '📤 Desafiar a un amigo', changeTheme: 'Cambiar tema', retryKicker: 'PRUEBA DE REANUDACIÓN', recoveryKicker: 'RECUPERACIÓN', garageKicker: 'TALLER DE DEFENSA', garageIntro: 'Equipa tu cañón y personaliza tu base.', garageWallet: 'RECURSOS DISPONIBLES', publicAd: '📺 Anuncio recompensado', reward: 'Recompensa', availableIn: 'Disponible en', seconds: 'segundos...', copied: '✅ ¡Copiado!', tier_basic: 'Básico', tier_easy: 'Fácil', tier_medium: 'Medio', tier_hard: 'Difícil', tier_very_hard: 'Muy difícil', tier_master: 'Master'
        },
        de: {
            tagline: 'DENKE • ZIELE • VERTEIDIGE', subtitle: 'Wähle dein mentales Arsenal und verteidige deine Basis.', maths: 'Mathe', geo: 'Geografie', translation: 'Übersetzung', culture: 'Allgemeinwissen', random: 'Zufallsmodus', garage: 'Verteidigungsgarage', resume: '▶ Spiel fortsetzen', campaign: 'Kampagnenmodus', campaignSmall: '6 Stufen · je 2 Runden', survival: 'Überlebensmodus', survivalSmall: '240 Fragen · feste Schwierigkeit',
            configure: 'EINSTELLUNGEN', settings: 'Einstellungen', settingsIntro: 'Passe deine Verteidigung vor dem Start an.', sound: '🔊 Ton', soundHelp: 'Audioeffekte im Spiel', vibration: '📳 Vibration', vibrationHelp: 'Haptisches Feedback auf Mobilgeräten', mobile: '📱 Mobile Oberfläche', mobileHelp: 'Größere Touch-Steuerung', target: '🌐 Zielsprache', targetHelp: 'Für Übersetzungsfragen', uiLanguage: '🌍 Oberflächensprache', uiLanguageHelp: 'Automatisch nach Gerätesprache oder manuell wählen', auto: 'Automatisch (Gerätesprache)', done: 'Fertig', survivalConfig: 'ÜBERLEBENSMODUS', prepare: 'Bereite deine Verteidigung vor', survivalIntro: 'Wähle Thema und feste Schwierigkeit für 240 Fragen.', theme: 'Thema', difficulty: 'Feste Schwierigkeit', back: '← Zurück', launch: 'Survival starten', pause: '⏸️ Pause', manualPause: 'Das Spiel pausiert. Was möchtest du tun?', quit: '❌ Zum Menü', continue: '▶️ Weiter', retryTitle: 'Zeichne die Figur', retryIntro: 'Ein Schlüssel steht auf dem Spiel. König Faulheit prüft dich.', retryCancel: 'Fortsetzen abbrechen', interrupted: 'Spiel unterbrochen', recovery: 'Ein Fehler hat das Spiel gestoppt. Dein letzter Fortschritt ist gespeichert.', home: 'Zurück zum Menü', stars: 'STERNE', retryKeys: 'RETRY-SCHLÜSSEL', ad: 'Belohnungswerbung', themeWon: '★ GESCHAFFT', record: 'Rekord', score: 'PUNKTE', best: 'Rekord', combo: 'KOMBO', wanted: 'LEBEN', retry: 'RETRY', gameover: '💥 Basis zerstört', retryContinue: '🔑 Mit Retry-Schlüssel fortsetzen', retryEmpty: 'Kein Retry-Schlüssel. Du kannst einen über eine Belohnungsanzeige erhalten.', playAgain: 'Thema erneut spielen', challenge: '📤 Freund herausfordern', changeTheme: 'Thema wechseln', retryKicker: 'RETRY-PRÜFUNG', recoveryKicker: 'WIEDERHERSTELLUNG', garageKicker: 'VERTEIDIGUNGSWERKSTATT', garageIntro: 'Rüste deine Kanone aus und gestalte deine Basis.', garageWallet: 'VERFÜGBARE RESSOURCEN', publicAd: '📺 Belohnungsanzeige', reward: 'Belohnung', availableIn: 'Verfügbar in', seconds: 'Sekunden...', copied: '✅ Kopiert!', tier_basic: 'Grundlegend', tier_easy: 'Einfach', tier_medium: 'Mittel', tier_hard: 'Schwer', tier_very_hard: 'Sehr schwer', tier_master: 'Meister'
        },
        zh: {
            tagline: '思考 • 瞄准 • 防守', subtitle: '选择你的思维武器，守卫基地。', maths: '数学', geo: '地理', translation: '翻译', culture: '常识', random: '随机模式', garage: '防御车库', resume: '▶ 继续游戏', campaign: '闯关模式', campaignSmall: '6 个难度 · 每级 2 回合', survival: '生存模式', survivalSmall: '240 道题 · 难度固定',
            configure: '设置', settings: '设置', settingsIntro: '开始前自定义你的防御。', sound: '🔊 音效', soundHelp: '游戏音效', vibration: '📳 震动', vibrationHelp: '手机触觉反馈', mobile: '📱 手机界面', mobileHelp: '放大的触屏按钮', target: '🌐 目标语言', targetHelp: '翻译题目使用', uiLanguage: '🌍 界面语言', uiLanguageHelp: '自动使用手机语言，也可手动选择', auto: '自动（手机语言）', done: '完成', survivalConfig: '生存模式设置', prepare: '准备防御', survivalIntro: '为 240 道题选择主题和固定难度。', theme: '主题', difficulty: '固定难度', back: '← 返回', launch: '开始生存模式', pause: '⏸️ 暂停', manualPause: '游戏已暂停。你想做什么？', quit: '❌ 返回菜单', continue: '▶️ 继续', retryTitle: '描绘图形', retryIntro: '钥匙作为挑战。懒惰之王正在考验你。', retryCancel: '放弃继续', interrupted: '游戏中断', recovery: '游戏遇到错误。最近的进度已保存。', home: '返回菜单', stars: '星星', retryKeys: '重试钥匙', ad: '奖励广告', themeWon: '★ 已通关', record: '纪录', score: '分数', best: '纪录', combo: '连击', wanted: '生命', retry: '重试', gameover: '💥 基地被摧毁', retryContinue: '🔑 使用重试钥匙继续', retryEmpty: '没有重试钥匙。可在主页观看奖励广告获得。', playAgain: '重玩此主题', challenge: '📤 挑战好友', changeTheme: '更换主题', retryKicker: '继续挑战', recoveryKicker: '恢复', garageKicker: '防御工坊', garageIntro: '装备火炮并自定义基地。', garageWallet: '可用资源', publicAd: '📺 奖励广告', reward: '奖励', availableIn: '还需', seconds: '秒…', copied: '✅ 已复制！', tier_basic: '基础', tier_easy: '简单', tier_medium: '中等', tier_hard: '困难', tier_very_hard: '极难', tier_master: '大师'
        },
        ru: {
            tagline: 'ДУМАЙ • ЦЕЛЬСЯ • ЗАЩИЩАЙ', subtitle: 'Выбери интеллектуальный арсенал и защити базу.', maths: 'Математика', geo: 'География', translation: 'Перевод', culture: 'Общие знания', random: 'Случайный режим', garage: 'Гараж обороны', resume: '▶ Продолжить игру', campaign: 'Режим кампании', campaignSmall: '6 уровней · по 2 раунда', survival: 'Режим выживания', survivalSmall: '240 вопросов · постоянная сложность',
            configure: 'НАСТРОЙКИ', settings: 'Настройки', settingsIntro: 'Настрой защиту перед запуском.', sound: '🔊 Звук', soundHelp: 'Звуковые эффекты игры', vibration: '📳 Вибрация', vibrationHelp: 'Тактильный отклик на телефоне', mobile: '📱 Мобильный интерфейс', mobileHelp: 'Увеличенные сенсорные кнопки', target: '🌐 Целевой язык', targetHelp: 'Для вопросов на перевод', uiLanguage: '🌍 Язык интерфейса', uiLanguageHelp: 'Автоматически по языку телефона или вручную', auto: 'Автоматически (язык телефона)', done: 'Готово', survivalConfig: 'НАСТРОЙКА ВЫЖИВАНИЯ', prepare: 'Подготовь защиту', survivalIntro: 'Выбери тему и сложность для 240 вопросов.', theme: 'Тема', difficulty: 'Фиксированная сложность', back: '← Назад', launch: 'Начать выживание', pause: '⏸️ Пауза', manualPause: 'Игра приостановлена. Что будем делать?', quit: '❌ В меню', continue: '▶️ Продолжить', retryTitle: 'Нарисуй фигуру', retryIntro: 'На кону ключ. Король Лени проверяет тебя.', retryCancel: 'Отказаться от продолжения', interrupted: 'Игра прервана', recovery: 'Ошибка остановила игру. Последний прогресс сохранён.', home: 'Вернуться в меню', stars: 'ЗВЁЗДЫ', retryKeys: 'КЛЮЧИ RETRY', ad: 'Реклама с наградой', themeWon: '★ ПРОЙДЕНО', record: 'Рекорд', score: 'СЧЁТ', best: 'Рекорд', combo: 'КОМБО', wanted: 'ЖИЗНИ', retry: 'RETRY', gameover: '💥 База уничтожена', retryContinue: '🔑 Продолжить с ключом Retry', retryEmpty: 'Нет ключа Retry. Его можно получить за просмотр рекламы в главном меню.', playAgain: 'Сыграть эту тему снова', challenge: '📤 Вызвать друга', changeTheme: 'Сменить тему', retryKicker: 'ИСПЫТАНИЕ RETRY', recoveryKicker: 'ВОССТАНОВЛЕНИЕ', garageKicker: 'МАСТЕРСКАЯ ОБОРОНЫ', garageIntro: 'Установи пушку и настрой базу.', garageWallet: 'ДОСТУПНЫЕ РЕСУРСЫ', publicAd: '📺 Реклама с наградой', reward: 'Награда', availableIn: 'Доступно через', seconds: 'сек...', copied: '✅ Скопировано!', tier_basic: 'Базовый', tier_easy: 'Лёгкий', tier_medium: 'Средний', tier_hard: 'Сложный', tier_very_hard: 'Очень сложный', tier_master: 'Мастер'
        }
    };
    const selectors = {
        tagline: '.logo-tagline', subtitle: '#home-subtitle', maths: '#home-theme-grid .theme-maths .theme-name', geo: '#home-theme-grid .theme-geo .theme-name', translation: '#home-theme-grid .theme-anglais .theme-name', culture: '#home-theme-grid .theme-culture .theme-name', random: '#home-theme-grid .theme-random .theme-name',
        garage: '.garage-open-btn', resume: '#resume-run-btn', campaign: '.campaign-btn', campaignSmall: '.campaign-btn small', survival: '.survival-btn', survivalSmall: '.survival-btn small', configure: '.settings-panel .panel-kicker', settings: '.settings-panel h1', settingsIntro: '.settings-panel > p', done: '.settings-panel > button',
        survivalConfig: '#survival-setup .panel-kicker', prepare: '#survival-title', survivalIntro: '#survival-setup .modal-panel > p', theme: '#survival-setup .setup-label:first-of-type', difficulty: '#survival-setup .setup-label:nth-of-type(2)', back: '#survival-setup .dialog-back', launch: '#survival-setup .survival-launch', pause: '#pause-menu h1', manualPause: '#pause-menu p', continue: '#pause-menu button[onclick="resumeGame()"]', quit: '#pause-menu button[onclick="quitGame()"]', retryTitle: '#retry-figure-title', retryIntro: '#retry-instructions', retryCancel: '.retry-abandon', interrupted: '#interruption-title', recovery: '#interruption-message', home: '#interruption-screen button.btn-secondary', stars: '.home-resource-station .resource-count:first-child small', retryKeys: '.home-resource-station .retry-resource small', gameover: '#gameover-title', retryContinue: '#retry-key-btn', retryEmpty: '#retry-empty-message', playAgain: '#gameover-screen button[onclick^="startGame"]', challenge: '#gameover-screen button[onclick="shareGame()"]', changeTheme: '#gameover-screen button[onclick="showMenu()"]', retryKicker: '.retry-challenge-panel .panel-kicker', recoveryKicker: '.interruption-panel .panel-kicker', garageKicker: '.garage-panel .panel-kicker', garageIntro: '.garage-panel > p', garageWallet: '.garage-wallet > span'
    };
    const labels = { en: 'English', fr: 'Français', es: 'Español', de: 'Deutsch', zh: '中文', ru: 'Русский' };
    const extra = {
        fr: { round: 'tour', completed: 'terminé', next: 'Prochaine étape', missionComplete: 'Mission accomplie !', campaignComplete: 'Tu as terminé les 6 parcours et leurs 12 tours. Bravo, défenseur du cerveau !', gameoverSurvival: 'Base détruite · Survival', survivalComplete: 'Survival terminé !', points: 'points', recovery: 'Le jeu a été mis en pause pendant ton absence. Ta progression est conservée.' },
        en: { round: 'round', completed: 'completed', next: 'Next up', missionComplete: 'Mission complete!', campaignComplete: 'You completed all 6 levels and 12 rounds. Well defended!', gameoverSurvival: 'Base destroyed · Survival', survivalComplete: 'Survival complete!', points: 'points', recovery: 'The game was paused while you were away. Your progress is saved.' },
        es: { round: 'ronda', completed: 'completada', next: 'Siguiente', missionComplete: '¡Misión cumplida!', campaignComplete: 'Has completado los 6 niveles y las 12 rondas. ¡Bien defendido!', gameoverSurvival: 'Base destruida · Supervivencia', survivalComplete: '¡Supervivencia completada!', points: 'puntos', recovery: 'El juego se pausó durante tu ausencia. Tu progreso está guardado.' },
        de: { round: 'Runde', completed: 'abgeschlossen', next: 'Als Nächstes', missionComplete: 'Mission erfüllt!', campaignComplete: 'Du hast alle 6 Stufen und 12 Runden geschafft. Gut verteidigt!', gameoverSurvival: 'Basis zerstört · Überleben', survivalComplete: 'Überleben abgeschlossen!', points: 'Punkte', recovery: 'Das Spiel wurde während deiner Abwesenheit pausiert. Dein Fortschritt ist gespeichert.' },
        zh: { round: '回合', completed: '已完成', next: '下一步', missionComplete: '任务完成！', campaignComplete: '你完成了全部 6 个难度和 12 个回合，防守成功！', gameoverSurvival: '基地被摧毁 · 生存模式', survivalComplete: '生存模式完成！', points: '分', recovery: '你离开期间游戏已暂停，进度已保存。' },
        ru: { round: 'раунд', completed: 'завершён', next: 'Далее', missionComplete: 'Миссия выполнена!', campaignComplete: 'Пройдены все 6 уровней и 12 раундов. Отличная защита!', gameoverSurvival: 'База уничтожена · Выживание', survivalComplete: 'Выживание завершено!', points: 'очков', recovery: 'Игра была приостановлена, пока вас не было. Прогресс сохранён.' }
    };
    Object.assign(selectors, {
        pauseQuote: '#pause-screen .king-quote-copy > span', gameoverQuote: '#gameover-screen .king-quote-copy > span',
        scoreLine: '#pause-screen > p:first-of-type', pauseBreather: '#pause-screen > p:last-of-type',
        replayCampaign: '#campaign-complete-actions button:first-child',
        chooseCampaignTheme: '#campaign-complete-actions button:nth-child(2)',
        campaignHome: '#campaign-complete-actions button:nth-child(3)',
        reviveVideo: '#revive-video-btn',
        finalScoreLabel: '#gameover-screen .result-score > span',
        themeLabel: '#gameover-screen .result-stats > div:nth-child(1) > span',
        levelLabel: '#gameover-screen .result-stats > div:nth-child(2) > span',
        progressLabel: '#gameover-screen .result-stats > div:nth-child(3) > span',
        recordLabel: '#gameover-screen .result-stats > div:nth-child(4) > span'
    });
    const additionalCopy = {
        fr: { pauseQuote: 'LE ROI PARESSE DIT', gameoverQuote: 'LE ROI PARESSE DIT', pauseScorePrefix: 'Score actuel :', pauseBreather: 'Prends quelques secondes pour souffler avant la suite.', replayCampaign: '🔄 Rejouer le parcours', chooseCampaignTheme: '🎯 Choisir un autre thème', campaignHome: '🏠 Menu principal', reviveVideo: '🎬 Regarder une vidéo pour revivre', reviveReward: 'Une reprise de partie', finalScoreLabel: 'SCORE FINAL', themeLabel: 'THÈME', levelLabel: 'NIVEAU', progressLabel: 'PROGRESSION', recordLabel: 'RECORD', survivalMode: 'MODE SURVIVAL', campaignMode: 'MODE PARCOURS', missionMode: 'MISSION ACCOMPLIE' },
        en: { pauseQuote: 'KING LAZINESS SAYS', gameoverQuote: 'KING LAZINESS SAYS', pauseScorePrefix: 'Current score:', pauseBreather: 'Take a few seconds to catch your breath before the next round.', replayCampaign: '🔄 Replay campaign', chooseCampaignTheme: '🎯 Choose another theme', campaignHome: '🏠 Main menu', reviveVideo: '🎬 Watch a video to continue', reviveReward: 'One continue', finalScoreLabel: 'FINAL SCORE', themeLabel: 'THEME', levelLabel: 'LEVEL', progressLabel: 'PROGRESS', recordLabel: 'BEST', survivalMode: 'SURVIVAL MODE', campaignMode: 'CAMPAIGN MODE', missionMode: 'MISSION COMPLETE' },
        es: { pauseQuote: 'EL REY PEREZA DICE', gameoverQuote: 'EL REY PEREZA DICE', pauseScorePrefix: 'Puntuación actual:', pauseBreather: 'Tómate unos segundos para descansar antes de continuar.', replayCampaign: '🔄 Repetir campaña', chooseCampaignTheme: '🎯 Elegir otro tema', campaignHome: '🏠 Menú principal', reviveVideo: '🎬 Ver un vídeo para continuar', reviveReward: 'Una continuación', finalScoreLabel: 'PUNTUACIÓN FINAL', themeLabel: 'TEMA', levelLabel: 'NIVEL', progressLabel: 'PROGRESO', recordLabel: 'RÉCORD', survivalMode: 'MODO SUPERVIVENCIA', campaignMode: 'MODO CAMPAÑA', missionMode: 'MISIÓN COMPLETADA' },
        de: { pauseQuote: 'KÖNIG FAULHEIT SAGT', gameoverQuote: 'KÖNIG FAULHEIT SAGT', pauseScorePrefix: 'Aktueller Punktestand:', pauseBreather: 'Atme kurz durch, bevor es weitergeht.', replayCampaign: '🔄 Kampagne erneut spielen', chooseCampaignTheme: '🎯 Anderes Thema wählen', campaignHome: '🏠 Hauptmenü', reviveVideo: '🎬 Video ansehen und weiterspielen', reviveReward: 'Eine Fortsetzung', finalScoreLabel: 'ENDPUNKTZAHL', themeLabel: 'THEMA', levelLabel: 'STUFE', progressLabel: 'FORTSCHRITT', recordLabel: 'REKORD', survivalMode: 'SURVIVAL-MODUS', campaignMode: 'KAMPAGNENMODUS', missionMode: 'MISSION ERFÜLLT' },
        zh: { pauseQuote: '懒惰国王说', gameoverQuote: '懒惰国王说', pauseScorePrefix: '当前得分：', pauseBreather: '稍作休息，然后继续下一回合。', replayCampaign: '🔄 重玩战役', chooseCampaignTheme: '🎯 选择其他主题', campaignHome: '🏠 主菜单', reviveVideo: '🎬 观看视频后继续', reviveReward: '继续一次', finalScoreLabel: '最终得分', themeLabel: '主题', levelLabel: '等级', progressLabel: '进度', recordLabel: '纪录', survivalMode: '生存模式', campaignMode: '战役模式', missionMode: '任务完成' },
        ru: { pauseQuote: 'КОРОЛЬ ЛЕНИ ГОВОРИТ', gameoverQuote: 'КОРОЛЬ ЛЕНИ ГОВОРИТ', pauseScorePrefix: 'Текущий счёт:', pauseBreather: 'Перед продолжением можно немного перевести дух.', replayCampaign: '🔄 Пройти кампанию снова', chooseCampaignTheme: '🎯 Выбрать другую тему', campaignHome: '🏠 Главное меню', reviveVideo: '🎬 Посмотреть видео и продолжить', reviveReward: 'Одно продолжение', finalScoreLabel: 'ИТОГОВЫЙ СЧЁТ', themeLabel: 'ТЕМА', levelLabel: 'УРОВЕНЬ', progressLabel: 'ПРОГРЕСС', recordLabel: 'РЕКОРД', survivalMode: 'РЕЖИМ ВЫЖИВАНИЯ', campaignMode: 'РЕЖИМ КАМПАНИИ', missionMode: 'МИССИЯ ВЫПОЛНЕНА' }
    };
    for (const [code, labels] of Object.entries(additionalCopy)) Object.assign(extra[code], labels);

    const storageKey = 'chrono_ui_language';
    let preference = 'auto';
    let language = 'fr';
    function detect() {
        const candidates = [...(navigator.languages || []), navigator.language || ''];
        for (const candidate of candidates) {
            const code = String(candidate).toLowerCase().split(/[-_]/)[0];
            if (supported.includes(code)) return code;
        }
        return 'en';
    }
    function apply() {
        const pack = copy[language] || copy.en;
        document.documentElement.lang = language;
        for (const [key, selector] of Object.entries(selectors)) {
            const node = document.querySelector(selector);
            const localizedValue = extra[language]?.[key] || pack[key];
            if (!node || !localizedValue) continue;
            if (key === 'scoreLine') {
                const score = node.querySelector('#pause-score')?.textContent || '0';
                node.innerHTML = `${extra[language]?.pauseScorePrefix || 'Current score:'} <strong id="pause-score">${score}</strong> ${extra[language]?.points || 'points'}.`;
                continue;
            }
            if (node.matches('button')) {
                const textNode = [...node.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
                if (textNode) textNode.textContent = ` ${localizedValue} `;
                else node.insertBefore(document.createTextNode(localizedValue), node.firstChild);
            } else node.textContent = localizedValue;
        }
        const homeSettingsLabel = document.querySelector('.home-settings-label');
        if (homeSettingsLabel) homeSettingsLabel.textContent = pack.settings;
        const homeSettingsButton = document.querySelector('.settings-gear');
        if (homeSettingsButton) {
            homeSettingsButton.setAttribute('aria-label', pack.settings);
            homeSettingsButton.title = pack.settings;
        }
        const select = document.getElementById('setting-ui-language');
        if (select) select.value = preference;
        const autoOption = select?.querySelector('option[value="auto"]');
        if (autoOption) autoOption.textContent = pack.auto;
        const interruptionResume = document.querySelector('#interruption-screen button.btn-main');
        if (interruptionResume) interruptionResume.textContent = pack.resume;
        document.querySelectorAll('[data-i18n="theme-won"]').forEach(node => node.textContent = pack.themeWon);
        document.querySelectorAll('[data-i18n="record-prefix"]').forEach(node => node.textContent = pack.record);
        document.querySelectorAll('[data-i18n="hud-score"]').forEach(node => node.textContent = pack.score);
        document.querySelectorAll('[data-i18n="hud-combo"]').forEach(node => node.textContent = pack.combo);
        document.querySelectorAll('[data-i18n="hud-wanted"]').forEach(node => node.textContent = pack.wanted);
        document.querySelectorAll('[data-i18n="hud-retry"]').forEach(node => node.textContent = pack.retry);
        const themeNames = { maths: pack.maths, geo: pack.geo, anglais: pack.translation, culture: pack.culture, random: pack.random };
        for (const [theme, name] of Object.entries(themeNames)) {
            document.querySelectorAll(`.survival-theme-grid .theme-${theme} .theme-name`).forEach(node => node.textContent = name);
        }
        document.querySelectorAll('#survival-difficulties .difficulty-choice').forEach((node, index) => node.textContent = window.UI18n.t(['tier_basic', 'tier_easy', 'tier_medium', 'tier_hard', 'tier_very_hard', 'tier_master'][index]));
        const targetRow = document.querySelector('.setting-language > span');
        if (targetRow) { targetRow.querySelector('b').textContent = pack.target; targetRow.querySelector('small').textContent = pack.targetHelp; }
        const uiRow = document.querySelector('.setting-ui-language > span');
        if (uiRow) { uiRow.querySelector('b').textContent = pack.uiLanguage; uiRow.querySelector('small').textContent = pack.uiLanguageHelp; }
        for (const [id, title, help] of [['setting-sound', pack.sound, pack.soundHelp], ['setting-vibration', pack.vibration, pack.vibrationHelp], ['setting-mobile', pack.mobile, pack.mobileHelp]]) {
            const row = document.getElementById(id)?.closest('.setting-row');
            if (row) { row.querySelector('b').textContent = title; row.querySelector('small').textContent = help; }
        }
        for (const [code, name] of Object.entries(labels)) {
            const opt = document.querySelector(`#setting-ui-language option[value="${code}"]`);
            if (opt) opt.textContent = name;
        }
        window.dispatchEvent(new CustomEvent('brain-defense-language-change', { detail: { language } }));
    }
    function setLanguage(value) {
        preference = value === 'auto' || supported.includes(value) ? value : 'auto';
        try { Storage.setItem(storageKey, preference); } catch (_) {}
        language = preference === 'auto' ? detect() : preference;
        apply();
    }
    try { preference = Storage.getItem(storageKey) || 'auto'; } catch (_) {}
    language = preference === 'auto' || !supported.includes(preference) ? detect() : preference;
    window.UI18n = {
        supported, labels, get language() { return language; }, get preference() { return preference; },
        setLanguage, apply, t(key) { return extra[language]?.[key] || (copy[language] || copy.en)[key] || copy.en[key] || key; },
        tier(index) { return this.t(['tier_basic', 'tier_easy', 'tier_medium', 'tier_hard', 'tier_very_hard', 'tier_master'][index] || 'tier_basic'); }
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
    else apply();
})();
