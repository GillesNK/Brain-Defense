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
            retryTitle: 'Trace la figure', retryIntro: 'Trace toutes les lignes sans lever le doigt ni repasser dessus. Le Roi Paresse te met à l’épreuve.', retryOpenTrail: 'Trace chaque ligne une seule fois, sans lever le doigt. Commence au point vert et termine au point doré.', retryCancel: '✖️ Abandonner cette reprise',
            interrupted: 'Partie interrompue', recovery: 'Une erreur a interrompu le jeu. Ta dernière progression est conservée.',
            home: '🏠 Retour au menu', stars: 'ÉTOILES', retryKeys: 'CLÉS RETRY', ad: 'Pub récompensée',
            themeWon: '★ GAGNÉ', record: 'Record', score: 'SCORE', best: 'Record', combo: 'COMBO', wanted: 'WANTED', retry: 'RETRY',
            gameover: '💥 Base Détruite', retryContinue: '🔑 Continuer avec une clé Retry', retryEmpty: 'Aucune clé Retry. Tu peux en gagner à l’accueil avec une pub récompensée.', playAgain: '🔄 Rejouer ce thème', challenge: '📤 Défier un ami', changeTheme: '🏠 Changer de thème',
            retryKicker: 'ÉPREUVE DE REPRISE', recoveryKicker: 'RÉCUPÉRATION', garageKicker: 'ATELIER DE DÉFENSE', garageIntro: 'Équipe ton canon et personnalise ta base.', garageWallet: 'RESSOURCES DISPONIBLES',
            publicAd: '📺 Publicité récompensée', reward: 'Récompense', availableIn: 'Disponible dans', seconds: 'secondes...', copied: '✅ Copié !', noAdAvailable: '📺 Aucune publicité disponible pour le moment. Réessaie dans quelques instants.',
            tier_basic: 'Basique', tier_easy: 'Facile', tier_medium: 'Moyen', tier_hard: 'Difficile', tier_very_hard: 'Très difficile', tier_master: 'Master'
        },
        en: {
            tagline: 'THINK • AIM • DEFEND', subtitle: 'Choose your mental arsenal and defend your base.', maths: 'Math', geo: 'Geography', translation: 'Translation', culture: 'Trivia', random: 'Random Mode',
            garage: 'Defense Garage', resume: '▶ Resume game', campaign: 'Campaign Mode', campaignSmall: '6 levels · 2 rounds each', survival: 'Survival Mode', survivalSmall: '240 questions · fixed difficulty',
            configure: 'SETUP', settings: 'Settings', settingsIntro: 'Customize your defense before launch.', sound: '🔊 Sound', soundHelp: 'Game audio effects', vibration: '📳 Vibration', vibrationHelp: 'Tactile feedback on mobile', mobile: '📱 Mobile interface', mobileHelp: 'Larger touch controls',
            target: '🌐 Target language', targetHelp: 'For translation questions', uiLanguage: '🌍 Interface language', uiLanguageHelp: 'Automatic from your device, or choose manually', auto: 'Automatic (device language)', done: 'Done',
            survivalConfig: 'SURVIVAL SETUP', prepare: 'Prepare your defense', survivalIntro: 'Choose a theme and fixed difficulty for all 240 questions.', theme: 'Theme', difficulty: 'Fixed difficulty', back: '← Back', launch: 'Start Survival',
            pause: '⏸️ Paused', manualPause: 'The game is paused. What would you like to do?', quit: '❌ Quit to menu', continue: '▶️ Resume', retryTitle: 'Trace the figure', retryIntro: 'Trace every line without lifting your finger or retracing. King Laziness is testing you.', retryOpenTrail: 'Trace every line once without lifting your finger. Start at the green dot and finish at the gold dot.', retryCancel: '✖️ Abandon this retry',
            interrupted: 'Game interrupted', recovery: 'An error stopped the game. Your latest progress is saved.', home: 'Back to menu', stars: 'STARS', retryKeys: 'RETRY KEYS', ad: 'Reward ad', themeWon: '★ CLEARED', record: 'Record', score: 'SCORE', best: 'Best', combo: 'COMBO', wanted: 'WANTED', retry: 'RETRY',
            gameover: '💥 Base Destroyed', retryContinue: '🔑 Continue with a Retry Key', retryEmpty: 'No Retry Key. Earn one from a rewarded ad on the home screen.', playAgain: '🔄 Replay this theme', challenge: '📤 Challenge a friend', changeTheme: '🏠 Change theme', retryKicker: 'RETRY CHALLENGE', recoveryKicker: 'RECOVERY', garageKicker: 'DEFENSE WORKSHOP', garageIntro: 'Equip your cannon and customize your base.', garageWallet: 'AVAILABLE RESOURCES', publicAd: '📺 Rewarded ad', reward: 'Reward', availableIn: 'Available in', seconds: 'seconds...', copied: '✅ Copied!', noAdAvailable: '📺 No ad available right now. Try again in a moment.', tier_basic: 'Basic', tier_easy: 'Easy', tier_medium: 'Medium', tier_hard: 'Hard', tier_very_hard: 'Very hard', tier_master: 'Master'
        },
        es: {
            tagline: 'PIENSA • APUNTA • DEFIENDE', subtitle: 'Elige tu arsenal mental y defiende tu base.', maths: 'Matemáticas', geo: 'Geografía', translation: 'Traducción', culture: 'Cultura general', random: 'Modo aleatorio', garage: 'Garaje de defensa', resume: '▶ Reanudar partida', campaign: 'Modo campaña', campaignSmall: '6 niveles · 2 rondas cada uno', survival: 'Modo supervivencia', survivalSmall: '240 preguntas · dificultad fija',
            configure: 'CONFIGURACIÓN', settings: 'Ajustes', settingsIntro: 'Personaliza tu defensa antes de empezar.', sound: '🔊 Sonido', soundHelp: 'Efectos de audio del juego', vibration: '📳 Vibración', vibrationHelp: 'Respuesta táctil en móvil', mobile: '📱 Interfaz móvil', mobileHelp: 'Controles táctiles ampliados', target: '🌐 Idioma objetivo', targetHelp: 'Para las preguntas de traducción', uiLanguage: '🌍 Idioma de la interfaz', uiLanguageHelp: 'Automático según el móvil o selección manual', auto: 'Automático (idioma del móvil)', done: 'Listo', survivalConfig: 'CONFIGURACIÓN DE SUPERVIVENCIA', prepare: 'Prepara tu defensa', survivalIntro: 'Elige tema y dificultad fija para las 240 preguntas.', theme: 'Tema', difficulty: 'Dificultad fija', back: '← Volver', launch: 'Iniciar supervivencia', pause: '⏸️ Pausa', manualPause: 'El juego está en pausa. ¿Qué quieres hacer?', quit: '❌ Salir al menú', continue: '▶️ Continuar', retryTitle: 'Traza la figura', retryIntro: 'Traza todas las líneas sin levantar el dedo ni repetir ningún trazo. El Rey Pereza te pone a prueba.', retryOpenTrail: 'Traza cada línea una vez sin levantar el dedo. Empieza en el punto verde y termina en el dorado.', retryCancel: '✖️ Abandonar esta reanudación', interrupted: 'Partida interrumpida', recovery: 'Un error detuvo el juego. Tu último progreso está guardado.', home: 'Volver al menú', stars: 'ESTRELLAS', retryKeys: 'LLAVES RETRY', ad: 'Anuncio recompensado', themeWon: '★ SUPERADO', record: 'Récord', score: 'PUNTUACIÓN', best: 'Récord', combo: 'COMBO', wanted: 'VIDAS', retry: 'RETRY', gameover: '💥 Base destruida', retryContinue: '🔑 Continuar con una llave Retry', retryEmpty: 'No tienes llaves Retry. Puedes conseguir una con un anuncio en el inicio.', playAgain: '🔄 Repetir este tema', challenge: '📤 Desafiar a un amigo', changeTheme: '🏠 Cambiar tema', retryKicker: 'PRUEBA DE REANUDACIÓN', recoveryKicker: 'RECUPERACIÓN', garageKicker: 'TALLER DE DEFENSA', garageIntro: 'Equipa tu cañón y personaliza tu base.', garageWallet: 'RECURSOS DISPONIBLES', publicAd: '📺 Anuncio recompensado', reward: 'Recompensa', availableIn: 'Disponible en', seconds: 'segundos...', copied: '✅ ¡Copiado!', noAdAvailable: '📺 No hay ningún anuncio disponible ahora. Inténtalo de nuevo en unos instantes.', tier_basic: 'Básico', tier_easy: 'Fácil', tier_medium: 'Medio', tier_hard: 'Difícil', tier_very_hard: 'Muy difícil', tier_master: 'Master'
        },
        de: {
            tagline: 'DENKE • ZIELE • VERTEIDIGE', subtitle: 'Wähle dein mentales Arsenal und verteidige deine Basis.', maths: 'Mathe', geo: 'Geografie', translation: 'Übersetzung', culture: 'Allgemeinwissen', random: 'Zufallsmodus', garage: 'Verteidigungsgarage', resume: '▶ Spiel fortsetzen', campaign: 'Kampagnenmodus', campaignSmall: '6 Stufen · je 2 Runden', survival: 'Überlebensmodus', survivalSmall: '240 Fragen · feste Schwierigkeit',
            configure: 'EINSTELLUNGEN', settings: 'Einstellungen', settingsIntro: 'Passe deine Verteidigung vor dem Start an.', sound: '🔊 Ton', soundHelp: 'Audioeffekte im Spiel', vibration: '📳 Vibration', vibrationHelp: 'Haptisches Feedback auf Mobilgeräten', mobile: '📱 Mobile Oberfläche', mobileHelp: 'Größere Touch-Steuerung', target: '🌐 Zielsprache', targetHelp: 'Für Übersetzungsfragen', uiLanguage: '🌍 Oberflächensprache', uiLanguageHelp: 'Automatisch nach Gerätesprache oder manuell wählen', auto: 'Automatisch (Gerätesprache)', done: 'Fertig', survivalConfig: 'ÜBERLEBENSMODUS', prepare: 'Bereite deine Verteidigung vor', survivalIntro: 'Wähle Thema und feste Schwierigkeit für 240 Fragen.', theme: 'Thema', difficulty: 'Feste Schwierigkeit', back: '← Zurück', launch: 'Survival starten', pause: '⏸️ Pause', manualPause: 'Das Spiel pausiert. Was möchtest du tun?', quit: '❌ Zum Menü', continue: '▶️ Weiter', retryTitle: 'Zeichne die Figur', retryIntro: 'Zeichne alle Linien, ohne den Finger abzuheben oder eine Linie erneut zu ziehen. König Faulheit prüft dich.', retryOpenTrail: 'Zeichne jede Linie einmal, ohne den Finger abzuheben. Beginne am grünen Punkt und ende am goldenen Punkt.', retryCancel: '✖️ Fortsetzen abbrechen', interrupted: 'Spiel unterbrochen', recovery: 'Ein Fehler hat das Spiel gestoppt. Dein letzter Fortschritt ist gespeichert.', home: 'Zurück zum Menü', stars: 'STERNE', retryKeys: 'RETRY-SCHLÜSSEL', ad: 'Belohnungswerbung', themeWon: '★ GESCHAFFT', record: 'Rekord', score: 'PUNKTE', best: 'Rekord', combo: 'KOMBO', wanted: 'LEBEN', retry: 'RETRY', gameover: '💥 Basis zerstört', retryContinue: '🔑 Mit Retry-Schlüssel fortsetzen', retryEmpty: 'Kein Retry-Schlüssel. Du kannst einen über eine Belohnungsanzeige erhalten.', playAgain: '🔄 Thema erneut spielen', challenge: '📤 Freund herausfordern', changeTheme: '🏠 Thema wechseln', retryKicker: 'RETRY-PRÜFUNG', recoveryKicker: 'WIEDERHERSTELLUNG', garageKicker: 'VERTEIDIGUNGSWERKSTATT', garageIntro: 'Rüste deine Kanone aus und gestalte deine Basis.', garageWallet: 'VERFÜGBARE RESSOURCEN', publicAd: '📺 Belohnungsanzeige', reward: 'Belohnung', availableIn: 'Verfügbar in', seconds: 'Sekunden...', copied: '✅ Kopiert!', noAdAvailable: '📺 Momentan keine Anzeige verfügbar. Versuche es in einem Moment erneut.', tier_basic: 'Grundlegend', tier_easy: 'Einfach', tier_medium: 'Mittel', tier_hard: 'Schwer', tier_very_hard: 'Sehr schwer', tier_master: 'Meister'
        },
        zh: {
            tagline: '思考 • 瞄准 • 防守', subtitle: '选择你的思维武器，守卫基地。', maths: '数学', geo: '地理', translation: '翻译', culture: '常识', random: '随机模式', garage: '防御车库', resume: '▶ 继续游戏', campaign: '闯关模式', campaignSmall: '6 个难度 · 每级 2 回合', survival: '生存模式', survivalSmall: '240 道题 · 难度固定',
            configure: '设置', settings: '设置', settingsIntro: '开始前自定义你的防御。', sound: '🔊 音效', soundHelp: '游戏音效', vibration: '📳 震动', vibrationHelp: '手机触觉反馈', mobile: '📱 手机界面', mobileHelp: '放大的触屏按钮', target: '🌐 目标语言', targetHelp: '翻译题目使用', uiLanguage: '🌍 界面语言', uiLanguageHelp: '自动使用手机语言，也可手动选择', auto: '自动（手机语言）', done: '完成', survivalConfig: '生存模式设置', prepare: '准备防御', survivalIntro: '为 240 道题选择主题和固定难度。', theme: '主题', difficulty: '固定难度', back: '← 返回', launch: '开始生存模式', pause: '⏸️ 暂停', manualPause: '游戏已暂停。你想做什么？', quit: '❌ 返回菜单', continue: '▶️ 继续', retryTitle: '描绘图形', retryIntro: '不抬起手指、不重复描线，画完所有线段。懒惰之王正在考验你。', retryOpenTrail: '每条线只画一次，不抬起手指。从绿色点开始，在金色点结束。', retryCancel: '✖️ 放弃继续', interrupted: '游戏中断', recovery: '游戏遇到错误。最近的进度已保存。', home: '返回菜单', stars: '星星', retryKeys: '重试钥匙', ad: '奖励广告', themeWon: '★ 已通关', record: '纪录', score: '分数', best: '纪录', combo: '连击', wanted: '生命', retry: '重试', gameover: '💥 基地被摧毁', retryContinue: '🔑 使用重试钥匙继续', retryEmpty: '没有重试钥匙。可在主页观看奖励广告获得。', playAgain: '🔄 重玩此主题', challenge: '📤 挑战好友', retryKicker: '继续挑战', recoveryKicker: '恢复', garageKicker: '防御工坊', garageIntro: '装备火炮并自定义基地。', garageWallet: '可用资源', publicAd: '📺 奖励广告', reward: '奖励', availableIn: '还需', seconds: '秒…', copied: '✅ 已复制！', noAdAvailable: '📺 暂时没有可用的广告，请稍后重试。', tier_basic: '基础', tier_easy: '简单', tier_medium: '中等', tier_hard: '困难', tier_very_hard: '极难', tier_master: '大师'
        },
        ru: {
            tagline: 'ДУМАЙ • ЦЕЛЬСЯ • ЗАЩИЩАЙ', subtitle: 'Выбери интеллектуальный арсенал и защити базу.', maths: 'Математика', geo: 'География', translation: 'Перевод', culture: 'Общие знания', random: 'Случайный режим', garage: 'Гараж обороны', resume: '▶ Продолжить игру', campaign: 'Режим кампании', campaignSmall: '6 уровней · по 2 раунда', survival: 'Режим выживания', survivalSmall: '240 вопросов · постоянная сложность',
            configure: 'НАСТРОЙКИ', settings: 'Настройки', settingsIntro: 'Настрой защиту перед запуском.', sound: '🔊 Звук', soundHelp: 'Звуковые эффекты игры', vibration: '📳 Вибрация', vibrationHelp: 'Тактильный отклик на телефоне', mobile: '📱 Мобильный интерфейс', mobileHelp: 'Увеличенные сенсорные кнопки', target: '🌐 Целевой язык', targetHelp: 'Для вопросов на перевод', uiLanguage: '🌍 Язык интерфейса', uiLanguageHelp: 'Автоматически по языку телефона или вручную', auto: 'Автоматически (язык телефона)', done: 'Готово', survivalConfig: 'НАСТРОЙКА ВЫЖИВАНИЯ', prepare: 'Подготовь защиту', survivalIntro: 'Выбери тему и сложность для 240 вопросов.', theme: 'Тема', difficulty: 'Фиксированная сложность', back: '← Назад', launch: 'Начать выживание', pause: '⏸️ Пауза', manualPause: 'Игра приостановлена. Что будем делать?', quit: '❌ В меню', continue: '▶️ Продолжить', retryTitle: 'Нарисуй фигуру', retryIntro: 'Проведи все линии, не отрывая палец и не проходя по ним повторно. Король Лени проверяет тебя.', retryOpenTrail: 'Проведи каждую линию один раз, не отрывая палец. Начни с зелёной точки и закончи на золотой.', retryCancel: '✖️ Отказаться от продолжения', interrupted: 'Игра прервана', recovery: 'Ошибка остановила игру. Последний прогресс сохранён.', home: 'Вернуться в меню', stars: 'ЗВЁЗДЫ', retryKeys: 'КЛЮЧИ RETRY', ad: 'Реклама с наградой', themeWon: '★ ПРОЙДЕНО', record: 'Рекорд', score: 'СЧЁТ', best: 'Рекорд', combo: 'КОМБО', wanted: 'ЖИЗНИ', retry: 'RETRY', gameover: '💥 База уничтожена', retryContinue: '🔑 Продолжить с ключом Retry', retryEmpty: 'Нет ключа Retry. Его можно получить за просмотр рекламы в главном меню.', playAgain: '🔄 Сыграть эту тему снова', challenge: '📤 Вызвать друга', changeTheme: '🏠 Сменить тему', retryKicker: 'ИСПЫТАНИЕ RETRY', recoveryKicker: 'ВОССТАНОВЛЕНИЕ', garageKicker: 'МАСТЕРСКАЯ ОБОРОНЫ', garageIntro: 'Установи пушку и настрой базу.', garageWallet: 'ДОСТУПНЫЕ РЕСУРСЫ', publicAd: '📺 Реклама с наградой', reward: 'Награда', availableIn: 'Доступно через', seconds: 'сек...', copied: '✅ Скопировано!', noAdAvailable: '📺 Сейчас нет доступной рекламы. Попробуй ещё раз через мгновение.', tier_basic: 'Базовый', tier_easy: 'Лёгкий', tier_medium: 'Средний', tier_hard: 'Сложный', tier_very_hard: 'Очень сложный', tier_master: 'Мастер'
        }
    };
    const selectors = {
        tagline: '.logo-tagline', subtitle: '#home-subtitle', maths: '#home-theme-grid .theme-maths .theme-name', geo: '#home-theme-grid .theme-geo .theme-name', translation: '#home-theme-grid .theme-anglais .theme-name', culture: '#home-theme-grid .theme-culture .theme-name', random: '#home-theme-grid .theme-random .theme-name',
        garage: '.garage-open-btn', garageTitle: '.garage-panel h1', garageBack: '.garage-panel .back-menu-btn', resume: '#resume-run-btn', campaign: '.campaign-btn', campaignSmall: '.campaign-btn small', survival: '.survival-btn', survivalSmall: '.survival-btn small', configure: '.settings-panel .panel-kicker', settings: '.settings-panel h1', settingsIntro: '.settings-panel > p', done: '.settings-panel > button', adTitle: '#ad-title', adMessage: '#ad-message',
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
    const accessibilityCopy = {
        fr: { question: 'Question', answerChoices: 'Choix de réponses', answerOption: 'Réponse' },
        en: { question: 'Question', answerChoices: 'Answer choices', answerOption: 'Answer' },
        es: { question: 'Pregunta', answerChoices: 'Opciones de respuesta', answerOption: 'Respuesta' },
        de: { question: 'Frage', answerChoices: 'Antwortmöglichkeiten', answerOption: 'Antwort' },
        zh: { question: '问题', answerChoices: '答案选项', answerOption: '答案' },
        ru: { question: 'Вопрос', answerChoices: 'Варианты ответа', answerOption: 'Ответ' }
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
        recordLabel: '#gameover-screen .result-stats > div:nth-child(4) > span',
        watchAd: '.home-resource-station .resource-ad-btn:not(.retry-ad-btn)',
        watchAdRetry: '.home-resource-station .resource-ad-btn.retry-ad-btn'
    });
    const additionalCopy = {
        fr: { pauseQuote: 'LE ROI PARESSE DIT', gameoverQuote: 'LE ROI PARESSE DIT', pauseScorePrefix: 'Score actuel :', pauseBreather: 'Prends quelques secondes pour souffler avant la suite.', replayCampaign: '🔄 Rejouer le parcours', chooseCampaignTheme: '🎯 Choisir un autre thème', campaignHome: '🏠 Menu principal', reviveVideo: '🎬 Regarder une vidéo pour revivre', reviveReward: 'Une reprise de partie', finalScoreLabel: 'SCORE FINAL', themeLabel: 'THÈME', levelLabel: 'NIVEAU', progressLabel: 'PROGRESSION', recordLabel: 'RECORD', survivalMode: 'MODE SURVIVAL', campaignMode: 'MODE PARCOURS', missionMode: 'MISSION ACCOMPLIE', watchAd: 'Pub récompensée', watchAdRetry: 'Pub récompensée', retryLevelPrefix: 'DIFFICULTÉ', retryAbandoned: 'Reprise abandonnée : la clé Retry a été utilisée.', adPreparing: 'Préparation de la publicité…' },
        en: { pauseQuote: 'KING LAZINESS SAYS', gameoverQuote: 'KING LAZINESS SAYS', pauseScorePrefix: 'Current score:', pauseBreather: 'Take a few seconds to catch your breath before the next round.', replayCampaign: '🔄 Replay campaign', chooseCampaignTheme: '🎯 Choose another theme', campaignHome: '🏠 Main menu', reviveVideo: '🎬 Watch a video to continue', reviveReward: 'One continue', finalScoreLabel: 'FINAL SCORE', themeLabel: 'THEME', levelLabel: 'LEVEL', progressLabel: 'PROGRESS', recordLabel: 'BEST', survivalMode: 'SURVIVAL MODE', campaignMode: 'CAMPAIGN MODE', missionMode: 'MISSION COMPLETE', watchAd: 'Rewarded ad', watchAdRetry: 'Rewarded ad', retryLevelPrefix: 'DIFFICULTY', retryAbandoned: 'Retry abandoned: the Retry key was used.', adPreparing: 'Preparing ad request…' },
        es: { pauseQuote: 'EL REY PEREZA DICE', gameoverQuote: 'EL REY PEREZA DICE', pauseScorePrefix: 'Puntuación actual:', pauseBreather: 'Tómate unos segundos para descansar antes de continuar.', replayCampaign: '🔄 Repetir campaña', chooseCampaignTheme: '🎯 Elegir otro tema', campaignHome: '🏠 Menú principal', reviveVideo: '🎬 Ver un vídeo para continuar', reviveReward: 'Una continuación', finalScoreLabel: 'PUNTUACIÓN FINAL', themeLabel: 'TEMA', levelLabel: 'NIVEL', progressLabel: 'PROGRESO', recordLabel: 'RÉCORD', survivalMode: 'MODO SUPERVIVENCIA', campaignMode: 'MODO CAMPAÑA', missionMode: 'MISIÓN COMPLETADA', watchAd: 'Anuncio recompensado', watchAdRetry: 'Anuncio recompensado', retryLevelPrefix: 'DIFICULTAD', retryAbandoned: 'Reanudación abandonada: se usó la llave Retry.', adPreparing: 'Preparando el anuncio…' },
        de: { pauseQuote: 'KÖNIG FAULHEIT SAGT', gameoverQuote: 'KÖNIG FAULHEIT SAGT', pauseScorePrefix: 'Aktueller Punktestand:', pauseBreather: 'Atme kurz durch, bevor es weitergeht.', replayCampaign: '🔄 Kampagne erneut spielen', chooseCampaignTheme: '🎯 Anderes Thema wählen', campaignHome: '🏠 Hauptmenü', reviveVideo: '🎬 Video ansehen und weiterspielen', reviveReward: 'Eine Fortsetzung', finalScoreLabel: 'ENDPUNKTZAHL', themeLabel: 'THEMA', levelLabel: 'STUFE', progressLabel: 'FORTSCHRITT', recordLabel: 'REKORD', survivalMode: 'SURVIVAL-MODUS', campaignMode: 'KAMPAGNENMODUS', missionMode: 'MISSION ERFÜLLT', watchAd: 'Belohnungsanzeige', watchAdRetry: 'Belohnungsanzeige', retryLevelPrefix: 'SCHWIERIGKEIT', retryAbandoned: 'Fortsetzung abgebrochen: Der Retry-Schlüssel wurde verbraucht.', adPreparing: 'Anzeige wird vorbereitet…' },
        zh: { pauseQuote: '懒惰国王说', gameoverQuote: '懒惰国王说', pauseScorePrefix: '当前得分：', pauseBreather: '稍作休息，然后继续下一回合。', replayCampaign: '🔄 重玩战役', chooseCampaignTheme: '🎯 选择其他主题', campaignHome: '🏠 主菜单', reviveVideo: '🎬 观看视频后继续', reviveReward: '继续一次', finalScoreLabel: '最终得分', themeLabel: '主题', levelLabel: '等级', progressLabel: '进度', recordLabel: '纪录', survivalMode: '生存模式', campaignMode: '战役模式', missionMode: '任务完成', watchAd: '奖励广告', watchAdRetry: '奖励广告', retryLevelPrefix: '难度', retryAbandoned: '已放弃继续：重试钥匙已使用。', adPreparing: '正在准备广告…' },
        ru: { pauseQuote: 'КОРОЛЬ ЛЕНИ ГОВОРИТ', gameoverQuote: 'КОРОЛЬ ЛЕНИ ГОВОРИТ', pauseScorePrefix: 'Текущий счёт:', pauseBreather: 'Перед продолжением можно немного перевести дух.', replayCampaign: '🔄 Пройти кампанию снова', chooseCampaignTheme: '🎯 Выбрать другую тему', campaignHome: '🏠 Главное меню', reviveVideo: '🎬 Посмотреть видео и продолжить', reviveReward: 'Одно продолжение', finalScoreLabel: 'ИТОГОВЫЙ СЧЁТ', themeLabel: 'ТЕМА', levelLabel: 'УРОВЕНЬ', progressLabel: 'ПРОГРЕСС', recordLabel: 'РЕКОРД', survivalMode: 'РЕЖИМ ВЫЖИВАНИЯ', campaignMode: 'РЕЖИМ КАМПАНИИ', missionMode: 'МИССИЯ ВЫПОЛНЕНА', watchAd: 'Реклама с наградой', watchAdRetry: 'Реклама с наградой', retryLevelPrefix: 'СЛОЖНОСТЬ', retryAbandoned: 'Продолжение отменено: ключ Retry использован.', adPreparing: 'Подготовка рекламы…' }
    };
    for (const [code, labels] of Object.entries(additionalCopy)) Object.assign(extra[code], labels);
    const localizedExtras = {
        fr: { chooseTheme: 'Choisir un thème', chooseSurvivalTheme: 'Choisir un thème pour le Survival', chooseDifficulty: 'Choisir une difficulté', close: 'Fermer', resourceStationLabel: 'Ressources et publicités récompensées', kingAriaLabel: 'Le Roi Paresse, Viking barbu, réfléchit la main sur la joue', mascotLabel: 'Mascotte pensive avec des symboles éducatifs', retryCanvasLabel: 'Tracer la figure sans lever le doigt', adTitle: 'Publicité récompensée', adPreparing: 'Préparation de la publicité…', feverEnded: 'FEVER TERMINÉ', retryKeyOne: '+1 CLÉ RETRY', freezeThreeSeconds: '❄️ GEL 3 s', extraLife: '+1 VIE', maxLives: 'VIE MAX', pointsAbbreviation: 'PTS', skin_blue: 'Défenseur bleu', skin_emerald: 'Émeraude', skin_solar: 'Solaire', skin_neon: 'Plasma néon', skin_crystal: 'Cristal', skin_void: 'Néant', skinRankStarter: 'DÉPART', skinRankRare: 'RARE', skinRankEpic: 'ÉPIQUE', skinRankLegendary: 'LÉGENDAIRE', skinEquipped: 'ÉQUIPÉ', skinEquip: 'ÉQUIPER', skinBuy: 'ACHETER', skinFree: 'GRATUIT' },
        en: { chooseTheme: 'Choose a theme', chooseSurvivalTheme: 'Choose a Survival theme', chooseDifficulty: 'Choose a difficulty', close: 'Close', resourceStationLabel: 'Resources and rewarded ads', kingAriaLabel: 'King Laziness, a bearded Viking, thinks with his hand on his cheek', mascotLabel: 'Thoughtful mascot with educational symbols', retryCanvasLabel: 'Trace the figure without lifting your finger', adTitle: 'Rewarded ad', adPreparing: 'Preparing the ad request…', feverEnded: 'FEVER ENDED', retryKeyOne: '+1 RETRY KEY', freezeThreeSeconds: '❄️ FROZEN 3 s', extraLife: '+1 LIFE', maxLives: 'MAX LIVES', pointsAbbreviation: 'PTS', skin_blue: 'Blue Defender', skin_emerald: 'Emerald', skin_solar: 'Solar', skin_neon: 'Neon Plasma', skin_crystal: 'Crystal', skin_void: 'Void', skinRankStarter: 'STARTER', skinRankRare: 'RARE', skinRankEpic: 'EPIC', skinRankLegendary: 'LEGENDARY', skinEquipped: 'EQUIPPED', skinEquip: 'EQUIP', skinBuy: 'BUY', skinFree: 'FREE' },
        es: { chooseTheme: 'Elige un tema', chooseSurvivalTheme: 'Elige un tema de supervivencia', chooseDifficulty: 'Elige una dificultad', close: 'Cerrar', resourceStationLabel: 'Recursos y anuncios recompensados', kingAriaLabel: 'El Rey Pereza, un vikingo barbudo, piensa con la mano en la mejilla', mascotLabel: 'Mascota pensativa con símbolos educativos', retryCanvasLabel: 'Traza la figura sin levantar el dedo', adTitle: 'Anuncio recompensado', adPreparing: 'Preparando el anuncio…', feverEnded: 'FURIA TERMINADA', retryKeyOne: '+1 LLAVE RETRY', freezeThreeSeconds: '❄️ CONGELADO 3 s', extraLife: '+1 VIDA', maxLives: 'VIDAS MÁXIMAS', pointsAbbreviation: 'PTS', skin_blue: 'Defensor azul', skin_emerald: 'Esmeralda', skin_solar: 'Solar', skin_neon: 'Plasma neón', skin_crystal: 'Cristal', skin_void: 'Vacío', skinRankStarter: 'INICIAL', skinRankRare: 'RARO', skinRankEpic: 'ÉPICO', skinRankLegendary: 'LEGENDARIO', skinEquipped: 'EQUIPADO', skinEquip: 'EQUIPAR', skinBuy: 'COMPRAR', skinFree: 'GRATIS' },
        de: { chooseTheme: 'Thema auswählen', chooseSurvivalTheme: 'Survival-Thema auswählen', chooseDifficulty: 'Schwierigkeit auswählen', close: 'Schließen', resourceStationLabel: 'Ressourcen und Belohnungsanzeigen', kingAriaLabel: 'König Faulheit, ein bärtiger Wikinger, denkt mit der Hand an der Wange', mascotLabel: 'Nachdenkliches Maskottchen mit Lernsymbolen', retryCanvasLabel: 'Zeichne die Figur, ohne den Finger abzuheben', adTitle: 'Belohnungsanzeige', adPreparing: 'Anzeige wird vorbereitet…', feverEnded: 'FEVER BEENDET', retryKeyOne: '+1 RETRY-SCHLÜSSEL', freezeThreeSeconds: '❄️ EINGEFROREN 3 s', extraLife: '+1 LEBEN', maxLives: 'MAX. LEBEN', pointsAbbreviation: 'Pkt.', skin_blue: 'Blauer Verteidiger', skin_emerald: 'Smaragd', skin_solar: 'Solar', skin_neon: 'Neonplasma', skin_crystal: 'Kristall', skin_void: 'Leere', skinRankStarter: 'STARTER', skinRankRare: 'SELTEN', skinRankEpic: 'EPISCH', skinRankLegendary: 'LEGENDÄR', skinEquipped: 'AUSGERÜSTET', skinEquip: 'AUSRÜSTEN', skinBuy: 'KAUFEN', skinFree: 'KOSTENLOS' },
        zh: { chooseTheme: '选择主题', chooseSurvivalTheme: '选择生存模式主题', chooseDifficulty: '选择难度', close: '关闭', resourceStationLabel: '资源与奖励广告', kingAriaLabel: '懒惰国王，一位留着胡子的维京人，托腮沉思', mascotLabel: '带有教育符号的沉思吉祥物', retryCanvasLabel: '不抬起手指描绘图形', adTitle: '奖励广告', adPreparing: '正在准备广告…', feverEnded: '狂热结束', retryKeyOne: '+1 重试钥匙', freezeThreeSeconds: '❄️ 冻结 3 秒', extraLife: '+1 生命', maxLives: '生命值已满', pointsAbbreviation: '分', skin_blue: '蓝色守卫者', skin_emerald: '翡翠', skin_solar: '太阳', skin_neon: '霓虹等离子', skin_crystal: '水晶', skin_void: '虚空', skinRankStarter: '初始', skinRankRare: '稀有', skinRankEpic: '史诗', skinRankLegendary: '传奇', skinEquipped: '已装备', skinEquip: '装备', skinBuy: '购买', skinFree: '免费' },
        ru: { chooseTheme: 'Выбери тему', chooseSurvivalTheme: 'Выбери тему выживания', chooseDifficulty: 'Выбери сложность', close: 'Закрыть', resourceStationLabel: 'Ресурсы и реклама с наградой', kingAriaLabel: 'Король Лени, бородатый викинг, задумался, подперев щёку рукой', mascotLabel: 'Задумчивый талисман с образовательными символами', retryCanvasLabel: 'Нарисуй фигуру, не отрывая палец', adTitle: 'Реклама с наградой', adPreparing: 'Подготовка рекламы…', feverEnded: 'АЗАРТ ОКОНЧЕН', retryKeyOne: '+1 КЛЮЧ RETRY', freezeThreeSeconds: '❄️ ЗАМОРОЖЕН НА 3 с', extraLife: '+1 ЖИЗНЬ', maxLives: 'МАКСИМУМ ЖИЗНЕЙ', pointsAbbreviation: 'очк.', skin_blue: 'Синий защитник', skin_emerald: 'Изумруд', skin_solar: 'Солнечный', skin_neon: 'Неоновая плазма', skin_crystal: 'Кристалл', skin_void: 'Пустота', skinRankStarter: 'СТАРТ', skinRankRare: 'РЕДКИЙ', skinRankEpic: 'ЭПИЧЕСКИЙ', skinRankLegendary: 'ЛЕГЕНДАРНЫЙ', skinEquipped: 'ЭКИПИРОВАНО', skinEquip: 'ЭКИПИРОВАТЬ', skinBuy: 'КУПИТЬ', skinFree: 'БЕСПЛАТНО' }
    };
    for (const [code, labels] of Object.entries(localizedExtras)) Object.assign(extra[code], labels);
    Object.assign(extra.fr, { shareBody: 'J’ai fait {score} points sur {theme} dans Brain Defense ! Peux-tu battre mon score ?', sharePrompt: 'Copie ce défi pour le partager :' });
    Object.assign(extra.en, { shareBody: 'I scored {score} points in {theme} on Brain Defense! Can you beat me?', sharePrompt: 'Copy this challenge to share it:' });
    Object.assign(extra.es, { shareBody: '¡He conseguido {score} puntos en {theme} en Brain Defense! ¿Puedes superar mi puntuación?', sharePrompt: 'Copia este reto para compartirlo:' });
    Object.assign(extra.de, { shareBody: 'Ich habe {score} Punkte in {theme} bei Brain Defense erzielt! Kannst du meinen Rekord schlagen?', sharePrompt: 'Kopiere diese Herausforderung zum Teilen:' });
    Object.assign(extra.zh, { shareBody: '我在 Brain Defense 的{theme}主题中获得了{score}分！你能超过我吗？', sharePrompt: '复制此挑战并分享：' });
    Object.assign(extra.ru, { shareBody: 'Я набрал {score} очков в теме «{theme}» в Brain Defense! Сможешь побить мой результат?', sharePrompt: 'Скопируй это испытание, чтобы поделиться:' });
    const pageMetadata = {
        fr: ['Brain Defense — jeu éducatif', 'Brain Defense : défends ta base en répondant à des questions de maths, de géographie, de traduction et de culture générale.'],
        en: ['Brain Defense — educational game', 'Brain Defense: defend your base by answering math, geography, translation, and trivia questions.'],
        es: ['Brain Defense — juego educativo', 'Brain Defense: defiende tu base respondiendo preguntas de matemáticas, geografía, traducción y cultura general.'],
        de: ['Brain Defense — Lernspiel', 'Brain Defense: Verteidige deine Basis mit Fragen zu Mathematik, Geografie, Übersetzung und Allgemeinwissen.'],
        zh: ['Brain Defense — 教育游戏', 'Brain Defense：通过回答数学、地理、翻译和常识问题来守卫基地。'],
        ru: ['Brain Defense — обучающая игра', 'Brain Defense: защищай базу, отвечая на вопросы по математике, географии, переводу и общим знаниям.']
    };
    Object.assign(extra.fr, {
        retryOffPath: 'Tu as quitté le tracé. La clé Retry a été utilisée.',
        retryRepeatedEdge: 'Tu as repassé sur une ligne. La clé Retry a été utilisée.',
        retryLifted: 'Tu as levé le doigt avant d’avoir terminé. La clé Retry a été utilisée.',
        retryWrongEndpoint: 'Termine au point d’arrivée indiqué.'
    });
    Object.assign(extra.en, {
        retryOffPath: 'You left the path. The Retry key was used.',
        retryRepeatedEdge: 'You traced a line twice. The Retry key was used.',
        retryLifted: 'You lifted your finger before finishing. The Retry key was used.',
        retryWrongEndpoint: 'Finish at the marked endpoint.'
    });
    Object.assign(extra.es, {
        retryOffPath: 'Te saliste del trazado. Se usó la llave Retry.',
        retryRepeatedEdge: 'Volviste a trazar una línea. Se usó la llave Retry.',
        retryLifted: 'Levantaste el dedo antes de terminar. Se usó la llave Retry.',
        retryWrongEndpoint: 'Termina en el punto de llegada marcado.'
    });
    Object.assign(extra.de, {
        retryOffPath: 'Du hast die Linie verlassen. Der Retry-Schlüssel wurde verbraucht.',
        retryRepeatedEdge: 'Du hast eine Linie doppelt gezeichnet. Der Retry-Schlüssel wurde verbraucht.',
        retryLifted: 'Du hast den Finger vor dem Abschluss abgehoben. Der Retry-Schlüssel wurde verbraucht.',
        retryWrongEndpoint: 'Beende den Zug am markierten Endpunkt.'
    });
    Object.assign(extra.zh, {
        retryOffPath: '你偏离了线路，重试钥匙已使用。',
        retryRepeatedEdge: '你重复描了一条线，重试钥匙已使用。',
        retryLifted: '完成前抬起了手指，重试钥匙已使用。',
        retryWrongEndpoint: '请在标记的终点结束。'
    });
    Object.assign(extra.ru, {
        retryOffPath: 'Ты сошёл с линии. Ключ Retry использован.',
        retryRepeatedEdge: 'Ты повторно провёл линию. Ключ Retry использован.',
        retryLifted: 'Ты убрал палец до завершения. Ключ Retry использован.',
        retryWrongEndpoint: 'Закончи на отмеченной конечной точке.'
    });

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
        const [pageTitle, pageDescription] = pageMetadata[language] || pageMetadata.en;
        document.title = pageTitle;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.content = pageDescription;
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
        const themeGrid = document.getElementById('home-theme-grid');
        if (themeGrid) themeGrid.setAttribute('aria-label', extra[language]?.chooseTheme || 'Choose a theme');
        const answerControls = document.getElementById('controls');
        if (answerControls) answerControls.setAttribute('aria-label', accessibilityCopy[language].answerChoices);
        const mascot = document.querySelector('.mascot-svg');
        if (mascot) mascot.setAttribute('aria-label', extra[language]?.mascotLabel || '');
        const retryCanvas = document.getElementById('retry-trace-canvas');
        if (retryCanvas) retryCanvas.setAttribute('aria-label', extra[language]?.retryCanvasLabel || '');
        const resourceStation = document.querySelector('.home-resource-station');
        if (resourceStation) resourceStation.setAttribute('aria-label', extra[language]?.resourceStationLabel || '');
        const survivalThemeGrid = document.querySelector('.survival-theme-grid');
        if (survivalThemeGrid) survivalThemeGrid.setAttribute('aria-label', extra[language]?.chooseSurvivalTheme || '');
        const difficultyGrid = document.getElementById('survival-difficulties');
        if (difficultyGrid) difficultyGrid.setAttribute('aria-label', extra[language]?.chooseDifficulty || '');
        const closeSetup = document.querySelector('#survival-setup .dialog-close');
        if (closeSetup) closeSetup.setAttribute('aria-label', extra[language]?.close || '');
        document.querySelectorAll('.king-viking').forEach(node => node.setAttribute('aria-label', extra[language]?.kingAriaLabel || ''));
        const pauseButton = document.getElementById('pause-btn');
        if (pauseButton) { pauseButton.title = pack.pause; pauseButton.setAttribute('aria-label', pack.pause); }
        const soundButton = document.getElementById('sound-btn');
        if (soundButton) { soundButton.title = pack.sound; soundButton.setAttribute('aria-label', pack.sound); }
        const hudBest = document.getElementById('hud-best');
        if (hudBest) {
            const value = hudBest.textContent.match(/\d+/g)?.pop() || '0';
            hudBest.textContent = `${pack.record}: ${value}`;
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
            const targetOpt = document.querySelector(`#setting-language-target option[value="${code}"]`);
            if (targetOpt) {
                targetOpt.textContent = name;
                targetOpt.disabled = code === language;
            }
        }
        window.dispatchEvent(new CustomEvent('brain-defense-language-change', { detail: { language } }));
    }
    function setLanguage(value) {
        preference = value === 'auto' || supported.includes(value) ? value : 'auto';
        try { localStorage.setItem(storageKey, preference); }
        catch (error) { console.warn('Brain Defense: impossible d’enregistrer la langue de l’interface.', error); }
        if (typeof Storage !== 'undefined') Storage.setItem(storageKey, preference);
        language = preference === 'auto' ? detect() : preference;
        apply();
    }
    try { preference = localStorage.getItem(storageKey) || 'auto'; }
    catch (error) { console.warn('Brain Defense: impossible de lire la langue de l’interface.', error); }
    language = preference === 'auto' || !supported.includes(preference) ? detect() : preference;
    window.addEventListener('brain-defense-storage-ready', () => {
        try {
            preference = localStorage.getItem(storageKey) || preference;
            language = preference === 'auto' || !supported.includes(preference) ? detect() : preference;
            apply();
        } catch (error) {
            console.warn('Brain Defense: impossible de restaurer la langue de l’interface.', error);
        }
    });
    window.UI18n = {
        supported, labels, get language() { return language; }, get preference() { return preference; },
        setLanguage, apply, t(key) { return extra[language]?.[key] || accessibilityCopy[language]?.[key] || (copy[language] || copy.en)[key] || copy.en[key] || key; },
        tier(index) { return this.t(['tier_basic', 'tier_easy', 'tier_medium', 'tier_hard', 'tier_very_hard', 'tier_master'][index] || 'tier_basic'); }
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
    else apply();
})();
