// Daily challenges and achievements system
const challenges = {
    daily: [
        {
            id: 'first-webpage',
            title: 'Build Your First Webpage',
            description: 'Create a webpage with a title and paragraph',
            requirements: {
                blocks: ['heading', 'paragraph'],
                minElements: 2
            },
            reward: {
                points: 200,
                badge: 'webBuilder'
            }
        },
        {
            id: 'colorful-design',
            title: 'Make it Colorful',
            description: 'Use at least 3 different colors in your design',
            requirements: {
                styles: ['color', 'background-color'],
                minStyles: 3
            },
            reward: {
                points: 250,
                badge: 'colorMaster'
            }
        },
        {
            id: 'interactive-page',
            title: 'Add Interaction',
            description: 'Create a page with 2 clickable buttons',
            requirements: {
                blocks: ['button'],
                minElements: 2
            },
            reward: {
                points: 300,
                badge: 'interactionPro'
            }
        }
    ],
    
    achievements: {
        speedCoder: {
            id: 'speed-coder',
            title: 'Speed Coder',
            description: 'Complete 3 challenges in under 10 minutes',
            progress: 0,
            target: 3,
            reward: {
                points: 500,
                badge: 'speedster'
            }
        },
        perfectionist: {
            id: 'perfectionist',
            title: 'Perfectionist',
            description: 'Complete 5 challenges without any mistakes',
            progress: 0,
            target: 5,
            reward: {
                points: 750,
                badge: 'perfect'
            }
        },
        explorer: {
            id: 'explorer',
            title: 'Code Explorer',
            description: 'Try every type of code block',
            progress: 0,
            target: Object.keys(codeBlocks.html).length + Object.keys(codeBlocks.css).length,
            reward: {
                points: 1000,
                badge: 'explorer'
            }
        }
    }
};

// Challenge tracking
let challengeState = {
    currentChallenge: null,
    completedChallenges: [],
    achievementProgress: {},
    lastDailyReset: null
};

// Initialize challenge system
function initializeChallenges() {
    loadChallengeState();
    checkDailyReset();
    updateChallengeUI();
}

// Load challenge state
function loadChallengeState() {
    const saved = localStorage.getItem('challengeState');
    if (saved) {
        challengeState = JSON.parse(saved);
    }
}

// Save challenge state
function saveChallengeState() {
    localStorage.setItem('challengeState', JSON.stringify(challengeState));
}

// Check if daily challenges should reset
function checkDailyReset() {
    const now = new Date();
    const lastReset = challengeState.lastDailyReset ? new Date(challengeState.lastDailyReset) : null;
    
    if (!lastReset || now.getDate() !== lastReset.getDate()) {
        resetDailyChallenges();
    }
}

// Reset daily challenges
function resetDailyChallenges() {
    challengeState.currentChallenge = null;
    challengeState.completedChallenges = challengeState.completedChallenges.filter(id => 
        !challenges.daily.find(c => c.id === id)
    );
    challengeState.lastDailyReset = new Date().toISOString();
    saveChallengeState();
}

