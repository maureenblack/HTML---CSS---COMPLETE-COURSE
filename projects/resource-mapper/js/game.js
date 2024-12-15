// Game state
let gameState = {
    points: 0,
    level: 1,
    progress: 0,
    character: null,
    completedTasks: []
};

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    updateStats();
});

// Drag and Drop functionality
function initDragAndDrop() {
    const blocks = document.querySelectorAll('.block');
    const previewContainer = document.getElementById('previewContainer');

    blocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
    });

    previewContainer.addEventListener('dragover', handleDragOver);
    previewContainer.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.block);
    playSound('pickup');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('text/plain');
    const placeholder = document.querySelector('.preview-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }

    createPreviewElement(blockType);
    playSound('drop');
    awardPoints(10);
    checkProgress();
}

// UI Elements creation
function createPreviewElement(blockType) {
    const element = document.createElement('div');
    element.className = 'preview-element';
    
    switch(blockType) {
        case 'header':
            element.innerHTML = '<h1 contenteditable="true">My Cool Website</h1>';
            break;
        case 'paragraph':
            element.innerHTML = '<p contenteditable="true">Type your text here...</p>';
            break;
        case 'image':
            element.innerHTML = '<div class="image-placeholder">Click to add image 🖼️</div>';
            break;
        case 'button':
            element.innerHTML = '<button class="preview-button">Click Me!</button>';
            break;
    }

    document.getElementById('previewContainer').appendChild(element);
}

// Game mechanics
function awardPoints(points) {
    gameState.points += points;
    updateStats();
    showFloatingPoints('+' + points);
}

function updateStats() {
    document.getElementById('playerPoints').textContent = gameState.points;
    document.getElementById('playerLevel').textContent = gameState.level;
    document.getElementById('progressFill').style.width = gameState.progress + '%';
}

function showFloatingPoints(text) {
    const pointsPopup = document.createElement('div');
    pointsPopup.className = 'floating-points';
    pointsPopup.textContent = text;
    document.body.appendChild(pointsPopup);

    setTimeout(() => {
        pointsPopup.remove();
    }, 1000);
}

// Sound effects
function playSound(soundType) {
    const sounds = {
        pickup: 'pickup.mp3',
        drop: 'drop.mp3',
        success: 'success.mp3',
        levelUp: 'levelup.mp3'
    };

    const audio = new Audio('sounds/' + sounds[soundType]);
    audio.play().catch(e => console.log('Sound not loaded yet'));
}

// Help system
function showHint() {
    const hints = {
        1: "Try dragging a Title block to start your webpage!",
        2: "Add some text to tell people about your website",
        3: "Pictures make your website look cool! Try adding one",
        4: "Buttons make your website interactive!"
    };

    const hintText = hints[gameState.level] || "Keep exploring and creating!";
    document.getElementById('hintText').textContent = hintText;
    document.getElementById('hintModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Progress checking
function checkProgress() {
    const previewElements = document.querySelectorAll('.preview-element');
    gameState.progress = Math.min(100, (previewElements.length / 4) * 100);
    updateStats();

    if (gameState.progress >= 100 && gameState.level === 1) {
        levelUp();
    }
}

function levelUp() {
    gameState.level++;
    playSound('levelUp');
    showCelebration();
}

function showCelebration() {
    const modal = document.getElementById('celebrationModal');
    const reward = document.getElementById('newReward');
    
    reward.innerHTML = `<img src="images/badges/level${gameState.level - 1}.png" alt="Level ${gameState.level - 1} Badge">
                       <p>Level ${gameState.level - 1} Master!</p>`;
    
    modal.classList.add('show');
    
    // Add confetti effect
    createConfetti();
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}
