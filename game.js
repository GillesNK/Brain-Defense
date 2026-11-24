const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let canvasPixelRatio = 1;

function canvasLogicalWidth() { return canvas.clientWidth || canvas.width; }
function canvasLogicalHeight() { return canvas.clientHeight || canvas.height; }

const THEME_LABELS = {
    maths: "Maths",
    geo: "Géographie",
    anglais: "Anglais",
    culture: "Culture G.",
    random: "Aléatoire"
};

let crazyGamesSDKInitialized = false;
const storageWarnings = new Set();

function warnStorageOnce(operation, key, error) {
    if (storageWarnings.has(operation)) return;
    storageWarnings.add(operation);
    console.warn(`Brain Defense: impossible d'effectuer l'opération "${operation}" pour "${key}".`, error);
}

// Chargement des records individuels par thème depuis localStorage
const Storage = {
    getItem(key, fallback = null) {
        let localValue = null;
        try {
            localValue = localStorage.getItem(key);
        } catch (error) { warnStorageOnce('lecture locale', key, error); }
        if (localValue !== null) return localValue;
        if (!crazyGamesSDKInitialized || !window.CrazyGames?.SDK?.data) return fallback;
        try { return window.CrazyGames.SDK.data.getItem(key) ?? fallback; }
        catch (error) {
            warnStorageOnce('lecture CrazyGames', key, error);
            return fallback;
        }
    },

    setItem(key, value) {
        try { localStorage.setItem(key, value); }
        catch (error) { warnStorageOnce('écriture locale', key, error); }
        try {
            if (crazyGamesSDKInitialized && window.CrazyGames?.SDK?.data) {
                window.CrazyGames.SDK.data.setItem(key, value);
            }
        } catch (error) { warnStorageOnce('écriture CrazyGames', key, error); }
    },

    removeItem(key) {
        try { localStorage.removeItem(key); }
        catch (error) { warnStorageOnce('suppression locale', key, error); }
        try {
            if (crazyGamesSDKInitialized && window.CrazyGames?.SDK?.data) {
                window.CrazyGames.SDK.data.removeItem(key);
            }
        } catch (error) { warnStorageOnce('suppression CrazyGames', key, error); }
    },

    synchronize(keys) {
        const data = window.CrazyGames?.SDK?.data;
        if (!data) return;
        for (const key of keys) {
            let localValue = null;
            try {
                localValue = localStorage.getItem(key);
            } catch (error) {
                warnStorageOnce('synchronisation', key, error);
                break;
            }
            try {
                if (localValue !== null) data.setItem(key, localValue);
                else {
                    const sdkValue = data.getItem(key);
                    if (sdkValue !== null && sdkValue !== undefined) localStorage.setItem(key, sdkValue);
                }
            } catch (error) {
                warnStorageOnce('synchronisation', key, error);
                break;
            }
        }
    }
};

function getStoredValue(key, fallback = null) {
    return Storage.getItem(key, fallback);
}

function getStoredObject(key, fallback) {
    try {
        const value = JSON.parse(Storage.getItem(key) || 'null');
        return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
    } catch (_) { return fallback; }
}

function getStoredArray(key, fallback) {
    try {
        const value = JSON.parse(Storage.getItem(key) || 'null');
        return Array.isArray(value) ? value : fallback;
    } catch (_) { return fallback; }
}

let themeRecords = getStoredObject('chrono_theme_records', {
    maths: 0,
    geo: 0,
    anglais: 0,
    culture: 0,
    random: 0
});
let campaignWins = getStoredObject('chrono_campaign_wins', {});
function readSavedRunProgress() {
    try {
        const saved = JSON.parse(Storage.getItem('chrono_saved_run') || 'null');
        if (!saved || !['tours', 'survival'].includes(saved.mode)) return null;
        return saved;
    } catch (error) {
        console.warn('Brain Defense: sauvegarde illisible, elle est ignorée.', error);
        Storage.removeItem('chrono_saved_run');
        return null;
    }
}
let savedRunProgress = readSavedRunProgress();
let sessionCanResume = false;

let selectedTheme = 'random';
const savedTargetLanguage = getStoredValue('chrono_target_language');
let targetLanguage = ['en', 'fr', 'es', 'de', 'zh', 'ru'].includes(savedTargetLanguage) ? savedTargetLanguage : 'en';
let score = 0;
let lives = 3;
let isPaused = true;
let gameMode = 'tours';
const storedSurvivalDifficulty = getStoredValue('chrono_survival_difficulty', 'basique');
let survivalDifficulty = DIFFICULTY_LEVELS.some(level => level.key === storedSurvivalDifficulty)
    ? storedSurvivalDifficulty : 'basique';
let survivalQuestionsAnswered = 0;
let survivalRecords = getStoredObject('chrono_survival_records', {});
let vibrationEnabled = getStoredValue('chrono_vibration') === 'true';
let mobileModeEnabled = getStoredValue('chrono_mobile_mode') !== 'false';
let soundEnabled = getStoredValue('chrono_sound') !== 'false';
let crazyGamesMuted = false;
let adAudioMuted = false;
let crazyGameplayActive = false;
let desiredCrazyGameplayActive = false;
let crazyAdInProgress = false;
let rewardAdInProgress = false;
let adResumeGameplayAfterAd = false;
let reviveAdUsedThisRun = false;
let enemies = [];
let particles = [];
let lasers = []; // Faisceaux laser tirés par le canon
let currentOptions = [];
let currentButtonTarget = null;
const QUESTIONS_PER_TOUR = 20;
let difficultyIndex = 0;
let tourNumber = 1;
let tourQuestionCount = 0;
const DIFFICULTY_COLORS = ['#2563eb', '#238636', '#b77908', '#c2410c', '#b91c1c', '#7e22ce'];
const SURVIVAL_QUESTION_LIMIT = 240;
let spawnTimer = 0;
let lastTime = 0;
let pausedByVisibility = false;
let gameFrameRequest = null;
const INTERRUPTION_STORAGE_KEY = 'chrono_run_interrupted';

// === COMBO & FEVER MODE ===
let combo = 0;           // streak de bonnes réponses consécutives
let comboMultiplier = 1; // x1, x2 ou x3
let feverActive = false; // mode fever activé (8+ combo)
let feverTimer = 0;      // temps restant en fever (secondes)
let FEVER_DURATION = 6;  // durée du fever en secondes
let FEVER_COMBO_THRESHOLD = 8; // combo nécessaire pour activer le fever
let screenShake = 0;     // intensité du shake d'écran
let floatingTexts = [];  // textes flottants (+pts, combo, etc.)
let meteorsSinceSpecial = 0; // compteur pour météores spéciaux (6-8)
let meteorsDestroyed = 0;    // compteur pour étoiles aléatoires
let nextStarMeteorThreshold = 10 + Math.floor(Math.random() * 21); // 10 à 30
let nextRetryMeteorThreshold = 42 + Math.floor(Math.random() * 24);
let hudAnimInterval = null; // animation HUD toutes les 6-8s

// === MONNAIE & GARAGE ===
let stars = parseInt(getStoredValue('chrono_stars')) || 0;
let retryKeys = parseInt(getStoredValue('chrono_retry_keys')) || 0;
let pendingAdReward = null;
let selectedSkin = getStoredValue('chrono_selected_skin', 'blue');
const SKINS = {
    blue: { name: 'Blue Defender', cost: 0, owned: true, color: '#38bdf8', glow: '#58a6ff' },
    emerald: { name: 'Emerald', cost: 150, owned: false, color: '#34d399', glow: '#10b981' },
    solar: { name: 'Solar', cost: 400, owned: false, color: '#fef08a', glow: '#facc15' },
    neon: { name: 'Neon Plasma', cost: 800, owned: false, color: '#f472b6', glow: '#d946ef' },
    crystal: { name: 'Crystal', cost: 250, owned: false, color: '#a5f3fc', glow: '#22d3ee' },
    void: { name: 'Void', cost: 600, owned: false, color: '#c4b5fd', glow: '#a855f7' }
};
let cannonRankCacheSkin = null;
let cannonRankCacheValue = 0;
function getSelectedCannonRank() {
    if (cannonRankCacheSkin !== selectedSkin) {
        cannonRankCacheSkin = selectedSkin;
        cannonRankCacheValue = Object.entries(SKINS).sort((a, b) => a[1].cost - b[1].cost)
            .findIndex(([id]) => id === selectedSkin);
    }
    return Math.max(0, cannonRankCacheValue);
}
if (!SKINS[selectedSkin]) selectedSkin = 'blue';
// Charger les skins possédés depuis localStorage
const ownedSkins = getStoredArray('chrono_owned_skins', ['blue']);
SKINS.blue.owned = true;
ownedSkins.forEach(s => { if (SKINS[s]) SKINS[s].owned = true; });
let canvasCannonImage = null;

function restorePersistedState() {
    stars = parseInt(getStoredValue('chrono_stars')) || 0;
    retryKeys = parseInt(getStoredValue('chrono_retry_keys')) || 0;
    selectedSkin = getStoredValue('chrono_selected_skin', 'blue');
    if (!SKINS[selectedSkin]) selectedSkin = 'blue';
    const restoredSkins = getStoredArray('chrono_owned_skins', ['blue']);
    ownedSkins.splice(0, ownedSkins.length, ...restoredSkins);
    SKINS.blue.owned = true;
    Object.values(SKINS).forEach(skin => { skin.owned = false; });
    SKINS.blue.owned = true;
    ownedSkins.forEach(id => { if (SKINS[id]) SKINS[id].owned = true; });
    themeRecords = getStoredObject('chrono_theme_records', themeRecords);
    campaignWins = getStoredObject('chrono_campaign_wins', campaignWins);
    survivalRecords = getStoredObject('chrono_survival_records', survivalRecords);
    vibrationEnabled = getStoredValue('chrono_vibration') === 'true';
    mobileModeEnabled = getStoredValue('chrono_mobile_mode') !== 'false';
    soundEnabled = getStoredValue('chrono_sound') !== 'false';
    const restoredTarget = getStoredValue('chrono_target_language');
    if (QUESTION_LANGUAGES.includes(restoredTarget)) targetLanguage = restoredTarget;
    const restoredDifficulty = getStoredValue('chrono_survival_difficulty', 'basique');
    if (DIFFICULTY_LEVELS.some(level => level.key === restoredDifficulty)) survivalDifficulty = restoredDifficulty;
    if (!sessionCanResume) savedRunProgress = readSavedRunProgress();
    applyGameAudioMute();
    document.body.classList.toggle('mobile-controls', mobileModeEnabled);
    const soundButton = document.getElementById('sound-btn');
    if (soundButton) soundButton.innerText = soundEnabled ? '🔊' : '🔇';
    const soundSetting = document.getElementById('setting-sound');
    if (soundSetting) soundSetting.checked = soundEnabled;
    const vibrationSetting = document.getElementById('setting-vibration');
    if (vibrationSetting) vibrationSetting.checked = vibrationEnabled;
    const mobileSetting = document.getElementById('setting-mobile');
    if (mobileSetting) mobileSetting.checked = mobileModeEnabled;
    const targetSelect = document.getElementById('setting-language-target');
    if (targetSelect) targetSelect.value = targetLanguage;
    updateCatapultSkin();
    updateResourceDisplays();
    refreshMenuRecords();
    updateResumeRunButton();
    syncQuestionLanguages(getInterfaceLanguage());
    window.dispatchEvent(new Event('brain-defense-storage-ready'));
}

