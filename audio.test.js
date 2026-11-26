const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

class FakeParam {
    constructor() {
        this.events = [];
    }

    setValueAtTime(value, time) {
        this.events.push({ value, time });
    }

    exponentialRampToValueAtTime(value, time) {
        this.events.push({ value, time });
    }
}

class FakeAudioContext {
    constructor() {
        this.currentTime = 0;
        this.sampleRate = 1000;
        this.state = 'running';
        this.destination = {};
        this.oscillators = [];
        this.bufferSources = [];
    }

    createOscillator() {
        const oscillator = {
            type: 'sine',
            frequency: new FakeParam(),
            connect() {},
            start() {},
            stop() {}
        };
        this.oscillators.push(oscillator);
        return oscillator;
    }

    createGain() {
        return { gain: new FakeParam(), connect() {} };
    }

    createBuffer(_channels, length) {
        const samples = new Float32Array(length);
        return { getChannelData: () => samples };
    }

    createBufferSource() {
        const source = { connect() {}, start() {}, stop() {} };
        this.bufferSources.push(source);
        return source;
    }

    createBiquadFilter() {
        return { type: 'lowpass', frequency: new FakeParam(), connect() {} };
    }
}

const audioContext = new FakeAudioContext();
const context = { window: { AudioContext: class { constructor() { return audioContext; } } } };
vm.runInNewContext(
    `${fs.readFileSync(path.join(__dirname, 'audio.js'), 'utf8')}\n` +
    'globalThis.__audioEngine = AudioEngine;',
    context,
    { filename: 'audio.js' }
);

test('each cannon has a distinct shot sound', () => {
    const weapons = ['blue', 'emerald', 'solar', 'neon', 'crystal', 'void'];
    const signatures = weapons.map(weapon => {
        const start = audioContext.oscillators.length;
        context.__audioEngine.playCannonShot(0, weapon, 1);
        const first = audioContext.oscillators[start];
        return `${first.type}:${first.frequency.events[0].value}`;
    });

    assert.equal(new Set(signatures).size, weapons.length);
});

test('cannon rank raises the shot pitch as weapons evolve', () => {
    const engine = context.__audioEngine;
    const baseIndex = audioContext.oscillators.length;
    engine.playCannonShot(0, 'blue', 1);
    const basePitch = audioContext.oscillators[baseIndex].frequency.events[0].value;
    const evolvedIndex = audioContext.oscillators.length;
    engine.playCannonShot(5, 'blue', 1);
    const evolvedPitch = audioContext.oscillators[evolvedIndex].frequency.events[0].value;

    assert.ok(evolvedPitch > basePitch);
});

test('high combos layer extra sound and impact noise', () => {
    const engine = context.__audioEngine;
    const comboStart = audioContext.oscillators.length;
    const noiseStart = audioContext.bufferSources.length;
    engine.playCombo(3, 'emerald');
    const lowComboVoices = audioContext.oscillators.length - comboStart;

    const highComboStart = audioContext.oscillators.length;
    engine.playCombo(8, 'emerald');
    const highComboVoices = audioContext.oscillators.length - highComboStart;
    assert.ok(highComboVoices > lowComboVoices);
    assert.ok(audioContext.bufferSources.length > noiseStart);

    const explosionNoiseStart = audioContext.bufferSources.length;
    engine.playMeteorExplosion(4, 8, 'void');
    assert.ok(audioContext.bufferSources.length > explosionNoiseStart);
});
