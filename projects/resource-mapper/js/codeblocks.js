// Code blocks system for kid-friendly coding
const codeBlocks = {
    html: {
        heading: {
            icon: '📑',
            template: '<h1>Your Heading</h1>',
            description: 'Big text for titles',
            difficulty: 1
        },
        paragraph: {
            icon: '📝',
            template: '<p>Your text here</p>',
            description: 'Normal text for stories',
            difficulty: 1
        },
        image: {
            icon: '🖼️',
            template: '<img src="image.jpg" alt="description">',
            description: 'Add a picture',
            difficulty: 2
        },
        button: {
            icon: '🔘',
            template: '<button>Click me!</button>',
            description: 'Make a clickable button',
            difficulty: 2
        },
        list: {
            icon: '📋',
            template: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
            description: 'Make a list of things',
            difficulty: 2
        }
    },
    css: {
        color: {
            icon: '🎨',
            template: 'color: #FF6B6B;',
            description: 'Change text color',
            difficulty: 1
        },
        size: {
            icon: '📏',
            template: 'font-size: 20px;',
            description: 'Make text bigger or smaller',
            difficulty: 1
        },
        background: {
            icon: '🌈',
            template: 'background-color: #4ECDC4;',
            description: 'Change background color',
            difficulty: 1
        },
        border: {
            icon: '📦',
            template: 'border: 2px solid #45B7D1;',
            description: 'Add a border',
            difficulty: 2
        },
        animation: {
            icon: '✨',
            template: 'animation: bounce 1s infinite;',
            description: 'Make things move',
            difficulty: 3
        }
    }
};

// Initialize draggable code blocks
function initializeCodeBlocks() {
    const blockPalette = document.getElementById('blockPalette');
    if (!blockPalette) return;

    // Create category tabs
    const categories = Object.keys(codeBlocks);
    const tabsHtml = categories.map(category => 
        `<button class="category-tab" data-category="${category}">${category.toUpperCase()}</button>`
    ).join('');
    
    blockPalette.innerHTML = `
        <div class="category-tabs">${tabsHtml}</div>
        <div class="blocks-container"></div>
    `;

    // Add click handlers to tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => showCategoryBlocks(tab.dataset.category));
    });

    // Show HTML blocks by default
    showCategoryBlocks('html');
}

// Show blocks for selected category
function showCategoryBlocks(category) {
    const blocksContainer = document.querySelector('.blocks-container');
    const blocks = codeBlocks[category];
    
    blocksContainer.innerHTML = '';
    
    Object.entries(blocks).forEach(([blockId, block]) => {
        const blockElement = createBlockElement(blockId, block, category);
        blocksContainer.appendChild(blockElement);
    });

    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
}

// Create draggable block element
function createBlockElement(blockId, block, category) {
    const element = document.createElement('div');
    element.className = 'code-block';
    element.draggable = true;
    element.dataset.blockId = blockId;
    element.dataset.category = category;
    
    element.innerHTML = `
        <span class="block-icon">${block.icon}</span>
        <div class="block-info">
            <h4>${blockId}</h4>
            <p>${block.description}</p>
        </div>
        <div class="difficulty">
            ${'⭐'.repeat(block.difficulty)}
        </div>
    `;

    // Add drag events
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);

    return element;
}

// Drag event handlers
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify({
        blockId: e.target.dataset.blockId,
        category: e.target.dataset.category
    }));
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Drop zone handling
function initializeDropZones() {
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', handleDrop);
    });
}

// Handle block drop
function handleDrop(e) {
    e.preventDefault();
    const zone = e.target.closest('.drop-zone');
    zone.classList.remove('drag-over');

    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const block = codeBlocks[data.category][data.blockId];
        
        if (block) {
            insertCodeBlock(zone, block.template);
            checkProgress();
            
            // Show character reaction
            characterReact('happy');
            
            // Maybe award a reward
            if (Math.random() < 0.3) {
                awardRandomReward();
            }
        }
    } catch (err) {
        console.error('Error handling drop:', err);
    }
}

// Insert code block into drop zone
function insertCodeBlock(zone, template) {
    const codeElement = document.createElement('div');
    codeElement.className = 'code-snippet';
    codeElement.textContent = template;
    
    zone.appendChild(codeElement);
    
    // Animate insertion
    codeElement.style.animation = 'pop-in 0.3s ease-out';
}

// Award random reward
function awardRandomReward() {
    const rewardTypes = ['badges', 'stickers'];
    const type = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    
    const availableRewards = Object.keys(rewards[type]).filter(id => !hasReward(type, id));
    
    if (availableRewards.length > 0) {
        const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)];
        awardReward(type, randomReward);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initializeCodeBlocks();
    initializeDropZones();
});