// Charge le canon équipé pour le dessiner dans le canvas.
function updateCatapultSkin() {
    const skin = SKINS[selectedSkin];
    if (!skin) return;

    const skinId = selectedSkin;
    const image = new Image();
    image.onload = () => {
        if (selectedSkin === skinId) canvasCannonImage = image;
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cannonSVG(skin))}`;
}

// SVG d'un canon stylisé pour l'affichage dans le garage — 6 designs d'évolution
function cannonSVG(skin) {
    const c = skin.color;
    const g = skin.glow;
    const id = skin.name.toLowerCase().includes('defender') ? 'blue'
        : skin.name.toLowerCase().includes('emerald') ? 'emerald'
            : skin.name.toLowerCase().includes('solar') ? 'solar'
                : skin.name.toLowerCase().includes('neon') ? 'neon'
                    : skin.name.toLowerCase().includes('crystal') ? 'crystal'
                        : 'void';
    return `
    <svg viewBox="0 0 100 130" class="garage-cannon-svg" style="width:72px; height:94px; display:block; margin:0 auto 6px auto; filter:drop-shadow(0 0 8px ${g});">
        ${id === 'blue'
            ? `<defs><linearGradient id="gBlue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c}" stop-opacity="1"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs>
            <ellipse cx="50" cy="116" rx="22" ry="12" fill="#161b22" stroke="${g}" stroke-width="2"/>
            <rect x="38" y="96" width="24" height="20" rx="4" fill="url(#gBlue)" stroke="${g}" stroke-width="2"/>
            <rect x="44" y="70" width="12" height="26" rx="3" fill="${c}" stroke="${g}" stroke-width="2"/>
            <rect x="42" y="66" width="16" height="6" rx="2" fill="${g}"/>
            <circle cx="50" cy="62" r="3" fill="${g}"/>` : ``}
        ${id === 'emerald'
            ? `<defs><linearGradient id="gEm" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${c}" stop-opacity="1"/><stop offset="100%" stop-color="#065f46"/></linearGradient></defs>
            <ellipse cx="50" cy="118" rx="28" ry="14" fill="#161b22" stroke="${g}" stroke-width="2"/>
            <rect x="30" y="98" width="40" height="22" rx="6" fill="url(#gEm)" stroke="${g}" stroke-width="2"/>
            <rect x="38" y="60" width="24" height="38" rx="5" fill="${c}" stroke="${g}" stroke-width="2"/>
            <rect x="36" y="56" width="28" height="8" rx="2" fill="${g}"/>
            <circle cx="50" cy="54" r="6" fill="#ffffff" opacity="0.9"/>
            <circle cx="50" cy="54" r="3.5" fill="${c}"/>
            <line x1="44" y1="70" x2="44" y2="86" stroke="${g}" stroke-width="2" stroke-linecap="round"/>
            <line x1="50" y1="70" x2="50" y2="90" stroke="${g}" stroke-width="2" stroke-linecap="round"/>
            <line x1="56" y1="70" x2="56" y2="86" stroke="${g}" stroke-width="2" stroke-linecap="round"/>` : ``}
        ${id === 'solar'
            ? `<defs><radialGradient id="gSo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="${c}" stop-opacity="0.85"/></radialGradient></defs>
            <ellipse cx="50" cy="120" rx="28" ry="15" fill="#161b22" stroke="${g}" stroke-width="2"/>
            <rect x="30" y="100" width="40" height="24" rx="8" fill="url(#gSo)" stroke="${g}" stroke-width="2"/>
            <rect x="40" y="58" width="20" height="42" rx="6" fill="${c}" stroke="${g}" stroke-width="3"/>
            <rect x="37" y="54" width="26" height="8" rx="3" fill="${g}"/>
            <circle cx="50" cy="52" r="5" fill="#ffffff" opacity="0.95"/>
            <path d="M42,48 L50,38 L58,48" fill="none" stroke="${g}" stroke-width="3" stroke-linecap="round"/>
            <path d="M44,46 L50,36 L56,46" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>` : ``}
        ${id === 'neon'
            ? `<defs><linearGradient id="gNe" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${c}" stop-opacity="1"/><stop offset="50%" stop-color="#bc13fe"/><stop offset="100%" stop-color="${c}" stop-opacity="1"/></linearGradient></defs>
            <ellipse cx="50" cy="122" rx="30" ry="16" fill="#0f172a" stroke="${g}" stroke-width="3"/>
            <rect x="26" y="102" width="48" height="26" rx="10" fill="url(#gNe)" stroke="${g}" stroke-width="3"/>
            <rect x="35" y="50" width="30" height="52" rx="10" fill="${c}" stroke="${g}" stroke-width="3"/>
            <rect x="38" y="46" width="24" height="8" rx="3" fill="#ffffff" opacity="0.9"/>
            <circle cx="50" cy="44" r="6" fill="#ffffff"/>
            <circle cx="42" cy="40" r="2" fill="${g}"/>
            <circle cx="58" cy="40" r="2" fill="${g}"/>
            <circle cx="46" cy="36" r="2" fill="${g}"/>
            <circle cx="54" cy="36" r="2" fill="${g}"/>` : ``}
        ${id === 'crystal'
            ? `<defs><linearGradient id="gCr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="50%" stop-color="${c}" stop-opacity="0.8"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/></linearGradient></defs>
            <ellipse cx="50" cy="124" rx="24" ry="13" fill="#161b22" stroke="${g}" stroke-width="2"/>
            <rect x="36" y="104" width="28" height="22" rx="6" fill="url(#gCr)" stroke="${g}" stroke-width="2"/>
            <polygon points="50,20 44,50 40,50 40,76 50,86 60,76 60,50 56,50" fill="url(#gCr)" stroke="${g}" stroke-width="3"/>
            <rect x="45" y="50" width="10" height="26" rx="3" fill="${c}" opacity="0.6"/>
            <circle cx="50" cy="20" r="4" fill="#ffffff"/>
            <line x1="50" y1="86" x2="50" y2="92" stroke="${g}" stroke-width="2"/>` : ``}
        ${id === 'void'
            ? `<defs><radialGradient id="gVo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${c}" stop-opacity="1"/><stop offset="60%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.9"/></radialGradient><filter id="glowVo"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter></defs>
            <ellipse cx="50" cy="126" rx="32" ry="18" fill="#0b0d17" stroke="${g}" stroke-width="3"/>
            <rect x="22" y="104" width="56" height="28" rx="12" fill="url(#gVo)" stroke="${g}" stroke-width="3"/>
            <rect x="30" y="44" width="40" height="60" rx="14" fill="#1e1b4b" stroke="${g}" stroke-width="3"/>
            <rect x="38" y="36" width="24" height="12" rx="5" fill="${c}" filter="url(#glowVo)"/>
            <circle cx="50" cy="34" r="7" fill="${c}" filter="url(#glowVo)"/>
            <circle cx="42" y="28" r="3" fill="#ffffff" opacity="0.8"/>
            <circle cx="58" y="28" r="3" fill="#ffffff" opacity="0.8"/>
            <circle cx="50" y="22" r="2.5" fill="#ffffff" opacity="0.9"/>
            <path d="M34,72 Q50,60 66,72" fill="none" stroke="${g}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>` : ``}
    </svg>
    `;
}

// État du canon/vaisseau de défense en bas de l'écran
const turret = {
    x: 0,
    y: 0,
    angle: -Math.PI / 2, // Pointe vers le haut par défaut
    recoil: 0,           // Animation de recul lors du tir
    muzzleFlash: 0,      // Éclair lumineux au bout du canon
    damageFlash: 0       // Clignotement rouge si touché
};

function resizeCanvas() {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    canvasPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * canvasPixelRatio);
    canvas.height = Math.round(height * canvasPixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(canvasPixelRatio, 0, 0, canvasPixelRatio, 0, 0);
    turret.x = width / 2;
    turret.y = getDefenseLineY() - 2;
    if (typeof BackgroundEngine !== 'undefined') {
        BackgroundEngine.init(width, height);
    }
    if (enemies.length) updateButtons();
}

function getDefenseLineY() {
    const controls = document.getElementById('controls');
    if (controls && !controls.classList.contains('hidden')) {
        const canvasRect = canvas.getBoundingClientRect();
        const controlsRect = controls.getBoundingClientRect();
        const bottomOffset = canvasRect.bottom - controlsRect.bottom;
        return Math.max(90, canvasLogicalHeight() - bottomOffset - controlsRect.height - 9);
    }
    return canvasLogicalHeight() - 24;
}

function updateDifficultyBadge() {
    const badge = document.getElementById('level-badge');
    const level = DIFFICULTY_LEVELS[difficultyIndex];
    const levelName = window.UI18n?.tier(difficultyIndex) || level.label;
    badge.textContent = gameMode === 'survival'
        ? `SURVIVAL · ${levelName.toUpperCase()} · ${survivalQuestionsAnswered}/${SURVIVAL_QUESTION_LIMIT}`
        : `${levelName.toUpperCase()} · ${window.UI18n?.t('round') || 'TOUR'} ${tourNumber}/2 · ${tourQuestionCount}/${QUESTIONS_PER_TOUR}`;
    badge.style.background = DIFFICULTY_COLORS[difficultyIndex];
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function refreshMenuRecords() {
    Object.keys(THEME_LABELS).forEach(key => {
        const el = document.getElementById(`rec-${key}`);
        if (el) el.innerHTML = `<span data-i18n="record-prefix">${window.UI18n?.t('record') || 'Record'}</span> : ${themeRecords[key] || 0}`;
        const win = document.getElementById(`won-${key}`);
        if (win) win.classList.toggle('hidden', !campaignWins[key]);
    });
    updateResumeRunButton();
    updateSurvivalHomeRecord();
    updateResourceDisplays();
}
refreshMenuRecords();
window.addEventListener('brain-defense-language-change', () => {
    syncQuestionLanguages(window.UI18n && window.UI18n.language);
    refreshMenuRecords();
    updateDifficultyBadge();
});

function updateResumeRunButton() {
    const button = document.getElementById('resume-run-btn');
    if (!button) return;
    const available = Boolean(savedRunProgress && savedRunProgress.sessionCanResume !== false);
    button.classList.toggle('hidden', !available);
    if (available) button.innerHTML = `${window.UI18n?.t('resume') || '▶ Reprendre la partie'}<small>${localizedThemeLabel(savedRunProgress.theme) || 'Partie sauvegardée'} · ${savedRunProgress.score || 0} ${window.UI18n?.t('points') || 'points'}</small>`;
}

function localizedThemeLabel(theme) {
    const key = { maths: 'maths', geo: 'geo', anglais: 'translation', culture: 'culture', random: 'random' }[theme];
    return key && window.UI18n ? window.UI18n.t(key) : THEME_LABELS[theme];
}

function saveGameProgress() {
    if (!sessionCanResume || !['tours', 'survival'].includes(gameMode)) return;
    savedRunProgress = {
        mode: gameMode, theme: selectedTheme, score, lives,
        difficultyIndex, tourNumber, tourQuestionCount, survivalQuestionsAnswered,
        combo, comboMultiplier, feverActive, feverTimer,
        meteorsSinceSpecial, meteorsDestroyed, nextStarMeteorThreshold, nextRetryMeteorThreshold,
        retryFigureHistory: RetryTrace.getRunHistory(),
        reviveAdUsedThisRun,
        savedAt: Date.now()
    };
    try {
        Storage.setItem('chrono_saved_run', JSON.stringify(savedRunProgress));
    } catch (error) {
        console.error('Brain Defense: impossible de sauvegarder la partie.', error);
    }
    updateResumeRunButton();
}

function clearSavedGameProgress() {
    Storage.removeItem('chrono_saved_run');
    sessionCanResume = false;
    savedRunProgress = null;
    updateResumeRunButton();
}

function handleRuntimeFailure(error) {
    if (!sessionCanResume && !savedRunProgress) return;
    console.error('Brain Defense runtime failure:', error);
    if (sessionCanResume && !savedRunProgress) saveGameProgress();
    // A runtime error pauses at the last saved checkpoint; it must not look like
    // a separate "game interrupted" failure screen or discard the run.
    isPaused = true;
    setCrazyGameplayActive(false);
    stopGameFrame();
    stopHUDAnimation();
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
    document.getElementById('pause-menu').classList.remove('hidden');
    try {
        ctx.setTransform(canvasPixelRatio, 0, 0, canvasPixelRatio, 0, 0);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    } catch (_) { }
}

function scheduleGameFrame() {
    if (isPaused || gameFrameRequest !== null) return;
    gameFrameRequest = requestAnimationFrame(timestamp => {
        gameFrameRequest = null;
        try { gameLoop(timestamp); }
        catch (error) { handleRuntimeFailure(error); }
    });
}

function stopGameFrame() {
    if (gameFrameRequest === null) return;
    cancelAnimationFrame(gameFrameRequest);
    gameFrameRequest = null;
}

function resumeSavedGame() {
    const saved = savedRunProgress || readSavedRunProgress();
    if (!saved || saved.sessionCanResume === false) return;
    try {
        RetryTrace.stop();
        try { Storage.removeItem(INTERRUPTION_STORAGE_KEY); } catch (_) { }
        sessionCanResume = true;
        setCrazyGameplayActive(true);
        gameMode = saved.mode === 'survival' ? 'survival' : 'tours';
        selectedTheme = THEME_LABELS[saved.theme] ? saved.theme : 'random';
        score = Math.max(0, Number(saved.score) || 0);
        lives = Math.max(1, Math.min(3, Number(saved.lives) || 1));
        difficultyIndex = Math.max(0, Math.min(DIFFICULTY_LEVELS.length - 1, Number(saved.difficultyIndex) || 0));
        tourNumber = saved.tourNumber === 2 ? 2 : 1;
        tourQuestionCount = Math.max(0, Math.min(QUESTIONS_PER_TOUR - 1, Number(saved.tourQuestionCount) || 0));
        survivalQuestionsAnswered = Math.max(0, Math.min(SURVIVAL_QUESTION_LIMIT - 1, Number(saved.survivalQuestionsAnswered) || 0));
        combo = Math.max(0, Number(saved.combo) || 0);
        comboMultiplier = Math.max(1, Number(saved.comboMultiplier) || 1);
        feverActive = Boolean(saved.feverActive);
        feverTimer = Math.max(0, Number(saved.feverTimer) || 0);
        meteorsSinceSpecial = Math.max(0, Number(saved.meteorsSinceSpecial) || 0);
        meteorsDestroyed = Math.max(0, Number(saved.meteorsDestroyed) || 0);
        nextStarMeteorThreshold = Math.max(meteorsDestroyed + 1, Number(saved.nextStarMeteorThreshold) || 10);
        nextRetryMeteorThreshold = Math.max(meteorsDestroyed + 1, Number(saved.nextRetryMeteorThreshold) || 42);
        RetryTrace.resetRun(saved.retryFigureHistory);
        reviveAdUsedThisRun = Boolean(saved.reviveAdUsedThisRun);
        if (gameMode === 'survival') survivalDifficulty = DIFFICULTY_LEVELS[difficultyIndex].key;
        enemies = []; particles = []; lasers = []; floatingTexts = []; currentOptions = []; currentButtonTarget = null;
        QuestionManager.resetHistory();
        document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
        document.getElementById('controls').classList.remove('hidden');
        selectTheme(selectedTheme);
        updateDifficultyBadge(); updateHUD(); updateCatapultSkin(); startHUDAnimation();
        isPaused = false; spawnTimer = 0; spawnEnemy();
        lastTime = performance.now();
        saveGameProgress();
        scheduleGameFrame();
    } catch (error) {
        handleRuntimeFailure(error);
    }
}

window.addEventListener('error', event => {
    // Uncaught errors from unrelated page scripts (for example, an audio or
    // browser extension callback) must not stop an otherwise healthy run.
    // gameLoop already catches errors in the rendering/update path; this
    // handler is only for errors reported directly from this game script.
    if (!sessionCanResume || isPaused || !/(?:^|\/)game\.js(?:$|[?#])/i.test(event.filename || '')) return;
    handleRuntimeFailure(event.error || event.message);
});

function pauseForBackground() {
    if (!sessionCanResume || isPaused) return;
    saveGameProgress();
    try { Storage.setItem(INTERRUPTION_STORAGE_KEY, 'true'); } catch (_) { }
    isPaused = true;
    stopGameFrame();
    pausedByVisibility = true;
    stopHUDAnimation();
}

function resumeAfterBackground() {
    if (!pausedByVisibility || document.visibilityState === 'hidden') return;
    pausedByVisibility = false;
    lastTime = performance.now();
    // A real app switch or call gets its own resume screen, separate from lives/game over.
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
    document.getElementById('interruption-screen').classList.remove('hidden');
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') pauseForBackground();
    else resumeAfterBackground();
});
window.addEventListener('pagehide', pauseForBackground);
window.addEventListener('pageshow', resumeAfterBackground);

function resumeInterruptedGame() {
    try { Storage.removeItem(INTERRUPTION_STORAGE_KEY); } catch (_) { }
    if (sessionCanResume) resumeGame();
    else resumeSavedGame();
}

try {
    const interruptedOnPreviousVisit = Storage.getItem(INTERRUPTION_STORAGE_KEY) === 'true';
    if (interruptedOnPreviousVisit && savedRunProgress) {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('interruption-screen').classList.remove('hidden');
    } else if (interruptedOnPreviousVisit) {
        Storage.removeItem(INTERRUPTION_STORAGE_KEY);
    }
} catch (_) { }

function toggleMute() {
    soundEnabled = !soundEnabled;
    applyGameAudioMute();
    Storage.setItem('chrono_sound', String(soundEnabled));
    document.getElementById('sound-btn').innerText = soundEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
    const setting = document.getElementById('setting-sound');
    if (setting) setting.checked = soundEnabled;
}

function setSoundEnabled(enabled) {
    soundEnabled = Boolean(enabled);
    applyGameAudioMute();
    Storage.setItem('chrono_sound', String(soundEnabled));
    document.getElementById('sound-btn').innerText = soundEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
}

function setVibrationEnabled(enabled) {
    vibrationEnabled = Boolean(enabled);
    Storage.setItem('chrono_vibration', String(vibrationEnabled));
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate(20);
}

function setMobileMode(enabled) {
    mobileModeEnabled = Boolean(enabled);
    document.body.classList.toggle('mobile-controls', mobileModeEnabled);
    Storage.setItem('chrono_mobile_mode', String(mobileModeEnabled));
}

const QUESTION_LANGUAGES = ['en', 'fr', 'es', 'de', 'zh', 'ru'];

function getInterfaceLanguage() {
    const language = window.UI18n && window.UI18n.language;
    return QUESTION_LANGUAGES.includes(language) ? language : 'fr';
}

function chooseDifferentTargetLanguage(source) {
    return QUESTION_LANGUAGES.find(language => language !== source);
}

function syncQuestionLanguages(source) {
    if (!QUESTION_LANGUAGES.includes(source)) source = getInterfaceLanguage();
    if (targetLanguage === source) {
        targetLanguage = chooseDifferentTargetLanguage(source);
        Storage.setItem('chrono_target_language', targetLanguage);
        const targetSelect = document.getElementById('setting-language-target');
        if (targetSelect) targetSelect.value = targetLanguage;
    }
    setLangPair(source, targetLanguage);
    QuestionManager.resetHistory();
}

function setTargetLanguage(target) {
    if (!QUESTION_LANGUAGES.includes(target)) return;
    const source = getInterfaceLanguage();
    if (target === source) {
        const targetSelect = document.getElementById('setting-language-target');
        if (targetSelect) targetSelect.value = targetLanguage;
        return;
    }
    targetLanguage = target;
    Storage.setItem('chrono_target_language', targetLanguage);
    document.getElementById('setting-language-target').value = targetLanguage;
    setLangPair(source, targetLanguage);
    QuestionManager.resetHistory();
}

function openSettings() {
    document.getElementById('setting-sound').checked = soundEnabled;
    document.getElementById('setting-vibration').checked = vibrationEnabled;
    document.getElementById('setting-mobile').checked = mobileModeEnabled;
    document.getElementById('setting-language-target').value = targetLanguage;
    document.getElementById('settings-screen').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settings-screen').classList.add('hidden');
}

function survivalRecordKey(theme = selectedTheme, difficulty = survivalDifficulty) {
    return `${theme}:${difficulty}`;
}

function updateSurvivalHomeRecord() {
    const record = survivalRecords[survivalRecordKey()] || 0;
    const value = document.getElementById('home-survival-record');
    const label = document.getElementById('home-survival-record-label');
    if (value) value.innerText = record;
    if (label) label.innerText = `${window.UI18n?.t('record') || 'RECORD'} · ${localizedThemeLabel(selectedTheme).toUpperCase()} · ${window.UI18n?.tier(DIFFICULTY_LEVELS.findIndex(level => level.key === survivalDifficulty))?.toUpperCase() || 'BASIQUE'}`;
}

function applyGameAudioMute() {
    AudioEngine.setMuted(adAudioMuted || crazyGamesMuted || !soundEnabled);
}

function setGameMuted(isMuted) {
    adAudioMuted = Boolean(isMuted);
    applyGameAudioMute();
}
window.setGameMuted = setGameMuted;

function handleCrazyGamesSettings(settings) {
    crazyGamesMuted = Boolean(settings?.muteAudio);
    applyGameAudioMute();
}

function syncCrazyGamesGameplayState() {
    if (!crazyGamesSDKReady) return;
    crazyGamesSDKReady.then(ready => {
        if (!ready || desiredCrazyGameplayActive === crazyGameplayActive) return;
        const game = window.CrazyGames?.SDK?.game;
        if (!game) return;
        try {
            if (desiredCrazyGameplayActive) game.gameplayStart();
            else game.gameplayStop();
            crazyGameplayActive = desiredCrazyGameplayActive;
        } catch (error) {
            console.warn('CrazyGames gameplay event failed:', error);
        }
    });
}

function setCrazyGameplayActive(active) {
    desiredCrazyGameplayActive = Boolean(active);
    syncCrazyGamesGameplayState();
}

async function initializeCrazyGamesSDK() {
    const sdk = window.CrazyGames?.SDK;
    if (!sdk) return false;
    try {
        await sdk.init();
        crazyGamesSDKInitialized = true;
        try {
            Storage.synchronize([
                'chrono_ui_language', 'chrono_theme_records', 'chrono_campaign_wins',
                'chrono_saved_run', 'chrono_target_language', 'chrono_survival_difficulty',
                'chrono_survival_records', 'chrono_vibration', 'chrono_mobile_mode',
                'chrono_sound', 'chrono_stars', 'chrono_retry_keys', 'chrono_selected_skin',
                'chrono_owned_skins', INTERRUPTION_STORAGE_KEY
            ]);
            restorePersistedState();
        } catch (error) {
            console.warn('Brain Defense: impossible de restaurer les données du joueur après l’initialisation SDK.', error);
        }
        handleCrazyGamesSettings(sdk.game?.settings);
        sdk.game?.addSettingsChangeListener?.(handleCrazyGamesSettings);
        console.info('CrazyGames SDK v3 initialized.');
        syncCrazyGamesGameplayState();
        return true;
    } catch (error) {
        console.warn('CrazyGames SDK v3 initialization failed:', error);
        return false;
    }
}

const crazyGamesSDKReady = initializeCrazyGamesSDK();

function closeSurvivalSetup() {
    document.getElementById('survival-setup').classList.add('hidden');
}

function updateResourceDisplays() {
    const homeStars = document.getElementById('home-stars');
    const homeKeys = document.getElementById('home-retry-keys');
    if (homeStars) homeStars.innerText = stars;
    if (homeKeys) homeKeys.innerText = retryKeys;
    const hudKeys = document.getElementById('hud-retry-keys');
    if (hudKeys) hudKeys.innerText = retryKeys;
    const garageStars = document.getElementById('garage-stars');
    if (garageStars) garageStars.innerText = stars;
    const garageStarsButton = document.getElementById('garage-stars-btn');
    if (garageStarsButton) garageStarsButton.innerText = stars;
    const retryButton = document.getElementById('retry-key-btn');
    const retryEmpty = document.getElementById('retry-empty-message');
    const reviveButton = document.getElementById('revive-video-btn');
    if (reviveButton) reviveButton.classList.toggle('hidden', reviveAdUsedThisRun);
    if (retryButton) {
        retryButton.disabled = retryKeys < 1;
        retryButton.innerText = retryKeys > 0
            ? `🔑 Continuer · ${retryKeys} clé${retryKeys > 1 ? 's' : ''} Retry`
            : '🔑 Aucune clé Retry';
    }
    if (retryEmpty) retryEmpty.classList.toggle('hidden', retryKeys > 0);
}

function openSurvivalSetup() {
    const setup = document.getElementById('survival-setup');
    setup.classList.remove('hidden');
    document.querySelectorAll('.difficulty-choice').forEach(button => {
        button.classList.toggle('selected', button.dataset.difficulty === survivalDifficulty);
    });
    document.querySelectorAll('.survival-theme-choice').forEach(button => {
        button.classList.toggle('selected', button.classList.contains(`theme-${selectedTheme}`));
    });
    updateSurvivalHomeRecord();
}

function selectSurvivalDifficulty(key, button) {
    if (!DIFFICULTY_LEVELS.some(level => level.key === key)) return;
    survivalDifficulty = key;
    Storage.setItem('chrono_survival_difficulty', key);
    document.querySelectorAll('.difficulty-choice').forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    updateSurvivalHomeRecord();
}

applyGameAudioMute();
document.getElementById('sound-btn').innerText = soundEnabled ? '🔊' : '🔇';
document.getElementById('setting-vibration').checked = vibrationEnabled;
document.getElementById('setting-mobile').checked = mobileModeEnabled;
document.body.classList.toggle('mobile-controls', mobileModeEnabled);
document.getElementById('setting-language-target').value = targetLanguage;
syncQuestionLanguages(getInterfaceLanguage());

function setLangPair(source, target) {
    if (!QuestionManager.setLangPair(source, target)) {
        throw new Error(`Paire de langues invalide : ${source} → ${target}`);
    }
}

function pauseGame() {
    saveGameProgress();
    isPaused = true;
    setCrazyGameplayActive(false);
    stopGameFrame();
    document.getElementById('pause-menu').classList.remove('hidden');
}

function resumeGame() {
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('interruption-screen').classList.add('hidden');
    try { Storage.removeItem(INTERRUPTION_STORAGE_KEY); } catch (_) { }
    isPaused = false;
    setCrazyGameplayActive(true);
    startHUDAnimation();
    lastTime = performance.now();
    scheduleGameFrame();
}

function quitGame() {
    showMenu();
}

function selectTheme(theme, btnElement) {
    selectedTheme = theme;
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
    });
    document.querySelectorAll(`.theme-${theme}`).forEach(button => {
        if (button.classList.contains('theme-btn')) {
            button.classList.add('selected');
            button.setAttribute('aria-pressed', 'true');
        }
    });
    updateSurvivalHomeRecord();
}

function showMenu() {
    saveGameProgress();
    try { Storage.removeItem(INTERRUPTION_STORAGE_KEY); } catch (_) { }
    isPaused = true;
    setCrazyGameplayActive(false);
    stopGameFrame();
    RetryTrace.stop();
    stopHUDAnimation();
    refreshMenuRecords();
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('controls').classList.add('hidden');
}

function wrapCanvasText(text, maxWidth) {
    const lines = [];
    let currentLine = '';
    const words = String(text).trim().split(/\s+/).filter(Boolean);
    for (const word of words) {
        const pieces = [];
        let piece = '';
        for (const character of Array.from(word)) {
            if (piece && ctx.measureText(piece + character).width > maxWidth) {
                pieces.push(piece);
                piece = character;
            } else piece += character;
        }
        if (piece) pieces.push(piece);
        for (let partIndex = 0; partIndex < pieces.length; partIndex++) {
            const part = pieces[partIndex];
            const candidate = currentLine ? `${currentLine} ${part}` : part;
            if (ctx.measureText(candidate).width <= maxWidth) currentLine = candidate;
            else {
                if (currentLine) lines.push(currentLine);
                currentLine = part;
            }
            if (partIndex < pieces.length - 1) {
                lines.push(currentLine);
                currentLine = '';
            }
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

function drawWrappedText(text, x, y, maxWidth, lineHeight, lines = wrapCanvasText(text, maxWidth)) {
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => ctx.fillText(line, x, startY + index * lineHeight));
    return lines.length;
}

function getMeteorSpawnX(radius) {
    const hud = document.getElementById('hud');
    const canvasRect = canvas.getBoundingClientRect();
    const hudRect = hud.getBoundingClientRect();
    const sideRailRight = Math.max(0, hudRect.right - canvasRect.left);
    const minX = Math.max(radius * 1.1, sideRailRight + radius + 10);
    const maxX = Math.max(radius * 1.1, canvasLogicalWidth() - radius * 1.1);
    const safeMin = Math.min(minX, maxX);
    return safeMin + Math.random() * Math.max(0, maxX - safeMin);
}

function spawnEnemy() {
    const randomSpecial = shouldSpawnSpecial();
    const retryDrop = !randomSpecial && meteorsDestroyed >= nextRetryMeteorThreshold;
    const isSpecial = randomSpecial || retryDrop;
    const specialType = retryDrop ? 'retry' : (randomSpecial ? pickSpecialType() : null);

    const currentLevel = DIFFICULTY_LEVELS[difficultyIndex];
    const data = QuestionManager.getNextQuestion(selectedTheme, currentLevel.key);
    updateDifficultyBadge();

    const isText = data.question.length > 9;
    const maxTextRadius = Math.min(180, canvasLogicalWidth() * 0.42);
    const isMobile = canvasLogicalWidth() <= 520;
    const radius = isText
        ? (isMobile
            ? Math.min(maxTextRadius, 28 + Math.sqrt(Math.max(0, data.question.length - 20)) * 4.0)
            : Math.min(maxTextRadius, 32 + Math.sqrt(Math.max(0, data.question.length - 20)) * 4.5))
        : (isMobile ? 23 : 26);
    const x = getMeteorSpawnX(radius);
    const survivalBaseSpeed = ((isText ? 35 : 44) + difficultyIndex * 8) * 1.12;
    const survivalRamp = Math.min(survivalQuestionsAnswered * 0.055, 13);
    const isSurvivalMathQuestion = data.theme === 'maths';
    const mathSpeedFactor = difficultyIndex >= 3 ? 0.86 : 0.94;
    const baseSpeed = gameMode === 'survival'
        ? survivalBaseSpeed * (isSurvivalMathQuestion ? mathSpeedFactor : 1)
        + survivalRamp * (isSurvivalMathQuestion ? 0.75 : 1)
        : (isText ? 35 : 44) + difficultyIndex * 8 + Math.min(tourQuestionCount * 0.35, 7);

    // Couleur spéciale selon le type
    let meteorColor = ['#58a6ff', '#34d399', '#facc15', '#fb923c', '#f43f5e', '#c084fc'][difficultyIndex];
    let specialLabel = '';
    if (isSpecial) {
        if (specialType === 'ice') { meteorColor = '#8be9ff'; specialLabel = '❄️'; }
        else if (specialType === 'life') { meteorColor = '#ff7eb6'; specialLabel = '💖'; }
        else if (specialType === 'gold') { meteorColor = '#fef08a'; specialLabel = '⭐'; }
        else if (specialType === 'retry') { meteorColor = '#67e8f9'; specialLabel = '🔑'; }
    }

    // Étoiles aléatoires : après 10-30 météores détruits, selon la difficulté (1 à 3 max)
    // Seulement pour les météores non-spéciaux (les spéciaux ont déjà leur propre récompense)
    let starReward = 0;
    if (!isSpecial && meteorsDestroyed >= nextStarMeteorThreshold) {
        nextStarMeteorThreshold = meteorsDestroyed + 10 + Math.floor(Math.random() * 21);
        const prob = Math.min(0.3 + difficultyIndex * 0.08, 0.7);
        const maxStars = difficultyIndex >= 2 ? 3 : 2;
        if (Math.random() < prob) {
            starReward = maxStars === 2 ? (1 + Math.floor(Math.random() * 2)) : (1 + Math.floor(Math.random() * 3));
            meteorColor = '#facc15';
            specialLabel = '⭐';
        }
    }
    if (retryDrop) nextRetryMeteorThreshold = meteorsDestroyed + 42 + Math.floor(Math.random() * 24);

    enemies.push({
        x: x,
        y: -radius,
        radius: radius,
        speed: baseSpeed,
        question: specialLabel ? specialLabel + ' ' + data.question : data.question,
        answer: data.answer,
        options: data.options,
        isText: isText,
        color: meteorColor,
        isSpecial: isSpecial,
        specialType: specialType,
        isStarMeteor: starReward > 0,
        isRetryMeteor: retryDrop,
        starReward: starReward
    });

    updateButtons();
}

function getPriorityTarget() {
    if (enemies.length === 0) return null;
    return enemies.reduce((prev, curr) => (curr.y > prev.y ? curr : prev));
}

function updateButtons() {
    const target = getPriorityTarget();
    if (!target) {
        currentOptions = [];
        currentButtonTarget = null;
        return;
    }
    currentOptions = target.options;
    currentButtonTarget = target;
    for (let i = 0; i < 3; i++) {
        const button = document.getElementById(`btn${i}`);
        const answer = String(currentOptions[i] ?? '');
        let label = button.querySelector('.answer-label');
        if (!label) {
            button.replaceChildren();
            label = document.createElement('span');
            label.className = 'answer-label';
            button.appendChild(label);
        }
        label.textContent = answer;
        button.title = answer;
        button.setAttribute('aria-label', answer);
        // 1. Taille de départ plus grande et lisible
        const baseSize = canvasLogicalWidth() <= 360 ? 15 : 18;

        // 2. Réduction douce uniquement si le texte est vraiment long (> 16 caractères)
        let fontSize = Math.max(12, baseSize - Math.max(0, answer.length - 16) * 0.15);
        label.style.fontSize = `${fontSize}px`;

        // 3. Ajustement de sécurité avec un minimum lisible (11px au lieu de 6px)
        const minReadableSize = 10;
        const availableHeight = Math.max(0, button.clientHeight - 8); // Marge réduite (8px au lieu de 12px)

        if (availableHeight > 0) { // Évite d'écraser le texte si le bouton n'est pas encore affiché
            while (label.scrollHeight > availableHeight && fontSize > minReadableSize) {
                fontSize = Math.max(minReadableSize, fontSize - 0.5);
                label.style.fontSize = `${fontSize}px`;
            }
        }
    }
}
    function checkAnswer(btnIndex) {
        if (isPaused || enemies.length === 0) return;

        const target = getPriorityTarget();
        if (!target) return;
        if (target !== currentButtonTarget) {
            updateButtons();
            return;
        }
        const chosenValue = target.options[btnIndex];
        if (chosenValue === undefined) return;

        if (chosenValue === target.answer) {
            // --- Combo & Fever ---
            combo++;
            if (combo >= FEVER_COMBO_THRESHOLD) {
                comboMultiplier = 3;
                feverActive = true;
                feverTimer = FEVER_DURATION;
                AudioEngine.playFever();
                addFloatingText(target.x, target.y, '🔥 FEVER!', '#fef08a');
            } else if (combo >= 6) {
                comboMultiplier = 3;
                AudioEngine.playCombo(combo);
            } else if (combo >= 4) {
                comboMultiplier = 2;
                AudioEngine.playCombo(combo);
            } else {
                comboMultiplier = 1;
                AudioEngine.playCombo(combo);
            }

            // Points avec multiplicateur
            const basePts = 5;
            const ptsEarned = basePts * comboMultiplier;
            score += ptsEarned;
            Storage.setItem('chrono_stars', stars);

            if (feverActive) {
                // Double laser en fever
                AudioEngine.playDoubleLaser();
                addFloatingText(target.x, target.y, `x${comboMultiplier} FEVER +${ptsEarned}`, '#fef08a');
                triggerScreenShake(8);
                // Second laser rapide vers la même cible
                const aimAngle2 = Math.atan2(target.y - turret.y, target.x - turret.x);
                const barrelLength = 36;
                const startX = turret.x + Math.cos(aimAngle2) * barrelLength;
                const startY = turret.y + Math.sin(aimAngle2) * barrelLength;
                lasers.push({
                    x1: startX, y1: startY, x2: target.x, y2: target.y,
                    color: SKINS[selectedSkin].glow, life: 0.18, maxLife: 0.18, tier: getSelectedCannonRank()
                });
            } else {
                AudioEngine.playCannonShot(getSelectedCannonRank());
                addFloatingText(target.x, target.y, `+${ptsEarned}`, target.color);
            }

            // Effet météore spécial
            if (target.isSpecial) {
                applySpecialEffect(target.specialType);
            }

            // Orienter immédiatement le canon vers la cible et déclencher le tir
            const aimAngle = Math.atan2(target.y - turret.y, target.x - turret.x);
            turret.angle = aimAngle;
            turret.recoil = 10;
            turret.muzzleFlash = 0.14;

            // Calculer le bout du canon pour faire partir le laser
            const barrelLength = 36;
            const startX = turret.x + Math.cos(aimAngle) * barrelLength;
            const startY = turret.y + Math.sin(aimAngle) * barrelLength;

            lasers.push({
                x1: startX,
                y1: startY,
                x2: target.x,
                y2: target.y,
                color: SKINS[selectedSkin].color,
                glow: SKINS[selectedSkin].glow,
                life: feverActive ? 0.3 : 0.22,
                maxLife: feverActive ? 0.3 : 0.22,
                tier: getSelectedCannonRank()
            });

            const cannonRank = getSelectedCannonRank();
            const isStarRewardMeteor = target.isStarMeteor || target.specialType === 'gold';
            const explosionKind = target.isRetryMeteor ? 'retry' : (isStarRewardMeteor ? 'star' : 'normal');
            createExplosion(target.x, target.y, feverActive ? '#fef08a' : target.color, explosionKind, cannonRank);
            if (target.isRetryMeteor) AudioEngine.playRetryExplosion(cannonRank);
            else if (isStarRewardMeteor) AudioEngine.playStarExplosion(cannonRank);
            else AudioEngine.playMeteorExplosion(cannonRank);
            enemies = enemies.filter(e => e !== target);

            // Compteur météores détruits et étoiles aléatoires
            meteorsDestroyed++;
            if (target.starReward > 0) {
                stars += target.starReward;
                Storage.setItem('chrono_stars', stars);
                addFloatingText(target.x, target.y, `⭐ +${target.starReward}`, '#fef08a');
            }
            if (target.isRetryMeteor) {
                retryKeys += 1;
                Storage.setItem('chrono_retry_keys', retryKeys);
                addFloatingText(target.x, target.y, `🔑 ${window.UI18n?.t('retryKeyOne') || '+1 CLÉ RETRY'}`, '#67e8f9');
            }

            if (gameMode === 'survival') {
                const key = survivalRecordKey();
                if (score > (survivalRecords[key] || 0)) {
                    survivalRecords[key] = score;
                    Storage.setItem('chrono_survival_records', JSON.stringify(survivalRecords));
                }
            } else if (score > (themeRecords[selectedTheme] || 0)) {
                themeRecords[selectedTheme] = score;
                Storage.setItem('chrono_theme_records', JSON.stringify(themeRecords));
            }

            updateHUD();

            if (gameMode === 'survival') {
                survivalQuestionsAnswered++;
                updateSurvivalHomeRecord();
                updateDifficultyBadge();
                if (survivalQuestionsAnswered >= SURVIVAL_QUESTION_LIMIT) {
                    triggerSurvivalComplete();
                    return;
                }
            } else {
                tourQuestionCount++;
                updateDifficultyBadge();
                if (tourQuestionCount >= QUESTIONS_PER_TOUR) {
                    triggerTourPause();
                    return;
                }
            }

            if (enemies.length === 0) spawnEnemy();
            else updateButtons();
            saveGameProgress();
        } else {
            AudioEngine.playWrong();
            target.y += canvasLogicalHeight() / 2;
            if (vibrationEnabled) navigator.vibrate?.(80);
            // Réinitialiser le combo sur mauvaise réponse
            combo = 0;
            comboMultiplier = 1;
            feverActive = false;
            feverTimer = 0;
            updateHUD();
            saveGameProgress();
        }
    }

    function createExplosion(x, y, color, kind = 'normal', tier = 0) {
        const specialBurst = kind === 'star' || kind === 'retry';
        // Fewer independent glow particles on narrow/mobile canvases keeps Survival smooth.
        const density = canvasLogicalWidth() <= 520 ? 0.45 : 0.85;
        const count = Math.ceil((16 + tier * 5 + (specialBurst ? 12 : 0)) * density);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 80 + Math.random() * (150 + tier * 18);
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.48 + Math.random() * 0.24 + tier * 0.025,
                maxLife: 0.48 + tier * 0.025,
                size: 3 + tier * 0.65 + (specialBurst ? 1 : 0),
                shape: kind === 'star' ? 'star' : (kind === 'retry' ? 'diamond' : (tier >= 3 ? 'spark' : 'square')),
                color
            });
        }
        if (specialBurst || tier >= 2) {
            particles.push({
                x, y, vx: 0, vy: 0, life: 0.34 + tier * 0.04, maxLife: 0.34 + tier * 0.04,
                radius: 8, ring: true, color: kind === 'retry' ? '#67e8f9' : (kind === 'star' ? '#fde047' : color)
            });
        }
    }

    // Texte flottant qui monte et s'estompe
    function addFloatingText(x, y, text, color) {
        floatingTexts.push({ x, y, text, color, life: 1.0, vy: -60 });
    }

    // Déclencher un shake d'écran
    function triggerScreenShake(intensity) {
        screenShake = Math.max(screenShake, intensity);
    }

    // Déterminer si le prochain météore doit être spécial (tous les 6-8)
    function shouldSpawnSpecial() {
        meteorsSinceSpecial++;
        const threshold = 6 + Math.floor(Math.random() * 3); // 6, 7 ou 8
        if (meteorsSinceSpecial >= threshold) {
            meteorsSinceSpecial = 0;
            return true;
        }
        return false;
    }

    // Choisir un type de météore spécial au hasard
    function pickSpecialType() {
        const roll = Math.random();
        if (roll < 0.35) return 'ice';      // ❄️ gel 3s
        if (roll < 0.65) return 'life';     // 💖 +1 vie
        return 'gold';                      // ⭐ +30 pts
    }

    // Appliquer l'effet d'un météore spécial détruit
    function applySpecialEffect(type) {
        if (type === 'ice') {
            // Gel : ralentir tous les ennemis pendant 3s
            AudioEngine.playFreeze();
            addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, window.UI18n?.t('freezeThreeSeconds') || '❄️ GEL 3s', '#8be9ff');
            enemies.forEach(e => { e.speed *= 0.35; e.frozen = true; setTimeout(() => { e.speed = e.speed / 0.35; e.frozen = false; }, 3000); });
            stars += 1; Storage.setItem('chrono_stars', stars); addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, '⭐ +1', '#8be9ff');
        } else if (type === 'life') {
            if (lives < 3) {
                lives = Math.min(3, lives + 1);
                AudioEngine.playLifeGain();
                addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, `💖 ${window.UI18n?.t('extraLife') || '+1 VIE'} · ${lives}/3`, '#ff7eb6');
                updateHUD();
            } else {
                addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, `💖 ${window.UI18n?.t('maxLives') || 'VIE MAX'}`, '#ff7eb6');
            }
            stars += 2; Storage.setItem('chrono_stars', stars); addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, '⭐ +2', '#ff7eb6');
        } else if (type === 'gold') {
            const bonus = 30 * comboMultiplier;
            score += bonus;
            const goldStars = 3;
            stars += goldStars;
            Storage.setItem('chrono_stars', stars);
            AudioEngine.playLaserHit();
            addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, `⭐ +${goldStars}  +${bonus} ${window.UI18n?.t('pointsAbbreviation') || 'PTS'}`, '#fef08a');
            updateHUD();
        }
    }

    // Dessin et animation du canon/vaisseau en bas de l'écran
    function updateAndDrawTurret(ctx, dt, target) {
        const skin = SKINS[selectedSkin] || SKINS.blue;
        const cannonRank = getSelectedCannonRank();
        const defenseY = getDefenseLineY();
        turret.x = canvasLogicalWidth() / 2;
        turret.y = defenseY - 2;

        const desiredAngle = target
            ? Math.atan2(target.y - turret.y, target.x - turret.x)
            : -Math.PI / 2;
        const angleDelta = Math.atan2(Math.sin(desiredAngle - turret.angle), Math.cos(desiredAngle - turret.angle));
        turret.angle += angleDelta * Math.min(1, dt * 12);

        if (turret.recoil > 0) turret.recoil = Math.max(0, turret.recoil - dt * 45);
        if (turret.muzzleFlash > 0) turret.muzzleFlash = Math.max(0, turret.muzzleFlash - dt);
        if (turret.damageFlash > 0) turret.damageFlash = Math.max(0, turret.damageFlash - dt);

        // Rayon discret reliant le canon au météore ciblé.
        if (target) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 6]);
            ctx.beginPath();
            ctx.moveTo(turret.x, turret.y - 8);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            ctx.restore();
        }

        // La ligne de défense est juste au-dessus des réponses.
        ctx.save();
        ctx.strokeStyle = turret.damageFlash > 0 ? '#f85149' : (skin.glow || 'rgba(88, 166, 255, 0.75)');
        ctx.shadowColor = skin.glow || '#58a6ff';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, defenseY);
        ctx.lineTo(canvasLogicalWidth(), defenseY);
        ctx.stroke();
        ctx.restore();

        // Le canon du garage pointe vers le haut dans son SVG : on le tourne vers la cible.
        if (canvasCannonImage && canvasCannonImage.complete) {
            const cannonWidth = Math.min(72, canvasLogicalWidth() * 0.18);
            const cannonHeight = cannonWidth * 1.3;
            ctx.save();
            ctx.translate(turret.x, turret.y);
            ctx.rotate(turret.angle + Math.PI / 2);
            ctx.shadowColor = skin.glow || '#58a6ff';
            ctx.shadowBlur = 14 + cannonRank * 4;
            ctx.drawImage(canvasCannonImage, -cannonWidth / 2, -cannonHeight * 0.97, cannonWidth, cannonHeight);
            ctx.restore();
        } else {
            // Canon de secours pendant le chargement initial du SVG.
            ctx.save();
            ctx.translate(turret.x, turret.y - 8);
            ctx.rotate(turret.angle + Math.PI / 2);
            ctx.fillStyle = skin.color;
            ctx.strokeStyle = skin.glow;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(-9, -38, 18, 38, 6);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        // Dessin du canon Emerald avec sa forme hexagonale distincte
        if (skin.name.toLowerCase().includes('emerald')) {
            ctx.save();
            ctx.translate(turret.x, turret.y - 6);
            ctx.rotate(turret.angle + Math.PI / 2);

            const c = skin.color;
            const g = skin.glow;

            ctx.shadowColor = g;
            ctx.shadowBlur = 12 + cannonRank * 4;

            // Base hexagonale
            ctx.fillStyle = c;
            ctx.strokeStyle = g;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, -38);
            ctx.lineTo(18, -24);
            ctx.lineTo(18, -6);
            ctx.lineTo(0, 8);
            ctx.lineTo(-18, -6);
            ctx.lineTo(-18, -24);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Détails : lignes vertes lumineuses
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, -32);
            ctx.lineTo(0, -10);
            ctx.moveTo(-10, -24);
            ctx.lineTo(10, -24);
            ctx.stroke();

            // Bout lumineux
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, -18, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        if (cannonRank >= 1) {
            ctx.save();
            ctx.translate(turret.x, turret.y - 6);
            ctx.strokeStyle = skin.glow;
            ctx.globalAlpha = 0.22 + Math.sin(loaderAnimationTime * 3) * 0.08;
            ctx.lineWidth = 1.2 + cannonRank * 0.25;
            ctx.shadowColor = skin.glow;
            ctx.shadowBlur = 8 + cannonRank * 3;
            ctx.beginPath(); ctx.ellipse(0, 2, 20 + cannonRank * 2, 7 + cannonRank, 0, 0, Math.PI * 2); ctx.stroke();
            if (cannonRank >= 3) {
                for (let spark = 0; spark < cannonRank - 1; spark++) {
                    const angle = loaderAnimationTime * (1.5 + spark * 0.22) + spark * Math.PI * 2 / (cannonRank - 1);
                    ctx.fillStyle = skin.glow;
                    ctx.beginPath(); ctx.arc(Math.cos(angle) * (21 + cannonRank), Math.sin(angle) * 8, 1.5 + cannonRank * 0.2, 0, Math.PI * 2); ctx.fill();
                }
            }
            ctx.restore();
        }

        drawCannonLoader(ctx, turret.x + Math.min(42, canvasLogicalWidth() * 0.11), turret.y - 7, skin, dt);

        if (turret.muzzleFlash > 0) {
            ctx.save();
            ctx.translate(
                turret.x + Math.cos(turret.angle) * (36 + cannonRank * 2),
                turret.y + Math.sin(turret.angle) * (36 + cannonRank * 2)
            );
            ctx.fillStyle = '#fef08a';
            ctx.shadowColor = '#fef08a';
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.arc(0, 0, (10 + cannonRank * 1.8) * (turret.muzzleFlash / 0.14), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    let loaderAnimationTime = 0;
    function drawCannonLoader(ctx, x, y, skin, dt) {
        loaderAnimationTime += dt;
        const reach = (Math.sin(loaderAnimationTime * 3.4) + 1) / 2;
        const bob = Math.sin(loaderAnimationTime * 6) * 1.3;
        ctx.save();
        ctx.translate(x, y + bob);
        ctx.lineCap = 'round';
        // Tiny mechanic's shadow and boots.
        ctx.fillStyle = 'rgba(5, 12, 28, 0.55)';
        ctx.beginPath(); ctx.ellipse(0, 9, 13, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#17213d';
        ctx.fillRect(-7, 3, 5, 6); ctx.fillRect(2, 3, 5, 6);
        // Bright overalls, head, and helmet match the equipped cannon.
        ctx.fillStyle = skin.color || '#38bdf8';
        ctx.strokeStyle = skin.glow || '#bae6fd';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(-9, -12, 18, 17, 5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f2b983';
        ctx.beginPath(); ctx.arc(0, -17, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(0, -19, 7, Math.PI, Math.PI * 2); ctx.lineTo(7, -17); ctx.lineTo(-7, -17); ctx.closePath(); ctx.fill();
        // Loading arm and a glowing energy round.
        ctx.strokeStyle = '#f2b983'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(6, -8); ctx.lineTo(12 + reach * 6, -12 - reach * 4); ctx.stroke();
        ctx.fillStyle = '#fff2a6'; ctx.shadowColor = skin.glow || '#58a6ff'; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(13 + reach * 6, -13 - reach * 4, 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    // Dessin des rayons laser tirés
    function updateAndDrawLasers(ctx, dt) {
        for (let i = lasers.length - 1; i >= 0; i--) {
            const l = lasers[i];
            l.life -= dt;
            if (l.life <= 0) {
                lasers.splice(i, 1);
                continue;
            }

            const alpha = l.life / l.maxLife;
            ctx.save();
            // Halo externe : couleur de glow du skin sélectionné
            ctx.strokeStyle = l.glow || '#58a6ff';
            ctx.globalAlpha = alpha * 0.6;
            ctx.lineWidth = (8 + (l.tier || 0) * 1.8) * alpha;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(l.x1, l.y1);
            ctx.lineTo(l.x2, l.y2);
            ctx.stroke();

            // Cœur du laser : couleur du skin
            ctx.strokeStyle = l.color || '#38bdf8';
            ctx.globalAlpha = alpha * 0.9;
            ctx.lineWidth = (3 + (l.tier || 0) * 0.7) * alpha;
            ctx.beginPath();
            ctx.moveTo(l.x1, l.y1);
            ctx.lineTo(l.x2, l.y2);
            ctx.stroke();
            if ((l.tier || 0) >= 3) {
                ctx.globalAlpha = alpha * 0.36;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.2 + (l.tier || 0) * 0.25;
                ctx.beginPath(); ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2); ctx.stroke();
            }
            ctx.restore();
        }
    }
    function updateHUD() {
        document.getElementById('score').innerText = score;
        const bestScore = gameMode === 'survival'
            ? (survivalRecords[survivalRecordKey()] || 0)
            : (themeRecords[selectedTheme] || 0);
        document.getElementById('hud-best').innerText = `${window.UI18n?.t('record') || 'Record'}: ${bestScore}`;
        document.getElementById('lives').innerText = '❤️'.repeat(Math.min(3, Math.max(0, lives)));
        // Combo / Fever HUD
        const comboEl = document.getElementById('streak-tag');
        if (comboEl) {
            if (combo > 1) {
                comboEl.innerText = `x${combo}`;
                comboEl.classList.toggle('fever', feverActive);
                if (!feverActive) comboEl.style.color = '#58a6ff';
            } else {
                comboEl.innerText = '0';
                comboEl.classList.remove('fever');
                comboEl.style.color = '#8b949e';
            }
        }
        // Afficher les étoiles dans le HUD si l'élément existe
        const starsEl = document.getElementById('hud-stars');
        if (starsEl) starsEl.innerText = stars;
        updateResourceDisplays();
    }

    // Animation HUD : secoue un panneau aléatoire toutes les 6-8 secondes
    function startHUDAnimation() {
        if (hudAnimInterval) clearInterval(hudAnimInterval);
        const panels = ['hud-score', 'hud-stars', 'hud-lives', 'hud-combo'];
        hudAnimInterval = setInterval(() => {
            const p = panels[Math.floor(Math.random() * panels.length)];
            const el = document.getElementById(p);
            if (el) {
                el.classList.add('animate');
                setTimeout(() => el.classList.remove('animate'), 500);
            }
        }, 6000 + Math.random() * 2000);
    }

    function stopHUDAnimation() {
        if (hudAnimInterval) {
            clearInterval(hudAnimInterval);
            hudAnimInterval = null;
        }
        document.querySelectorAll('.hud-card').forEach(el => el.classList.remove('animate'));
    }

    function startGame(mode = 'tours') {
        stopGameFrame();
        RetryTrace.stop();
        RetryTrace.resetRun();
        reviveAdUsedThisRun = false;
        clearSavedGameProgress();
        updateCatapultSkin();
        gameMode = mode === 'survival' ? 'survival' : 'tours';
        sessionCanResume = true;
        score = 0;
        lives = 3;
        enemies = [];
        particles = [];
        lasers = [];
        floatingTexts = [];
        difficultyIndex = gameMode === 'survival'
            ? Math.max(0, DIFFICULTY_LEVELS.findIndex(level => level.key === survivalDifficulty))
            : 0;
        tourNumber = 1;
        tourQuestionCount = 0;
        survivalQuestionsAnswered = 0;
        combo = 0;
        comboMultiplier = 1;
        feverActive = false;
        feverTimer = 0;
        screenShake = 0;
        meteorsSinceSpecial = 0;
        meteorsDestroyed = 0;
        nextStarMeteorThreshold = 10 + Math.floor(Math.random() * 21);
        nextRetryMeteorThreshold = 42 + Math.floor(Math.random() * 24);
        isPaused = false;
        setCrazyGameplayActive(true);
        turret.angle = -Math.PI / 2;
        turret.recoil = 0;
        turret.damageFlash = 0;
        QuestionManager.resetHistory();
        document.getElementById('settings-screen').classList.add('hidden');
        document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
        document.getElementById('controls').classList.remove('hidden');
        updateDifficultyBadge();
        updateHUD();
        startHUDAnimation();
        spawnEnemy();
        saveGameProgress();
        lastTime = performance.now();
        scheduleGameFrame();
    }

    // === GARAGE & MONNAIE ===
    function openGarage() {
        isPaused = true;
        setCrazyGameplayActive(false);
        stopGameFrame();
        document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
        const gs = document.getElementById('garage-screen');
        gs.classList.remove('hidden');
        renderGarage();
    }

    function closeGarage() {
        document.getElementById('garage-screen').classList.add('hidden');
        showMenu();
    }

    function renderGarage() {
        const container = document.getElementById('garage-skins');
        container.innerHTML = '';
        document.getElementById('garage-stars').innerText = stars;
        Object.entries(SKINS).sort((a, b) => a[1].cost - b[1].cost).forEach(([id, skin]) => {
            const card = document.createElement('div');
            card.className = 'garage-skin';
            if (selectedSkin === id) card.classList.add('equipped');
            if (!skin.owned) card.classList.add('locked');
            const isOwned = skin.owned || ownedSkins.includes(id);
            const canBuy = isOwned || stars >= skin.cost;
            const rankKey = skin.cost === 0 ? 'skinRankStarter' : skin.cost < 250 ? 'skinRankRare' : skin.cost < 600 ? 'skinRankEpic' : 'skinRankLegendary';
            const buttonLabel = selectedSkin === id ? 'skinEquipped' : isOwned ? 'skinEquip' : 'skinBuy';
            card.innerHTML = `
            ${cannonSVG(skin)}
            <span class="garage-skin-rank">${window.UI18n?.t(rankKey) || rankKey}</span>
            <div class="garage-skin-name">${window.UI18n?.t(`skin_${id}`) || skin.name}</div>
            <div class="garage-skin-cost">${skin.cost > 0 ? skin.cost + ' ⭐' : (window.UI18n?.t('skinFree') || 'FREE')}</div>
            <button class="garage-skin-btn" onclick="handleGarageSkin('${id}')" ${!canBuy ? 'disabled' : ''}>
                ${window.UI18n?.t(buttonLabel) || buttonLabel}
            </button>
        `;
            container.appendChild(card);
        });
    }

    function handleGarageSkin(id) {
        const skin = SKINS[id];
        if (!skin) return;
        if (selectedSkin === id) return;
        if (skin.owned || ownedSkins.includes(id)) {
            selectedSkin = id;
            Storage.setItem('chrono_selected_skin', selectedSkin);
            AudioEngine.playLaserHit();
        } else if (stars >= skin.cost) {
            stars -= skin.cost;
            skin.owned = true;
            ownedSkins.push(id);
            Storage.setItem('chrono_stars', stars);
            Storage.setItem('chrono_owned_skins', JSON.stringify(ownedSkins));
            selectedSkin = id;
            Storage.setItem('chrono_selected_skin', selectedSkin);
            AudioEngine.playGaragePurchase();
        }
        renderGarage();
        updateHUD();
        updateCatapultSkin(); // La catapulte du jeu reprend l'apparence du canon sélectionné
    }
    function triggerTourPause() {
        isPaused = true;
        setCrazyGameplayActive(false);
        stopGameFrame();
        enemies = [];
        lasers = [];
        AudioEngine.playVictory();
        document.getElementById('pause-score').innerText = score;

        const completedLevel = DIFFICULTY_LEVELS[difficultyIndex];
        const completedTour = tourNumber;
        const completedLevelIndex = difficultyIndex;
        document.getElementById('king-message-pause').innerText = KingDialogue.pick('success');
        const missionComplete = difficultyIndex === DIFFICULTY_LEVELS.length - 1 && tourNumber === 2;
        if (tourNumber === 1) {
            tourNumber = 2;
        } else if (difficultyIndex < DIFFICULTY_LEVELS.length - 1) {
            difficultyIndex++;
            tourNumber = 1;
        }
        tourQuestionCount = 0;

        const nextLevel = DIFFICULTY_LEVELS[difficultyIndex];
        const title = document.getElementById('pause-title');
        const progress = document.getElementById('pause-tour-progress');
        const continueButton = document.getElementById('continue-tour-btn');
        const completionActions = document.getElementById('campaign-complete-actions');
        if (missionComplete) {
            title.innerText = window.UI18n?.t('missionComplete') || 'Mission accomplie !';
            progress.innerText = window.UI18n?.t('campaignComplete') || 'Tu as terminé les 6 parcours et leurs 12 tours. Bravo, défenseur du cerveau !';
            continueButton.classList.add('hidden');
            completionActions.classList.remove('hidden');
            campaignWins[selectedTheme] = true;
            Storage.setItem('chrono_campaign_wins', JSON.stringify(campaignWins));
            clearSavedGameProgress();
        } else {
            title.innerText = window.UI18n?.t('roundComplete') || 'Tour terminé !';
            progress.innerText =
                `${window.UI18n?.tier(completedLevelIndex)} — ${window.UI18n?.t('round') || 'tour'} ${completedTour}/2 ${window.UI18n?.t('completed') || 'terminé'}. ${window.UI18n?.t('next') || 'Prochaine étape'} : ${window.UI18n?.tier(difficultyIndex)}, ${window.UI18n?.t('round') || 'tour'} ${tourNumber}/2.`;
            continueButton.innerText = `${window.UI18n?.t('continue') || 'Continuer'} · ${window.UI18n?.tier(difficultyIndex) || nextLevel.label}`;
            continueButton.onclick = resumeFromPause;
            continueButton.classList.remove('hidden');
            completionActions.classList.add('hidden');
            saveGameProgress();
        }
        updateDifficultyBadge();
        document.getElementById('pause-screen').classList.remove('hidden');
        // A midgame ad belongs at a level boundary, never on a navigation action.
        if (!missionComplete && completedTour === 2) showMidgameAd();
    }
    function resumeFromPause() {
        document.getElementById('pause-screen').classList.add('hidden');
        isPaused = false;
        setCrazyGameplayActive(true);
        if (enemies.length === 0) spawnEnemy();
        lastTime = performance.now();
        scheduleGameFrame();
    }

    function chooseAnotherTheme() {
        showMenu();
        const themeGrid = document.getElementById('home-theme-grid');
        themeGrid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        themeGrid?.querySelector('.theme-btn.selected')?.focus({ preventScroll: true });
    }
    function triggerGameOver() {
        isPaused = true;
        setCrazyGameplayActive(false);
        stopGameFrame();
        AudioEngine.playGameOver();
        document.getElementById('king-message-gameover').innerText = KingDialogue.pick('failure');
        document.getElementById('gameover-screen').classList.remove('is-victory');
        document.getElementById('retry-status').classList.add('hidden');
        document.getElementById('end-theme').innerText = localizedThemeLabel(selectedTheme);
        document.getElementById('final-score').innerText = score;
        document.getElementById('end-mode').innerText = gameMode === 'survival'
            ? (window.UI18n?.t('survivalMode') || 'MODE SURVIVAL')
            : (window.UI18n?.t('campaignMode') || 'MODE PARCOURS');
        document.getElementById('end-difficulty').innerText = window.UI18n?.tier(difficultyIndex) || DIFFICULTY_LEVELS[difficultyIndex].label;
        document.getElementById('end-progress').innerText = gameMode === 'survival'
            ? `${survivalQuestionsAnswered} / ${SURVIVAL_QUESTION_LIMIT}`
            : `${tourQuestionCount} / ${QUESTIONS_PER_TOUR} · tour ${tourNumber}/2`;
        document.getElementById('best-score').innerText = gameMode === 'survival'
            ? (survivalRecords[survivalRecordKey()] || 0)
            : (themeRecords[selectedTheme] || 0);
        document.getElementById('gameover-title').innerText = gameMode === 'survival' ? (window.UI18n?.t('gameoverSurvival') || 'Base détruite · Survival') : (window.UI18n?.t('gameover') || 'Base détruite');
        updateResourceDisplays();
        document.getElementById('gameover-screen').classList.remove('hidden');
        document.getElementById('controls').classList.add('hidden');
        stopHUDAnimation();
        clearSavedGameProgress();
    }

    function triggerSurvivalComplete() {
        isPaused = true;
        setCrazyGameplayActive(false);
        stopGameFrame();
        AudioEngine.playVictory();
        document.getElementById('king-message-gameover').innerText = KingDialogue.pick('success');
        document.getElementById('gameover-screen').classList.add('is-victory');
        document.getElementById('gameover-title').innerText = window.UI18n?.t('survivalComplete') || 'Survival terminé !';
        document.getElementById('end-theme').innerText = localizedThemeLabel(selectedTheme);
        document.getElementById('end-mode').innerText = window.UI18n?.t('missionMode') || 'MISSION ACCOMPLIE';
        document.getElementById('end-difficulty').innerText = window.UI18n?.tier(difficultyIndex) || DIFFICULTY_LEVELS[difficultyIndex].label;
        document.getElementById('end-progress').innerText = `${SURVIVAL_QUESTION_LIMIT} / ${SURVIVAL_QUESTION_LIMIT}`;
        document.getElementById('final-score').innerText = score;
        document.getElementById('best-score').innerText = survivalRecords[survivalRecordKey()] || 0;
        updateResourceDisplays();
        document.getElementById('gameover-screen').classList.remove('hidden');
        document.getElementById('controls').classList.add('hidden');
        stopHUDAnimation();
        clearSavedGameProgress();
    }

    // Partage viral : défier un ami
    function shareGame() {
        const text = (window.UI18n?.t('shareBody') || 'J’ai fait {score} points sur {theme} dans Brain Defense ! Peux-tu battre mon score ?')
            .replace('{score}', String(score))
            .replace('{theme}', localizedThemeLabel(selectedTheme));
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: 'Brain Defense', text, url }).catch(() => {
                // Fallback silencieux si l'utilisateur annule
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                const btn = document.querySelector('button[onclick="shareGame()"]');
                if (btn) {
                    const old = btn.innerText;
                    btn.innerText = window.UI18n?.t('copied') || '✅ Copié !';
                    setTimeout(() => { btn.innerText = old; }, 1500);
                }
            }).catch(() => {
                window.prompt(`${window.UI18n?.t('sharePrompt') || 'Copie ce défi pour le partager :'}\n${text}\n${url}`);
            });
        } else {
            window.prompt(`${window.UI18n?.t('sharePrompt') || 'Copie ce défi pour le partager :'}\n${text}\n${url}`);
        }
    }
    function pauseGameplayForCrazyAd() {
        adResumeGameplayAfterAd = !isPaused && sessionCanResume;
        if (adResumeGameplayAfterAd) {
            isPaused = true;
            stopGameFrame();
            stopHUDAnimation();
        }
        setCrazyGameplayActive(false);
        setGameMuted(true);
        document.getElementById('ad-screen').classList.add('hidden');
    }

    function finishCrazyAdLifecycle() {
        setGameMuted(false);
        if (adResumeGameplayAfterAd && sessionCanResume) {
            isPaused = false;
            startHUDAnimation();
            lastTime = performance.now();
            setCrazyGameplayActive(true);
            scheduleGameFrame();
        }
        adResumeGameplayAfterAd = false;
    }

    function showAdUnavailableMessage(screenId) {
        const screen = document.getElementById(screenId) || document.getElementById('start-screen');
        if (!screen) return;
        const neonMessage = document.createElement('div');
        neonMessage.className = 'neon-message';
        neonMessage.innerText = window.UI18n?.t('noAdAvailable') || '📺 Aucune publicité disponible pour le moment. Réessaie dans quelques instants.';
        screen.appendChild(neonMessage);
        setTimeout(() => neonMessage.remove(), 3000);
    }

    function showRewardedAd(onRewardSuccess, onAdError) {
        if (!window.CrazyGames?.SDK) {
            console.warn('CrazyGames SDK not detected (local mode).');
                const error = new Error('Rewarded ads are unavailable without the CrazyGames SDK.');
                if (onAdError) onAdError(error);
                else showAdUnavailableMessage('start-screen');
            return;
        }
        if (crazyAdInProgress) return;
        crazyAdInProgress = true;
        rewardAdInProgress = true;
        let settled = false;
        const fail = error => {
            if (settled) return;
            settled = true;
            crazyAdInProgress = false;
            rewardAdInProgress = false;
            finishCrazyAdLifecycle();
            console.warn('Rewarded ad error:', error);
            if (onAdError) onAdError(error);
            else showAdUnavailableMessage('start-screen');
        };
        const callbacks = {
            adStarted: () => pauseGameplayForCrazyAd(),
            adFinished: () => {
                if (settled) return;
                settled = true;
                crazyAdInProgress = false;
                rewardAdInProgress = false;
                finishCrazyAdLifecycle();
                onRewardSuccess?.();
            },
            adError: error => fail(error)
        };
        Promise.resolve(crazyGamesSDKReady).then(initialized => {
            if (!initialized) {
                fail(new Error('CrazyGames SDK initialization failed.'));
                return;
            }
            try {
                window.CrazyGames.SDK.ad.requestAd('rewarded', callbacks);
            } catch (error) {
                fail(error);
            }
        }).catch(fail);
    }
    window.showRewardedAd = showRewardedAd;

    function showMidgameAd(onComplete) {
        if (!window.CrazyGames?.SDK) {
            if (onComplete) onComplete();
            return;
        }
        if (crazyAdInProgress) {
            if (onComplete) onComplete();
            return;
        }
        crazyAdInProgress = true;
        document.getElementById('ad-title').innerText = window.UI18n?.t('publicAd') || 'Midgame ad';
        document.getElementById('ad-message').innerText = window.UI18n?.t('adPreparing') || 'Preparing ad request...';
        document.getElementById('ad-screen').classList.remove('hidden');
        let settled = false;
        const finish = error => {
            if (settled) return;
            settled = true;
            crazyAdInProgress = false;
            finishCrazyAdLifecycle();
            document.getElementById('ad-screen').classList.add('hidden');
            if (error) console.warn('Midgame ad error:', error);
            if (onComplete) onComplete();
        };
        const callbacks = {
            adStarted: () => pauseGameplayForCrazyAd(),
            adFinished: () => finish(),
            adError: error => finish(error)
        };
        Promise.resolve(crazyGamesSDKReady).then(initialized => {
            if (!initialized) {
                finish(new Error('CrazyGames SDK initialization failed.'));
                return;
            }
            try {
                window.CrazyGames.SDK.ad.requestAd('midgame', callbacks);
            } catch (error) {
                finish(error);
            }
        }).catch(finish);
    }
    window.showMidgameAd = showMidgameAd;

    function reviveAfterRewardVideo() {
        document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
        document.getElementById('controls').classList.remove('hidden');
        RetryTrace.stop();
        enemies = [];
        lasers = [];
        spawnTimer = 0;
        lives = 2;
        sessionCanResume = true;
        isPaused = false;
        updateDifficultyBadge();
        updateHUD();
        startHUDAnimation();
        spawnEnemy();
        lastTime = performance.now();
        saveGameProgress();
        setCrazyGameplayActive(true);
        scheduleGameFrame();
    }

    function watchAdForReward(rewardType) {
        if (!['stars', 'retry', 'revive'].includes(rewardType) || crazyAdInProgress) return;
        if (rewardType === 'revive' && reviveAdUsedThisRun) return;
        pendingAdReward = rewardType;
        document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
        document.getElementById('ad-title').innerText = window.UI18n?.t('publicAd') || 'Rewarded ad';
        document.getElementById('ad-message').innerText = window.UI18n?.t('adPreparing') || 'Preparing ad request...';
        document.getElementById('ad-screen').classList.remove('hidden');
        const returnScreen = rewardType === 'revive' ? 'gameover-screen' : 'start-screen';

        showRewardedAd(() => {
            const completedReward = pendingAdReward;
            pendingAdReward = null;
            document.getElementById('ad-screen').classList.add('hidden');
            if (completedReward === 'revive') {
                reviveAdUsedThisRun = true;
                updateResourceDisplays();
                reviveAfterRewardVideo();
                return;
            }
            if (completedReward === 'stars') {
                stars += 3;
                Storage.setItem('chrono_stars', stars);
            } else if (completedReward === 'retry') {
                retryKeys += 1;
                Storage.setItem('chrono_retry_keys', retryKeys);
            }
            document.getElementById('start-screen').classList.remove('hidden');
            updateHUD();
            refreshMenuRecords();
        }, () => {
            pendingAdReward = null;
            document.getElementById('ad-screen').classList.add('hidden');
            const returnScreenEl = document.getElementById(returnScreen);
            returnScreenEl.classList.remove('hidden');
            showAdUnavailableMessage(returnScreen);
            updateResourceDisplays();
        });
    }
    function useRetryKey() {
        if (retryKeys < 1 || document.getElementById('gameover-screen').classList.contains('hidden')) {
            if (retryKeys < 1) updateResourceDisplays();
            return;
        }
        retryKeys--;
        Storage.setItem('chrono_retry_keys', retryKeys);
        document.getElementById('gameover-screen').classList.add('hidden');
        document.getElementById('retry-status').classList.add('hidden');
        document.getElementById('retry-challenge-screen').classList.remove('hidden');
        document.getElementById('retry-instructions').innerText = window.UI18n?.t('retryIntro') || 'Une clé est en jeu. Le Roi Paresse te met à l’épreuve.';
        isPaused = true;
        stopGameFrame();
        updateHUD();
        RetryTrace.start(document.getElementById('retry-trace-canvas'), difficultyIndex, {
            onReady(figure) {
                document.getElementById('retry-figure-title').innerText = window.UI18n?.t('retryTitle') || 'Épreuve de reprise';
                const prefix = window.UI18n?.t('retryLevelPrefix') || 'DIFFICULTÉ';
                const levelName = Number.isInteger(figure.tierIndex) ? window.UI18n?.tier(figure.tierIndex) : figure.level;
                document.getElementById('retry-level-chip').innerText = `${prefix} · ${levelName || figure.level}`;
                const hint = figure.hasFixedEndpoints ? 'retryOpenTrail' : 'retryIntro';
                document.getElementById('retry-instructions').innerText =
                    window.UI18n?.t(hint) || (figure.hasFixedEndpoints
                        ? 'Trace chaque ligne une seule fois, sans lever le doigt. Commence au point vert et termine au point doré.'
                        : 'Trace toutes les lignes sans lever le doigt ni repasser dessus.');
            },
            onComplete() {
                document.getElementById('retry-challenge-screen').classList.add('hidden');
                AudioEngine.playVictory();
                sessionCanResume = true;
                lives = 2;
                enemies = [];
                lasers = [];
                spawnTimer = 0;
                updateDifficultyBadge();
                document.getElementById('controls').classList.remove('hidden');
                updateHUD();
                isPaused = false;
                spawnEnemy();
                saveGameProgress();
                lastTime = performance.now();
                setCrazyGameplayActive(true);
                scheduleGameFrame();
            },
            onFail(reason) {
                document.getElementById('retry-challenge-screen').classList.add('hidden');
                document.getElementById('retry-status').innerText = reason;
                document.getElementById('retry-status').classList.remove('hidden');
                document.getElementById('gameover-screen').classList.remove('hidden');
                updateResourceDisplays();
            }
        });
    }

    function cancelRetryChallenge() {
        RetryTrace.stop();
        document.getElementById('retry-challenge-screen').classList.add('hidden');
        document.getElementById('retry-status').innerText = window.UI18n?.t('retryAbandoned') || 'Reprise abandonnée : la clé Retry a été utilisée.';
        document.getElementById('retry-status').classList.remove('hidden');
        document.getElementById('gameover-screen').classList.remove('hidden');
        updateResourceDisplays();
    }
    function gameLoop(timestamp) {
        if (isPaused) return;
        // Ignore long browser/phone stalls instead of simulating seconds in one frame.
        const dt = Math.min(0.05, Math.max(0, timestamp - lastTime) / 1000);
        lastTime = timestamp;
        // Isoler toute transformation du canvas (dont le screen shake) sur cette frame.
        ctx.save();
        // 1. Arrière-plan évolutif
        if (typeof BackgroundEngine !== 'undefined') {
            BackgroundEngine.updateAndDraw(ctx, canvasLogicalWidth(), canvasLogicalHeight(), dt, score);
        } else {
            ctx.clearRect(0, 0, canvasLogicalWidth(), canvasLogicalHeight());
        }
        spawnTimer += dt;
        if (enemies.length === 0 || (score > 140 && enemies.length < 2 && spawnTimer > 3.8)) {
            spawnEnemy();
            spawnTimer = 0;
        }
        const priorityTarget = getPriorityTarget();

        // Compteur fever
        if (feverActive) {
            feverTimer -= dt;
            if (feverTimer <= 0) {
                feverActive = false;
                feverTimer = 0;
                comboMultiplier = 1;
                addFloatingText(canvasLogicalWidth() / 2, canvasLogicalHeight() / 2, window.UI18n?.t('feverEnded') || 'FEVER TERMINÉ', '#fef08a');
            }
        }
        // 2. Mise à jour et dessin des météorites
        // Shake d'écran si actif
        if (screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * screenShake;
            const shakeY = (Math.random() - 0.5) * screenShake;
            ctx.translate(shakeX, shakeY);
            screenShake = Math.max(0, screenShake - dt * 20);
        }
        // Dessiner les météores non-ciblés d'abord (arrière-plan)
        const nonTargets = enemies.filter(e => e !== priorityTarget);
        for (let i = nonTargets.length - 1; i >= 0; i--) {
            const e = nonTargets[i];
            e.y += e.speed * dt;
            // Corps de la météorite
            ctx.beginPath();
            if (e.specialType === 'life') {
                ctx.moveTo(e.x, e.y + e.radius * 0.66);
                ctx.bezierCurveTo(e.x - e.radius * 0.48, e.y + e.radius * 0.23, e.x - e.radius * 1.05, e.y - e.radius * 0.22, e.x - e.radius * 0.7, e.y - e.radius * 0.62);
                ctx.bezierCurveTo(e.x - e.radius * 0.38, e.y - e.radius * 0.98, e.x - e.radius * 0.05, e.y - e.radius * 0.66, e.x, e.y - e.radius * 0.43);
                ctx.bezierCurveTo(e.x + e.radius * 0.05, e.y - e.radius * 0.66, e.x + e.radius * 0.38, e.y - e.radius * 0.98, e.x + e.radius * 0.7, e.y - e.radius * 0.62);
                ctx.bezierCurveTo(e.x + e.radius * 1.05, e.y - e.radius * 0.22, e.x + e.radius * 0.48, e.y + e.radius * 0.23, e.x, e.y + e.radius * 0.66);
                ctx.closePath();
                ctx.fillStyle = '#35172f';
            } else {
                ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#161b22';
            }
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = e.color;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = canvasLogicalWidth() <= 520
                ? (e.specialType === 'life' ? 9 : (e.isRetryMeteor || e.isStarMeteor ? 10 : Math.min(5, getSelectedCannonRank())))
                : (e.specialType === 'life' ? 20 : (e.isRetryMeteor ? 21 : (e.isStarMeteor ? 16 : getSelectedCannonRank() * 2)));
            ctx.stroke();
            ctx.shadowBlur = 0;
            // Texte de la question
            ctx.fillStyle = '#ffffff';
            let meteorFontSize = e.isText
                ? (canvasLogicalWidth() > 520 ? Math.max(12, e.radius * 0.32) : Math.max(7, e.radius * 0.16))
                : (canvasLogicalWidth() > 520 ? Math.max(16, e.radius * 0.38) : Math.max(10, e.radius * 0.20));
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (e.isText) {
                const meteorMaxWidth = e.radius * 1.38;
                let meteorLines;
                let meteorLineHeight;
                do {
                    ctx.font = `bold ${meteorFontSize}px sans-serif`;
                    meteorLineHeight = meteorFontSize * 1.12;
                    meteorLines = wrapCanvasText(e.question, meteorMaxWidth);
                    if (meteorLines.length * meteorLineHeight <= e.radius * 1.25 || meteorFontSize <= 6) break;
                    meteorFontSize = Math.max(6, meteorFontSize - 0.5);
                } while (true);
                drawWrappedText(e.question, e.x, e.y, meteorMaxWidth, meteorLineHeight, meteorLines);
            } else {
                ctx.font = `bold ${meteorFontSize}px sans-serif`;
                ctx.fillText(e.question, e.x, e.y);
            }
            // Collision avec la ligne de défense / vaisseau en bas
            if (e.y + e.radius >= getDefenseLineY()) {
                AudioEngine.playDamage();
                if (e.isRetryMeteor) AudioEngine.playRetryExplosion(getSelectedCannonRank());
                else if (e.isStarMeteor || e.specialType === 'gold') AudioEngine.playStarExplosion(getSelectedCannonRank());
                turret.damageFlash = 0.35;
                createExplosion(e.x, e.y, '#da3633', e.isRetryMeteor ? 'retry' : (e.isStarMeteor || e.specialType === 'gold' ? 'star' : 'normal'), getSelectedCannonRank());
                enemies.splice(i, 1);
                lives--;
                updateHUD();
                if (vibrationEnabled) navigator.vibrate?.(150);
                if (lives <= 0) {
                    triggerGameOver();
                    ctx.restore();
                    return;
                }
                if (enemies.length === 0) spawnEnemy();
                else updateButtons();
                saveGameProgress();
            }
        }
        // Dessiner le météore ciblé en dernier (premier plan)
        if (priorityTarget) {
            const e = priorityTarget;
            e.y += e.speed * dt;
            // Anneau de ciblage autour de l'ennemi prioritaire
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius + 7, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            // Corps de la météorite
            ctx.beginPath();
            if (e.specialType === 'life') {
                ctx.moveTo(e.x, e.y + e.radius * 0.66);
                ctx.bezierCurveTo(e.x - e.radius * 0.48, e.y + e.radius * 0.23, e.x - e.radius * 1.05, e.y - e.radius * 0.22, e.x - e.radius * 0.7, e.y - e.radius * 0.62);
                ctx.bezierCurveTo(e.x - e.radius * 0.38, e.y - e.radius * 0.98, e.x - e.radius * 0.05, e.y - e.radius * 0.66, e.x, e.y - e.radius * 0.43);
                ctx.bezierCurveTo(e.x + e.radius * 0.05, e.y - e.radius * 0.66, e.x + e.radius * 0.38, e.y - e.radius * 0.98, e.x + e.radius * 0.7, e.y - e.radius * 0.62);
                ctx.bezierCurveTo(e.x + e.radius * 1.05, e.y - e.radius * 0.22, e.x + e.radius * 0.48, e.y + e.radius * 0.23, e.x, e.y + e.radius * 0.66);
                ctx.closePath();
                ctx.fillStyle = '#35172f';
            } else {
                ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#161b22';
            }
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = e.color;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = canvasLogicalWidth() <= 520
                ? (e.specialType === 'life' ? 9 : (e.isRetryMeteor || e.isStarMeteor ? 10 : Math.min(5, getSelectedCannonRank())))
                : (e.specialType === 'life' ? 20 : (e.isRetryMeteor ? 21 : (e.isStarMeteor ? 16 : getSelectedCannonRank() * 2)));
            ctx.stroke();
            ctx.shadowBlur = 0;
            // Texte de la question
            ctx.fillStyle = '#ffffff';
            let meteorFontSize = e.isText
                ? (canvasLogicalWidth() > 520 ? Math.max(12, e.radius * 0.32) : Math.max(7, e.radius * 0.16))
                : (canvasLogicalWidth() > 520 ? Math.max(16, e.radius * 0.38) : Math.max(10, e.radius * 0.20));
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (e.isText) {
                const meteorMaxWidth = e.radius * 1.38;
                let meteorLines;
                let meteorLineHeight;
                do {
                    ctx.font = `bold ${meteorFontSize}px sans-serif`;
                    meteorLineHeight = meteorFontSize * 1.12;
                    meteorLines = wrapCanvasText(e.question, meteorMaxWidth);
                    if (meteorLines.length * meteorLineHeight <= e.radius * 1.25 || meteorFontSize <= 6) break;
                    meteorFontSize = Math.max(6, meteorFontSize - 0.5);
                } while (true);
                drawWrappedText(e.question, e.x, e.y, meteorMaxWidth, meteorLineHeight, meteorLines);
            } else {
                ctx.font = `bold ${meteorFontSize}px sans-serif`;
                ctx.fillText(e.question, e.x, e.y);
            }
            // Collision avec la ligne de défense / vaisseau en bas
            if (e.y + e.radius >= getDefenseLineY()) {
                AudioEngine.playDamage();
                if (e.isRetryMeteor) AudioEngine.playRetryExplosion(getSelectedCannonRank());
                else if (e.isStarMeteor || e.specialType === 'gold') AudioEngine.playStarExplosion(getSelectedCannonRank());
                turret.damageFlash = 0.35;
                createExplosion(e.x, e.y, '#da3633', e.isRetryMeteor ? 'retry' : (e.isStarMeteor || e.specialType === 'gold' ? 'star' : 'normal'), getSelectedCannonRank());
                enemies.splice(enemies.indexOf(e), 1);
                lives--;
                updateHUD();
                if (vibrationEnabled) navigator.vibrate?.(150);
                if (lives <= 0) {
                    triggerGameOver();
                    ctx.restore();
                    return;
                }
                if (enemies.length === 0) spawnEnemy();
                else updateButtons();
                saveGameProgress();
            }
        }
        // 3. Faisceaux laser & Particules d'explosion
        updateAndDrawLasers(ctx, dt);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                ctx.globalAlpha = Math.min(1, p.life / (p.maxLife || 0.5));
                ctx.fillStyle = p.color;
                if (p.ring) {
                    p.radius += dt * (100 + getSelectedCannonRank() * 20);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = 2 + getSelectedCannonRank() * 0.45;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = canvasLogicalWidth() <= 520 ? 3 : 9 + getSelectedCannonRank() * 3;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.stroke();
                    ctx.shadowBlur = 0;
                } else if (p.shape === 'star' || p.shape === 'spark') {
                    const points = p.shape === 'star' ? 5 : 4;
                    const outer = p.size || 5;
                    const inner = outer * (p.shape === 'star' ? 0.45 : 0.3);
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((1 - p.life / (p.maxLife || 0.5)) * 2.5);
                    ctx.shadowColor = p.color; ctx.shadowBlur = canvasLogicalWidth() <= 520 ? 1.5 : 5 + getSelectedCannonRank() * 2;
                    ctx.beginPath();
                    for (let point = 0; point < points * 2; point++) {
                        const angle = -Math.PI / 2 + point * Math.PI / points;
                        const radius = point % 2 === 0 ? outer : inner;
                        const px = Math.cos(angle) * radius; const py = Math.sin(angle) * radius;
                        if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.closePath(); ctx.fill(); ctx.restore();
                } else if (p.shape === 'diamond') {
                    const size = p.size || 5;
                    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.PI / 4);
                    ctx.shadowColor = p.color; ctx.shadowBlur = canvasLogicalWidth() <= 520 ? 2 : 7 + getSelectedCannonRank() * 2;
                    ctx.fillRect(-size / 2, -size / 2, size, size); ctx.restore();
                } else {
                    const size = p.size || 5;
                    ctx.shadowColor = p.color; ctx.shadowBlur = canvasLogicalWidth() <= 520 ? 1 : getSelectedCannonRank() * 2;
                    ctx.fillRect(p.x, p.y, size, size);
                    ctx.shadowBlur = 0;
                }
                ctx.globalAlpha = 1;
            }
        }
        // 4. Textes flottants (combo, bonus, etc.)
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
            const ft = floatingTexts[i];
            ft.y += ft.vy * dt;
            ft.life -= dt;
            if (ft.life <= 0) {
                floatingTexts.splice(i, 1);
            } else {
                ctx.save();
                ctx.globalAlpha = ft.life;
                ctx.fillStyle = ft.color;
                ctx.font = 'bold 16px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ft.text, ft.x, ft.y);
                ctx.restore();
            }
        }

        // 5. Dessin du canon/vaisseau par-dessus le décor
        if (getPriorityTarget() !== currentButtonTarget) updateButtons();
        updateAndDrawTurret(ctx, dt, getPriorityTarget());

        // Halo doré du canon en mode Fever
        if (feverActive) {
            ctx.save();
            ctx.translate(turret.x, turret.y);
            ctx.rotate(turret.angle);
            const pulse = 1 + Math.sin(Date.now() * 0.01) * 0.15;
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, 30 * pulse, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
        scheduleGameFrame();
    }
