// Character definitions
const characters = {
    pixel: {
        name: "Pixel the Robot",
        image: "images/pixel.png",
        hints: {
            start: "Beep boop! Let's build something awesome!",
            success: "Your code is running perfectly! *happy robot noises*",
            error: "Oops! Let me help you fix that!",
            levelUp: "WOW! You're becoming a coding genius!"
        },
        animations: {
            idle: "pixel-idle",
            happy: "pixel-happy",
            think: "pixel-think"
        }
    },
    cody: {
        name: "Cody the Cat",
        image: "images/cody.png",
        hints: {
            start: "Meow! Ready to make something purr-fect?",
            success: "Paw-some job! You're doing great!",
            error: "Don't worry, we'll fix it together!",
            levelUp: "You're becoming a coding cat-genius!"
        },
        animations: {
            idle: "cody-idle",
            happy: "cody-happy",
            think: "cody-think"
        }
    },
    byte: {
        name: "Byte the Bug",
        image: "images/byte.png",
        hints: {
            start: "Hi friend! Let's create something cool!",
            success: "Yay! Your code works perfectly!",
            error: "Hmm, let's debug this together!",
            levelUp: "Amazing! You're growing so fast!"
        },
        animations: {
            idle: "byte-idle",
            happy: "byte-happy",
            think: "byte-think"
        }
    }
};

// Character selection
function selectCharacter(characterId) {
    const character = characters[characterId];
    if (!character) return;

    // Update game state
    gameState.character = character;
    
    // Update UI
    document.getElementById('playerCharacter').src = character.image;
    document.getElementById('hintCharacter').src = character.image;
    
    // Show game world
    document.getElementById('characterSelect').style.display = 'none';
    document.getElementById('gameWorld').style.display = 'block';
    
    // Welcome message
    showCharacterMessage(character.hints.start);
}

// Character messages
function showCharacterMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'character-message';
    messageBox.innerHTML = `
        <img src="${gameState.character.image}" alt="${gameState.character.name}">
        <p>${message}</p>
    `;
    
    document.body.appendChild(messageBox);
    
    setTimeout(() => {
        messageBox.classList.add('fade-out');
        setTimeout(() => messageBox.remove(), 500);
    }, 3000);
}

// Character reactions
function characterReact(type) {
    const character = gameState.character;
    if (!character) return;

    const hintCharacter = document.getElementById('hintCharacter');
    
    // Play animation
    hintCharacter.className = character.animations[type];
    
    // Show appropriate message
    switch(type) {
        case 'happy':
            showCharacterMessage(character.hints.success);
            break;
        case 'think':
            showCharacterMessage(character.hints.error);
            break;
        case 'idle':
            // No message for idle animation
            break;
    }
    
    // Reset animation after a delay
    setTimeout(() => {
        hintCharacter.className = character.animations.idle;
    }, 2000);
}
