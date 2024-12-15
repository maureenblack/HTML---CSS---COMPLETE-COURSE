// Rewards system
const rewards = {
    badges: {
        htmlMaster: {
            id: 'html-master',
            name: 'HTML Master',
            image: 'images/badges/html-master.png',
            description: 'You\'ve mastered HTML basics!'
        },
        cssWizard: {
            id: 'css-wizard',
            name: 'CSS Wizard',
            image: 'images/badges/css-wizard.png',
            description: 'Your styling skills are magical!'
        },
        blockBuilder: {
            id: 'block-builder',
            name: 'Block Builder',
            image: 'images/badges/block-builder.png',
            description: 'You can build anything!'
        }
    },
    stickers: {
        starCoder: {
            id: 'star-coder',
            name: 'Star Coder',
            image: 'images/stickers/star.png'
        },
        bugSquasher: {
            id: 'bug-squasher',
            name: 'Bug Squasher',
            image: 'images/stickers/bug.png'
        },
        speedyLearner: {
            id: 'speedy-learner',
            name: 'Speedy Learner',
            image: 'images/stickers/rocket.png'
        }
    }
};

// Player rewards tracking
let playerRewards = {
    badges: [],
    stickers: [],
    recentlyEarned: null
};

// Award new reward
function awardReward(type, id) {
    const rewardList = rewards[type];
    const reward = rewardList[id];
    
    if (!reward || hasReward(type, id)) return;
    
    playerRewards[type].push(id);
    playerRewards.recentlyEarned = {type, id};
    
    showRewardAnimation(reward);
    updateRewardsDisplay();
    saveRewards();
}

// Check if player has a specific reward
function hasReward(type, id) {
    return playerRewards[type].includes(id);
}

// Show reward animation
function showRewardAnimation(reward) {
    const rewardPopup = document.createElement('div');
    rewardPopup.className = 'reward-popup';
    rewardPopup.innerHTML = `
        <img src="${reward.image}" alt="${reward.name}">
        <h3>New ${reward.name}!</h3>
        <p>${reward.description || 'Keep up the great work!'}</p>
    `;
    
    document.body.appendChild(rewardPopup);
    
    setTimeout(() => {
        rewardPopup.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        rewardPopup.classList.remove('show');
        setTimeout(() => rewardPopup.remove(), 500);
    }, 3000);
}

// Update rewards display
function updateRewardsDisplay() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    if (!rewardsGrid) return;
    
    rewardsGrid.innerHTML = '';
    
    // Add badges
    playerRewards.badges.forEach(badgeId => {
        const badge = rewards.badges[badgeId];
        if (badge) {
            const badgeElement = createRewardElement(badge);
            rewardsGrid.appendChild(badgeElement);
        }
    });
    
    // Add stickers
    playerRewards.stickers.forEach(stickerId => {
        const sticker = rewards.stickers[stickerId];
        if (sticker) {
            const stickerElement = createRewardElement(sticker);
            rewardsGrid.appendChild(stickerElement);
        }
    });
}

// Create reward element
function createRewardElement(reward) {
    const element = document.createElement('div');
    element.className = 'reward-item';
    element.innerHTML = `
        <img src="${reward.image}" alt="${reward.name}">
        <h4>${reward.name}</h4>
        ${reward.description ? `<p>${reward.description}</p>` : ''}
    `;
    return element;
}

// Show rewards modal
function showRewards() {
    updateRewardsDisplay();
    document.getElementById('rewardsModal').classList.add('show');
}

// Save rewards to localStorage
function saveRewards() {
    localStorage.setItem('playerRewards', JSON.stringify(playerRewards));
}

// Load rewards from localStorage
function loadRewards() {
    const saved = localStorage.getItem('playerRewards');
    if (saved) {
        playerRewards = JSON.parse(saved);
        updateRewardsDisplay();
    }
}

// Initialize rewards system
document.addEventListener('DOMContentLoaded', loadRewards);
