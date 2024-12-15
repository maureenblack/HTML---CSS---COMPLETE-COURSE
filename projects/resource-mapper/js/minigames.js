// Mini-games system to make learning more fun
const minigames = {
    // Code Blocks Puzzle
    blockPuzzle: {
        name: "Code Block Puzzle",
        description: "Arrange the blocks to create a webpage!",
        levels: [
            {
                id: 'simple-page',
                goal: 'Create a simple webpage with a title and paragraph',
                blocks: ['heading', 'paragraph'],
                solution: '<h1>.*</h1>\\s*<p>.*</p>',
                points: 100
            },
            {
                id: 'styled-button',
                goal: 'Create a styled button',
                blocks: ['button', 'color', 'background'],
                solution: '<button.*>.*</button>.*background-color:.*color:',
                points: 150
            }
        ]
    },
    
    // Bug Hunt Game
    bugHunt: {
        name: "Bug Hunt",
        description: "Find and fix the bugs in the code!",
        levels: [
            {
                id: 'missing-tag',
                code: '<h1>Welcome</h1\n<p>This is my website.',
                bugs: ['missing closing tag'],
                hints: ['Check if all tags are properly closed'],
                points: 100
            },
            {
                id: 'wrong-color',
                code: 'color: red;\nbackground-color: rd;',
                bugs: ['invalid color value'],
                hints: ['Color values need to be valid CSS colors'],
                points: 150
            }
        ]
    },
    
    // Code Memory Match
    memoryMatch: {
        name: "Code Memory Match",
        description: "Match the code blocks with their results!",
        levels: [
            {
                id: 'html-basics',
                pairs: [
                    {code: '<h1>Title</h1>', result: 'Big Title Text'},
                    {code: '<p>Text</p>', result: 'Paragraph Text'},
                    {code: '<button>Click</button>', result: 'Clickable Button'},
                    {code: '<img src="pic.jpg">', result: 'Shows an Image'}
                ],
                points: 200
            }
        ]
    }
};

// Game state management
let gameState = {
    currentGame: null,
    currentLevel: null,
    score: 0,
    lives: 3,
    timeLeft: 0
};

// Initialize mini-games system
function initializeMinigames() {
    const gameContainer = document.getElementById('minigameContainer');
    if (!gameContainer) return;

    // Create game selection menu
    const menu = createGameMenu();
    gameContainer.appendChild(menu);
}

// Create game selection menu
function createGameMenu() {
    const menu = document.createElement('div');
    menu.className = 'game-menu';
    
    menu.innerHTML = `
        <h2>🎮 Fun Coding Games 🎮</h2>
        <div class="game-grid">
            ${Object.entries(minigames).map(([id, game]) => `
                <div class="game-card" onclick="startGame('${id}')">
                    <h3>${game.name}</h3>
                    <p>${game.description}</p>
                    <button class="play-btn">Play Now!</button>
                </div>
            `).join('')}
        </div>
    `;
    
    return menu;
}

// Start a mini-game
function startGame(gameId) {
    const game = minigames[gameId];
    if (!game) return;

    gameState.currentGame = gameId;
    gameState.currentLevel = 0;
    gameState.lives = 3;
    
    // Show game UI
    const gameContainer = document.getElementById('minigameContainer');
    gameContainer.innerHTML = '';
    
    switch(gameId) {
        case 'blockPuzzle':
            startBlockPuzzle();
            break;
        case 'bugHunt':
            startBugHunt();
            break;
        case 'memoryMatch':
            startMemoryMatch();
            break;
    }
    
    // Play start sound
    playSound('levelUp');
}

// Block Puzzle Game
function startBlockPuzzle() {
    const level = minigames.blockPuzzle.levels[gameState.currentLevel];
    const container = document.getElementById('minigameContainer');
    
    container.innerHTML = `
        <div class="puzzle-game">
            <h3>Level ${gameState.currentLevel + 1}: ${level.goal}</h3>
            <div class="puzzle-workspace">
                <div class="block-palette"></div>
                <div class="code-workspace" ondrop="dropBlock(event)" ondragover="allowDrop(event)"></div>
            </div>
            <button onclick="checkPuzzleSolution()">Check Solution</button>
        </div>
    `;
    
    // Add available blocks
    level.blocks.forEach(blockId => {
        const block = createDraggableBlock(blockId);
        document.querySelector('.block-palette').appendChild(block);
    });
}

// Bug Hunt Game
function startBugHunt() {
    const level = minigames.bugHunt.levels[gameState.currentLevel];
    const container = document.getElementById('minigameContainer');
    
    container.innerHTML = `
        <div class="bug-hunt">
            <h3>Find the Bugs!</h3>
            <div class="code-display">
                <pre><code>${level.code}</code></pre>
            </div>
            <div class="bug-tools">
                <button onclick="markBug(event)">Mark Bug</button>
                <button onclick="showHint()">Get Hint</button>
            </div>
        </div>
    `;
}

// Memory Match Game
function startMemoryMatch() {
    const level = minigames.memoryMatch.levels[gameState.currentLevel];
    const container = document.getElementById('minigameContainer');
    
    // Create shuffled pairs
    const pairs = [...level.pairs, ...level.pairs].sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div class="memory-game">
            <h3>Match the Pairs!</h3>
            <div class="card-grid">
                ${pairs.map((pair, index) => `
                    <div class="memory-card" data-index="${index}" onclick="flipCard(this)">
                        <div class="card-front">?</div>
                        <div class="card-back">${pair.code || pair.result}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Game completion handling
function completeGame() {
    const container = document.getElementById('minigameContainer');
    
    container.innerHTML = `
        <div class="game-complete">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You earned ${gameState.score} points!</p>
            <button onclick="returnToMenu()">Play Another Game</button>
        </div>
    `;
    
    // Play celebration sound
    playSound('celebration');
    
    // Award special reward
    if (gameState.score >= 500) {
        awardReward('badges', 'gamemaster');
    }
}

// Return to game menu
function returnToMenu() {
    const container = document.getElementById('minigameContainer');
    container.innerHTML = '';
    initializeMinigames();
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', initializeMinigames);
