// Additional interactive features for the kid-friendly environment
const interactiveFeatures = {
    // Interactive code playground
    playground: {
        tools: {
            brush: {
                name: 'Magic Brush',
                icon: '🖌️',
                effects: ['rainbow', 'sparkle', 'glow']
            },
            stamp: {
                name: 'Fun Stamps',
                icon: '🎨',
                stamps: ['🌟', '🦄', '🌈', '🚀', '🎮']
            },
            text: {
                name: 'Text Tool',
                icon: '📝',
                fonts: ['Comic', 'Fantasy', 'Bubble']
            }
        },
        effects: {
            particles: {
                enabled: true,
                types: ['sparkles', 'bubbles', 'confetti']
            },
            sounds: {
                enabled: true,
                types: ['pop', 'whoosh', 'ding']
            }
        }
    },
    
    // Interactive tutorials
    tutorials: {
        beginner: [
            {
                title: 'Your First Webpage',
                steps: [
                    {
                        action: 'add-heading',
                        instruction: 'Let\'s add a cool title!',
                        hint: 'Drag the heading block to your page'
                    },
                    {
                        action: 'add-color',
                        instruction: 'Make it colorful!',
                        hint: 'Try different colors until you find your favorite'
                    }
                ]
            }
        ],
        intermediate: [
            {
                title: 'Animation Magic',
                steps: [
                    {
                        action: 'add-animation',
                        instruction: 'Make things move!',
                        hint: 'Try the bounce effect'
                    }
                ]
            }
        ]
    },
    
    // Interactive challenges
    challenges: {
        daily: {
            title: 'Daily Code Quest',
            description: 'Complete today\'s coding challenge!',
            reward: {
                points: 100,
                badge: 'daily-champion'
            }
        },
        weekly: {
            title: 'Weekly Code Adventure',
            description: 'A bigger challenge for brave coders!',
            reward: {
                points: 500,
                badge: 'weekly-master'
            }
        }
    },
    
    // Fun animations
    animations: {
        characters: {
            pixel: {
                states: ['idle', 'happy', 'thinking', 'celebrating'],
                sprites: {
                    idle: 'pixel-idle.png',
                    happy: 'pixel-happy.png',
                    thinking: 'pixel-thinking.png',
                    celebrating: 'pixel-celebrating.png'
                }
            }
        },
        effects: {
            success: {
                type: 'particle-burst',
                color: 'rainbow',
                duration: 2000
            },
            levelUp: {
                type: 'spiral-up',
                color: 'gold',
                duration: 1500
            }
        }
    }
};

// Initialize interactive playground
function initializePlayground() {
    const playground = document.createElement('div');
    playground.className = 'interactive-playground';
    
    playground.innerHTML = `
        <div class="toolbar">
            ${Object.entries(interactiveFeatures.playground.tools).map(([id, tool]) => `
                <button class="tool-btn" onclick="selectTool('${id}')">
                    ${tool.icon} ${tool.name}
                </button>
            `).join('')}
        </div>
        
        <div class="canvas-area">
            <canvas id="playgroundCanvas"></canvas>
        </div>
        
        <div class="effects-panel">
            <h4>Special Effects</h4>
            ${Object.entries(interactiveFeatures.playground.effects).map(([effect, config]) => `
                <button class="effect-btn" onclick="toggleEffect('${effect}')">
                    ${effect} ${config.enabled ? '✅' : '❌'}
                </button>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(playground);
    initializeCanvas();
}

// Initialize canvas for drawing
function initializeCanvas() {
    const canvas = document.getElementById('playgroundCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Drawing state
    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#FF6B6B';
    
    // Drawing events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        switch(currentTool) {
            case 'brush':
                drawBrush(ctx, x, y);
                break;
            case 'stamp':
                drawStamp(ctx, x, y);
                break;
            case 'text':
                drawText(ctx, x, y);
                break;
        }
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
}

// Drawing tools
function drawBrush(ctx, x, y) {
    const tool = interactiveFeatures.playground.tools.brush;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
    
    // Add effects
    if (tool.effects.includes('sparkle')) {
        drawSparkles(ctx, x, y);
    }
}

function drawStamp(ctx, x, y) {
    const tool = interactiveFeatures.playground.tools.stamp;
    const stamp = tool.stamps[Math.floor(Math.random() * tool.stamps.length)];
    ctx.font = '24px Arial';
    ctx.fillText(stamp, x, y);
}

function drawText(ctx, x, y) {
    const tool = interactiveFeatures.playground.tools.text;
    const text = prompt('Enter your text:');
    if (text) {
        ctx.font = `20px ${tool.fonts[0]}`;
        ctx.fillStyle = currentColor;
        ctx.fillText(text, x, y);
    }
}

// Special effects
function drawSparkles(ctx, x, y) {
    const colors = ['#FFD700', '#FF69B4', '#00CED1'];
    for (let i = 0; i < 5; i++) {
        const sparkleX = x + (Math.random() - 0.5) * 20;
        const sparkleY = y + (Math.random() - 0.5) * 20;
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fill();
    }
}

// Interactive tutorials
function startTutorial(level) {
    const tutorials = interactiveFeatures.tutorials[level];
    if (!tutorials || !tutorials.length) return;
    
    const tutorial = tutorials[0];
    showTutorialStep(tutorial.steps[0]);
}

function showTutorialStep(step) {
    const tutorialOverlay = document.createElement('div');
    tutorialOverlay.className = 'tutorial-overlay';
    
    tutorialOverlay.innerHTML = `
        <div class="tutorial-content">
            <h3>${step.instruction}</h3>
            <p class="hint">${step.hint}</p>
            <button onclick="completeTutorialStep()">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(tutorialOverlay);
}

// Daily challenges
function startDailyChallenge() {
    const challenge = interactiveFeatures.challenges.daily;
    
    const challengeModal = document.createElement('div');
    challengeModal.className = 'challenge-modal';
    
    challengeModal.innerHTML = `
        <div class="challenge-content">
            <h2>${challenge.title}</h2>
            <p>${challenge.description}</p>
            <div class="reward-preview">
                <p>Rewards:</p>
                <ul>
                    <li>🏆 ${challenge.reward.points} points</li>
                    <li>🎖️ ${challenge.reward.badge} badge</li>
                </ul>
            </div>
            <button onclick="acceptChallenge()">Start Challenge</button>
        </div>
    `;
    
    document.body.appendChild(challengeModal);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initializePlayground();
    startTutorial('beginner');
    startDailyChallenge();
});
