// Initialize Tone.js
let isPlaying = false;
let currentBPM = 120;
let volume = -12; // dB

// Audio setup
const limiter = new Tone.Limiter(-1).toDestination();
const masterGain = new Tone.Gain(0.8).connect(limiter);
const reverb = new Tone.Reverb({
    decay: 2.5,
    wet: 0.2
}).connect(masterGain);

// Character sounds setup
const characters = [
    {
        id: 'beatbox',
        name: 'Beatbox Master',
        icon: '🎵',
        sounds: [
            { name: 'Kick', url: 'sounds/kick.mp3', type: 'drum' },
            { name: 'Snare', url: 'sounds/snare.mp3', type: 'drum' },
            { name: 'Hi-hat', url: 'sounds/hihat.mp3', type: 'drum' }
        ]
    },
    {
        id: 'melody',
        name: 'Melody Maker',
        icon: '🎼',
        sounds: [
            { name: 'Piano', url: 'sounds/piano.mp3', type: 'melody' },
            { name: 'Synth', url: 'sounds/synth.mp3', type: 'melody' },
            { name: 'Pad', url: 'sounds/pad.mp3', type: 'melody' }
        ]
    },
    {
        id: 'bass',
        name: 'Bass King',
        icon: '🎸',
        sounds: [
            { name: 'Bass', url: 'sounds/bass.mp3', type: 'bass' },
            { name: 'Sub', url: 'sounds/sub.mp3', type: 'bass' },
            { name: '808', url: 'sounds/808.mp3', type: 'bass' }
        ]
    },
    {
        id: 'effects',
        name: 'Effect Wizard',
        icon: '✨',
        sounds: [
            { name: 'FX1', url: 'sounds/fx1.mp3', type: 'effect' },
            { name: 'FX2', url: 'sounds/fx2.mp3', type: 'effect' },
            { name: 'FX3', url: 'sounds/fx3.mp3', type: 'effect' }
        ]
    }
];

// Tracks storage
const tracks = new Map();

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    initializeCharacters();
    initializeControls();
    setupVisualization();
});

function initializeCharacters() {
    const panel = document.querySelector('.characters-panel');
    
    characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character-item';
        charElement.innerHTML = `
            <div class="character-icon">${char.icon}</div>
            <div class="character-info">
                <div class="character-name">${char.name}</div>
                <div class="character-sounds">${char.sounds.length} sounds</div>
            </div>
        `;
        
        charElement.addEventListener('click', () => {
            addTrack(char);
        });
        
        panel.appendChild(charElement);
    });
}

function addTrack(character) {
    const trackContainer = document.querySelector('.track-container');
    const trackId = `track-${Date.now()}`;
    
    const trackElement = document.createElement('div');
    trackElement.className = 'track';
    trackElement.id = trackId;
    
    const track = {
        id: trackId,
        character: character,
        pattern: new Array(16).fill(false),
        muted: false,
        volume: 0,
        sampler: new Tone.Sampler({
            urls: {
                C4: character.sounds[0].url
            },
            onload: () => {
                console.log(`Loaded sounds for ${character.name}`);
            }
        }).connect(reverb)
    };
    
    trackElement.innerHTML = `
        <div class="track-controls">
            <div class="track-title">
                <span>${character.icon} ${character.name}</span>
            </div>
            <div class="track-buttons">
                <button class="track-button mute-button">
                    <i class="fas fa-volume-up"></i>
                </button>
                <button class="track-button solo-button">
                    <i class="fas fa-headphones"></i>
                </button>
                <button class="track-button delete-button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="beat-grid">
            ${track.pattern.map((_, i) => `
                <div class="beat" data-beat="${i}"></div>
            `).join('')}
        </div>
    `;
    
    tracks.set(trackId, track);
    trackContainer.appendChild(trackElement);
    
    // Add event listeners for beat toggles
    trackElement.querySelectorAll('.beat').forEach((beat, index) => {
        beat.addEventListener('click', () => {
            track.pattern[index] = !track.pattern[index];
            beat.classList.toggle('active');
        });
    });
    
    // Add event listeners for track controls
    const muteButton = trackElement.querySelector('.mute-button');
    muteButton.addEventListener('click', () => {
        track.muted = !track.muted;
        track.sampler.volume.value = track.muted ? -Infinity : track.volume;
        muteButton.innerHTML = `<i class="fas fa-volume-${track.muted ? 'mute' : 'up'}"></i>`;
    });
    
    const deleteButton = trackElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        tracks.delete(trackId);
        trackElement.remove();
    });
}

function initializeControls() {
    const playButton = document.getElementById('playButton');
    const stopButton = document.getElementById('stopButton');
    const volumeSlider = document.querySelector('.volume-slider');
    const tempoSlider = document.querySelector('.tempo-slider');
    
    playButton.addEventListener('click', togglePlay);
    stopButton.addEventListener('click', stopPlayback);
    
    volumeSlider.addEventListener('input', (e) => {
        volume = Tone.gainToDb(e.target.value / 100);
        masterGain.gain.value = Tone.dbToGain(volume);
    });
    
    tempoSlider.addEventListener('input', (e) => {
        currentBPM = parseInt(e.target.value);
        Tone.Transport.bpm.value = currentBPM;
        document.querySelector('.tempo-control span').textContent = `${currentBPM} BPM`;
    });
}

function togglePlay() {
    if (!isPlaying) {
        Tone.start();
        Tone.Transport.start();
        startSequencer();
        document.getElementById('playButton').innerHTML = `
            <i class="fas fa-pause"></i>
            <span>Pause</span>
        `;
    } else {
        Tone.Transport.pause();
        document.getElementById('playButton').innerHTML = `
            <i class="fas fa-play"></i>
            <span>Play</span>
        `;
    }
    isPlaying = !isPlaying;
}

function stopPlayback() {
    Tone.Transport.stop();
    isPlaying = false;
    document.getElementById('playButton').innerHTML = `
        <i class="fas fa-play"></i>
        <span>Play</span>
    `;
}

function startSequencer() {
    let step = 0;
    
    Tone.Transport.scheduleRepeat((time) => {
        tracks.forEach(track => {
            if (track.pattern[step] && !track.muted) {
                track.sampler.triggerAttackRelease('C4', '8n', time);
            }
        });
        
        // Update visual beat indicator
        document.querySelectorAll('.beat').forEach(beat => {
            beat.style.opacity = beat.dataset.beat == step ? '0.5' : '1';
        });
        
        step = (step + 1) % 16;
    }, '16n');
}

// Audio visualization
function setupVisualization() {
    const analyzer = new Tone.Analyser('waveform', 128);
    masterGain.connect(analyzer);
    
    const canvas = document.createElement('canvas');
    const wave = document.querySelector('.wave');
    wave.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    function draw() {
        requestAnimationFrame(draw);
        
        const width = canvas.width = wave.clientWidth;
        const height = canvas.height = wave.clientHeight;
        
        const values = analyzer.getValue();
        ctx.clearRect(0, 0, width, height);
        
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let i = 0; i < values.length; i++) {
            const x = (i / values.length) * width;
            const y = ((values[i] + 1) / 2) * height;
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();
        ctx.stroke();
    }
    
    draw();
}

// Handle window resize
window.addEventListener('resize', () => {
    setupVisualization();
});
