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
        playCannonShot(tier = 0) {
            const pitch = 250 + Math.min(tier, 5) * 80;
            playTone(pitch, pitch * (1.5 + tier * 0.06), 0.12, tier >= 3 ? 'triangle' : 'square', 0.12, 0);
            if (tier >= 2) playTone(pitch * 2.01, pitch * 1.3, 0.16, 'sine', 0.08, 0.025);
            if (tier >= 4) playTone(pitch * 3, pitch * 1.1, 0.2, 'sine', 0.06, 0.04);
        },
        playMeteorExplosion(tier = 0) {
            const pitch = 115 + Math.min(tier, 5) * 20;
            playTone(pitch, 32, 0.24 + tier * 0.018, tier >= 3 ? 'sawtooth' : 'triangle', 0.2, 0);
            if (tier >= 2) playTone(pitch * 2.3, 48, 0.18, 'triangle', 0.08, 0.025);
        },
        playStarExplosion(tier = 0) {
            const lift = Math.min(tier, 5) * 55;
            playTone(720 + lift, 1320 + lift, 0.16, 'sine', 0.16, 0);
            playTone(1040 + lift, 1760 + lift, 0.2, 'triangle', 0.13, 0.045);
            playTone(1500 + lift, 2100 + lift, 0.24, 'sine', 0.08, 0.1);
        },
        playRetryExplosion(tier = 0) {
            const lift = Math.min(tier, 5) * 42;
            playTone(380 + lift, 980 + lift, 0.16, 'triangle', 0.17, 0);
            playTone(620 + lift, 1240 + lift, 0.21, 'sine', 0.13, 0.06);
            playTone(920 + lift, 540 + lift, 0.27, 'sine', 0.1, 0.13);
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
        playCombo(streak) {
            const base = 440 + streak * 60;
            playTone(base, base * 1.6, 0.12, 'square', 0.14, 0);
        },
        // Activation du mode Fever
        playFever() {
            playTone(523.25, 783.99, 0.15, 'sawtooth', 0.16, 0);
            playTone(659.25, 1046.5, 0.15, 'sawtooth', 0.16, 0.08);
            playTone(783.99, 1567.98, 0.30, 'sawtooth', 0.18, 0.16);
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
        playDoubleLaser() {
            playTone(1200, 600, 0.1, 'square', 0.14, 0);
        }
    };
})();
