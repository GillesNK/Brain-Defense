// Synthétiseur Web Audio API (zéro fichier MP3 requis)
const AudioEngine = (() => {
    let ctx = null;
    let isMuted = false;

    function init() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            ctx = new AudioCtx();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
    }

    function playTone(freqStart, freqEnd, duration, type = 'sine', volume = 0.15, delay = 0) {
        if (isMuted) return;
        init();
        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, now);
        if (freqEnd !== freqStart) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 20), now + duration);
        }

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    const SOUND_PROFILES = {
        blue: { shotWave: 'square', shotStart: 250, shotEnd: 720, shotDuration: 0.11, accentWave: 'triangle', accentFreq: 1480, boomWave: 'triangle', boomFreq: 138, noiseFreq: 1250, comboWave: 'triangle', comboBase: 480 },
        emerald: { shotWave: 'sawtooth', shotStart: 205, shotEnd: 590, shotDuration: 0.16, accentWave: 'sine', accentFreq: 1120, boomWave: 'sine', boomFreq: 175, noiseFreq: 880, comboWave: 'sine', comboBase: 390 },
        solar: { shotWave: 'sawtooth', shotStart: 330, shotEnd: 980, shotDuration: 0.19, accentWave: 'triangle', accentFreq: 1760, boomWave: 'triangle', boomFreq: 165, noiseFreq: 1550, comboWave: 'sawtooth', comboBase: 560 },
        neon: { shotWave: 'square', shotStart: 390, shotEnd: 1120, shotDuration: 0.09, accentWave: 'sawtooth', accentFreq: 2050, boomWave: 'sawtooth', boomFreq: 105, noiseFreq: 1900, comboWave: 'square', comboBase: 640 },
        crystal: { shotWave: 'sine', shotStart: 520, shotEnd: 1280, shotDuration: 0.2, accentWave: 'sine', accentFreq: 1880, boomWave: 'sine', boomFreq: 210, noiseFreq: 680, comboWave: 'sine', comboBase: 720 },
        void: { shotWave: 'triangle', shotStart: 170, shotEnd: 480, shotDuration: 0.24, accentWave: 'square', accentFreq: 760, boomWave: 'square', boomFreq: 82, noiseFreq: 520, comboWave: 'triangle', comboBase: 330 }
    };

    function soundProfile(weapon) {
        return SOUND_PROFILES[weapon] || SOUND_PROFILES.blue;
    }

    function playNoise(duration, volume, frequencyStart, frequencyEnd, delay = 0) {
        if (isMuted) return;
        init();
        const now = ctx.currentTime + delay;
        const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const samples = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            samples[i] = (Math.random() * 2 - 1) * (1 - i / length);
        }

        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        source.buffer = buffer;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(frequencyStart, now);
        filter.frequency.exponentialRampToValueAtTime(Math.max(30, frequencyEnd), now + duration);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
        source.stop(now + duration);
    }

    return {
        setMuted(value) {
            isMuted = Boolean(value);
            return isMuted;
        },
        toggleMute() {
            isMuted = !isMuted;
            return isMuted;
        },
        // Tir laser + petite explosion sur bonne réponse
        playLaserHit() {
            playTone(880, 220, 0.14, 'sawtooth', 0.12, 0);
            playTone(180, 45, 0.22, 'square', 0.15, 0.06);
        },
        playCannonShot(tier = 0, weapon = 'blue', streak = 0) {
            const profile = soundProfile(weapon);
            const rank = Math.max(0, Math.min(5, Number(tier) || 0));
            const comboLift = Math.min(0.055, Math.max(0, streak - 1) * 0.006);
            const start = profile.shotStart + rank * 42;
            playTone(start, profile.shotEnd + rank * 82, profile.shotDuration + rank * 0.008,
                profile.shotWave, 0.11 + comboLift, 0);
            playTone(profile.accentFreq + rank * 55, profile.accentFreq * 0.62, 0.075,
                profile.accentWave, 0.045 + comboLift * 0.35, 0.018);
            if (streak >= 4) {
                playTone(start * 1.5, start * 2.1, 0.1, profile.comboWave, 0.045, 0.035);
            }
        },
        playMeteorExplosion(tier = 0, streak = 0, weapon = 'blue') {
            const profile = soundProfile(weapon);
            const rank = Math.max(0, Math.min(5, Number(tier) || 0));
            const comboLift = Math.min(0.06, Math.max(0, streak - 1) * 0.008);
            playNoise(0.2 + rank * 0.018 + comboLift, 0.09 + comboLift, profile.noiseFreq + rank * 100, 75, 0);
            playTone(profile.boomFreq + rank * 14, 32, 0.25 + rank * 0.018 + comboLift,
                profile.boomWave, 0.18 + comboLift, 0);
            if (streak >= 4 || rank >= 2) {
                playTone(profile.boomFreq * 2.4, 55, 0.18 + comboLift, profile.comboWave, 0.07 + comboLift * 0.3, 0.025);
            }
        },
        playStarExplosion(tier = 0, streak = 0, weapon = 'blue') {
            const profile = soundProfile(weapon);
            const lift = Math.min(tier, 5) * 55 + Math.min(streak, 12) * 11;
            playTone(720 + lift, 1320 + lift, 0.16, 'sine', 0.16, 0);
            playTone(1040 + lift, 1760 + lift, 0.2, 'triangle', 0.13, 0.045);
            playTone(1500 + lift, 2100 + lift, 0.24, 'sine', 0.08, 0.1);
            if (streak >= 4) playTone(profile.comboBase * 2, profile.comboBase * 3, 0.16, profile.comboWave, 0.06, 0.06);
        },
        playRetryExplosion(tier = 0, streak = 0, weapon = 'blue') {
            const profile = soundProfile(weapon);
            const lift = Math.min(tier, 5) * 42 + Math.min(streak, 12) * 9;
            playTone(380 + lift, 980 + lift, 0.16, 'triangle', 0.17, 0);
            playTone(620 + lift, 1240 + lift, 0.21, 'sine', 0.13, 0.06);
            playTone(920 + lift, 540 + lift, 0.27, 'sine', 0.1, 0.13);
            if (streak >= 4) playTone(profile.comboBase, profile.comboBase * 1.8, 0.18, profile.comboWave, 0.06, 0.04);
        },
        // Buzzer grave sur mauvaise réponse
        playWrong() {
            playTone(160, 110, 0.18, 'sawtooth', 0.18, 0);
        },
        // Impact quand une météorite touche la base
        playDamage() {
            playTone(140, 35, 0.35, 'triangle', 0.25, 0);
        },
        // Arpège doux pour la pause bien-être ou un nouveau record
        playVictory() {
            playTone(523.25, 523.25, 0.14, 'triangle', 0.15, 0);    // Do
            playTone(659.25, 659.25, 0.14, 'triangle', 0.15, 0.11); // Mi
            playTone(783.99, 783.99, 0.14, 'triangle', 0.15, 0.22); // Sol
            playTone(1046.5, 1046.5, 0.30, 'triangle', 0.18, 0.33); // Do aigu
        },
        // Mélodie descendante Game Over
        playGameOver() {
            playTone(440, 392, 0.2, 'sawtooth', 0.14, 0);
            playTone(392, 349, 0.2, 'sawtooth', 0.14, 0.2);
            playTone(349, 261, 0.45, 'sawtooth', 0.14, 0.4);
        },
        // Son de combo : pitch montant selon la streak
        playCombo(streak, weapon = 'blue') {
            const profile = soundProfile(weapon);
            const level = Math.min(24, Math.max(1, Number(streak) || 1));
            const base = profile.comboBase + level * 34;
            playTone(base, base * 1.28, 0.1, profile.comboWave, 0.11, 0);
            playTone(base * 1.5, base * 1.9, 0.13, profile.accentWave, 0.07, 0.045);
            if (streak >= 4) playTone(base * 2, base * 2.4, 0.16, 'sine', 0.05, 0.08);
            if (streak >= 8) playNoise(0.16, 0.055, profile.noiseFreq, 450, 0.06);
        },
        // Activation du mode Fever
        playFever(weapon = 'blue') {
            const profile = soundProfile(weapon);
            playTone(profile.comboBase, profile.comboBase * 1.5, 0.15, profile.comboWave, 0.15, 0);
            playTone(profile.comboBase * 1.25, profile.comboBase * 2, 0.16, profile.accentWave, 0.14, 0.08);
            playTone(profile.comboBase * 1.6, profile.comboBase * 3, 0.3, profile.shotWave, 0.16, 0.16);
            playNoise(0.22, 0.06, profile.noiseFreq, 600, 0.12);
        },
        // Météore de glace (gel)
        playFreeze() {
            playTone(800, 200, 0.25, 'triangle', 0.18, 0);
        },
        // Gain de vie
        playLifeGain() {
            playTone(600, 900, 0.12, 'sine', 0.15, 0);
            playTone(700, 1100, 0.12, 'sine', 0.15, 0.08);
        },
        // Achat garage
        playGaragePurchase() {
            playTone(400, 800, 0.15, 'sine', 0.16, 0);
            playTone(600, 1200, 0.15, 'sine', 0.16, 0.1);
        },
        // Double laser (fever)
        playDoubleLaser(tier = 0, weapon = 'blue', streak = 0) {
            const profile = soundProfile(weapon);
            const rank = Math.max(0, Math.min(5, Number(tier) || 0));
            const lift = Math.min(500, Math.max(0, streak - 1) * 24);
            playTone(profile.accentFreq + rank * 45 + lift, profile.shotStart + lift, 0.12, profile.shotWave, 0.13, 0);
            playTone(profile.accentFreq * 1.5 + lift, profile.comboBase * 2, 0.16, profile.accentWave, 0.07, 0.035);
        }
    };
})();