// Update challenge UI
function updateChallengeUI() {
    const container = document.getElementById('challengeContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="challenges-panel">
            <h2>Daily Challenges</h2>
            <div class="daily-challenges">
                ${renderDailyChallenges()}
            </div>
            
            <h2>Achievements</h2>
            <div class="achievements-list">
                ${renderAchievements()}
            </div>
        </div>
    `;
}

// Render daily challenges
function renderDailyChallenges() {
    return challenges.daily.map(challenge => {
        const completed = challengeState.completedChallenges.includes(challenge.id);
        return `
            <div class="challenge-card ${completed ? 'completed' : ''}">
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="reward-preview">
                    <span>🏆 ${challenge.reward.points} points</span>
                    ${challenge.reward.badge ? `<span>🎖️ ${challenge.reward.badge} badge</span>` : ''}
                </div>
                <button 
                    onclick="startChallenge('${challenge.id}')"
                    ${completed ? 'disabled' : ''}
                >
                    ${completed ? 'Completed!' : 'Start Challenge'}
                </button>
            </div>
        `;
    }).join('');
}

// Render achievements
function renderAchievements() {
    return Object.values(challenges.achievements).map(achievement => {
        const progress = challengeState.achievementProgress[achievement.id] || 0;
        const completed = progress >= achievement.target;
        
        return `
            <div class="achievement-card ${completed ? 'completed' : ''}">
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(progress / achievement.target) * 100}%"></div>
                </div>
                <p class="progress-text">${progress}/${achievement.target}</p>
            </div>
        `;
    }).join('');
}

// Start a challenge
function startChallenge(challengeId) {
    const challenge = challenges.daily.find(c => c.id === challengeId);
    if (!challenge) return;

    challengeState.currentChallenge = challenge;
    
    // Update UI to show challenge requirements
    const container = document.getElementById('challengeContainer');
    container.innerHTML = `
        <div class="active-challenge">
            <h2>${challenge.title}</h2>
            <p>${challenge.description}</p>
            <div class="requirements">
                <h3>Requirements:</h3>
                <ul>
                    ${renderRequirements(challenge.requirements)}
                </ul>
            </div>
            <button onclick="checkChallenge()">Submit Challenge</button>
            <button onclick="cancelChallenge()">Cancel</button>
        </div>
    `;
}

// Render challenge requirements
function renderRequirements(requirements) {
    let html = '';
    
    if (requirements.blocks) {
        html += requirements.blocks.map(block => 
            `<li>Use the ${block} block</li>`
        ).join('');
    }
    
    if (requirements.styles) {
        html += requirements.styles.map(style => 
            `<li>Apply ${style} styling</li>`
        ).join('');
    }
    
    if (requirements.minElements) {
        html += `<li>Create at least ${requirements.minElements} elements</li>`;
    }
    
    if (requirements.minStyles) {
        html += `<li>Use at least ${requirements.minStyles} different styles</li>`;
    }
    
    return html;
}

// Check challenge completion
function checkChallenge() {
    const challenge = challengeState.currentChallenge;
    if (!challenge) return;

    // Check if requirements are met
    const completed = checkRequirements(challenge.requirements);
    
    if (completed) {
        completeChallenge(challenge);
    } else {
        showError("Not all requirements are met yet. Keep trying!");
    }
}

// Complete a challenge
function completeChallenge(challenge) {
    // Add to completed challenges
    challengeState.completedChallenges.push(challenge.id);
    
    // Award rewards
    if (challenge.reward) {
        if (challenge.reward.points) {
            addPoints(challenge.reward.points);
        }
        if (challenge.reward.badge) {
            awardReward('badges', challenge.reward.badge);
        }
    }
    
    // Update achievements
    updateAchievements(challenge);
    
    // Save state
    saveChallengeState();
    
    // Show completion message
    showCompletion(challenge);
    
    // Reset current challenge
    challengeState.currentChallenge = null;
    
    // Update UI
    updateChallengeUI();
}

// Update achievements progress
function updateAchievements(challenge) {
    // Update Speed Coder achievement
    if (challenge.startTime && (Date.now() - challenge.startTime < 600000)) {
        incrementAchievement('speed-coder');
    }
    
    // Update Perfectionist achievement
    if (!challenge.mistakes) {
        incrementAchievement('perfectionist');
    }
    
    // Update Explorer achievement
    if (challenge.requirements.blocks) {
        challenge.requirements.blocks.forEach(block => {
            if (!challengeState.usedBlocks) {
                challengeState.usedBlocks = new Set();
            }
            challengeState.usedBlocks.add(block);
            
            const totalBlocks = Object.keys(codeBlocks.html).length + 
                              Object.keys(codeBlocks.css).length;
            
            if (challengeState.usedBlocks.size === totalBlocks) {
                completeAchievement('explorer');
            }
        });
    }
}

// Increment achievement progress
function incrementAchievement(achievementId) {
    const achievement = challenges.achievements[achievementId];
    if (!achievement) return;
    
    if (!challengeState.achievementProgress[achievementId]) {
        challengeState.achievementProgress[achievementId] = 0;
    }
    
    challengeState.achievementProgress[achievementId]++;
    
    if (challengeState.achievementProgress[achievementId] >= achievement.target) {
        completeAchievement(achievementId);
    }
}

// Complete an achievement
function completeAchievement(achievementId) {
    const achievement = challenges.achievements[achievementId];
    if (!achievement) return;
    
    // Award rewards
    if (achievement.reward) {
        if (achievement.reward.points) {
            addPoints(achievement.reward.points);
        }
        if (achievement.reward.badge) {
            awardReward('badges', achievement.reward.badge);
        }
    }
    
    // Show completion message
    showAchievementComplete(achievement);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeChallenges);
