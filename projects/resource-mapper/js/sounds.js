// Sound effects system
const sounds = {
    click: new Audio('sounds/click.mp3'),
    success: new Audio('sounds/success.mp3'),
    error: new Audio('sounds/error.mp3'),
    drag: new Audio('sounds/drag.mp3'),
    drop: new Audio('sounds/drop.mp3'),
    celebration: new Audio('sounds/celebration.mp3'),
    levelUp: new Audio('sounds/level-up.mp3'),
    hint: new Audio('sounds/hint.mp3')
};

// Sound settings
let soundEnabled = true;

// Play sound effect
function playSound(soundName) {
    if (!soundEnabled) return;
    
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0; // Reset to start
        sound.play().catch(err => console.log('Sound play error:', err));
    }
}

// Toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundButton();
}

// Update sound button display
function updateSoundButton() {
    const soundButton = document.getElementById('soundToggle');
    if (soundButton) {
        soundButton.innerHTML = soundEnabled ? '🔊' : '🔇';
        soundButton.title = soundEnabled ? 'Sound On' : 'Sound Off';
    }
}

// Initialize sound button
function initializeSoundSystem() {
    const soundButton = document.createElement('button');
    soundButton.id = 'soundToggle';
    soundButton.className = 'sound-toggle';
    soundButton.onclick = toggleSound;
    
    document.body.appendChild(soundButton);
    updateSoundButton();
}

// Add sound effects to various actions
document.addEventListener('DOMContentLoaded', () => {
    initializeSoundSystem();
    
    // Add click sounds to buttons
    document.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            playSound('click');
        }
    });
    
    // Add drag and drop sounds
    document.addEventListener('dragstart', () => playSound('drag'));
    document.addEventListener('drop', () => playSound('drop'));
});

// Export sound functions for use in other modules
window.playSound = playSound;
window.toggleSound = toggleSound;
