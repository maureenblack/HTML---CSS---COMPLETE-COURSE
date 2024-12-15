// Lesson system for structured learning
const lessons = {
    basics: [
        {
            id: 'welcome',
            title: 'Welcome to Coding!',
            description: 'Let\'s start your coding adventure!',
            task: 'Click the "Start" button to begin',
            hints: ['Look for the big green button!'],
            completion: 'button-click',
            reward: 'starCoder'
        },
        {
            id: 'first-heading',
            title: 'Creating Headlines',
            description: 'Let\'s make a big title for our page',
            task: 'Drag a heading block to the page',
            hints: [
                'Find the block with the 📑 icon',
                'Drag it to the empty space on the page'
            ],
            completion: 'block-placed',
            blockType: 'heading',
            reward: 'blockBuilder'
        },
        {
            id: 'add-color',
            title: 'Making it Colorful',
            description: 'Let\'s add some color to our heading',
            task: 'Add a color style to your heading',
            hints: [
                'Look for the 🎨 block in the CSS category',
                'Drag it to your heading'
            ],
            completion: 'style-applied',
            blockType: 'color',
            reward: 'cssWizard'
        }
    ],
    intermediate: [
        {
            id: 'image-lesson',
            title: 'Adding Pictures',
            description: 'Make your page come alive with images',
            task: 'Add an image to your page',
            hints: [
                'Find the 🖼️ block',
                'Drag it where you want the picture to appear'
            ],
            completion: 'block-placed',
            blockType: 'image',
            reward: 'htmlMaster'
        },
        {
            id: 'button-style',
            title: 'Styling Buttons',
            description: 'Create a cool looking button',
            task: 'Add a button and style it',
            hints: [
                'First add a button block 🔘',
                'Then add background color 🌈',
                'Finally add a border 📦'
            ],
            completion: 'multi-block',
            requiredBlocks: ['button', 'background', 'border'],
            reward: 'speedyLearner'
        }
    ],
    advanced: [
        {
            id: 'animation-intro',
            title: 'Making Things Move',
            description: 'Learn how to animate your elements',
            task: 'Add an animation to any element',
            hints: [
                'Look for the ✨ animation block',
                'Drag it to the element you want to animate'
            ],
            completion: 'style-applied',
            blockType: 'animation',
            reward: 'bugSquasher'
        }
    ]
};

// Track player progress
let lessonProgress = {
    currentLesson: null,
    completedLessons: [],
    currentLevel: 'basics',
    score: 0
};

// Initialize lesson system
function initializeLessons() {
    loadProgress();
    showCurrentLesson();
    updateLessonUI();
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('lessonProgress');
    if (saved) {
        lessonProgress = JSON.parse(saved);
    }
}

// Save progress
function saveProgress() {
    localStorage.setItem('lessonProgress', JSON.stringify(lessonProgress));
}

// Show current lesson
function showCurrentLesson() {
    if (!lessonProgress.currentLesson) {
        // Find first incomplete lesson
        const allLessons = [...lessons.basics, ...lessons.intermediate, ...lessons.advanced];
        lessonProgress.currentLesson = allLessons.find(lesson => 
            !lessonProgress.completedLessons.includes(lesson.id)
        );
    }

    if (lessonProgress.currentLesson) {
        updateLessonCard(lessonProgress.currentLesson);
    } else {
        showCompletionMessage();
    }
}

// Update lesson card display
function updateLessonCard(lesson) {
    const lessonCard = document.getElementById('lessonCard');
    if (!lessonCard) return;

    lessonCard.innerHTML = `
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        <div class="task-container">
            <h4>Your Task:</h4>
            <p>${lesson.task}</p>
        </div>
        <div class="hints-container">
            <button onclick="showHint()">Need a hint?</button>
            <div id="hintText" class="hidden"></div>
        </div>
    `;
}

// Show hint
let currentHintIndex = 0;
function showHint() {
    const lesson = lessonProgress.currentLesson;
    const hintText = document.getElementById('hintText');
    
    if (hintText && lesson.hints[currentHintIndex]) {
        hintText.textContent = lesson.hints[currentHintIndex];
        hintText.classList.remove('hidden');
        
        // Character reacts to hint request
        characterReact('think');
        
        currentHintIndex = (currentHintIndex + 1) % lesson.hints.length;
    }
}

// Check lesson completion
function checkLessonCompletion(action, blockType) {
    const lesson = lessonProgress.currentLesson;
    if (!lesson) return;

    let completed = false;

    switch (lesson.completion) {
        case 'button-click':
            completed = action === 'button-click';
            break;
        case 'block-placed':
            completed = action === 'block-placed' && blockType === lesson.blockType;
            break;
        case 'style-applied':
            completed = action === 'style-applied' && blockType === lesson.blockType;
            break;
        case 'multi-block':
            const placedBlocks = getPlacedBlocks();
            completed = lesson.requiredBlocks.every(block => 
                placedBlocks.includes(block)
            );
            break;
    }

    if (completed) {
        completedLesson();
    }
}

// Complete current lesson
function completedLesson() {
    const lesson = lessonProgress.currentLesson;
    
    // Add to completed lessons
    lessonProgress.completedLessons.push(lesson.id);
    
    // Award reward if specified
    if (lesson.reward) {
        awardReward('stickers', lesson.reward);
    }
    
    // Update score
    lessonProgress.score += 100;
    
    // Save progress
    saveProgress();
    
    // Show celebration
    showCelebration();
    
    // Move to next lesson
    setTimeout(() => {
        lessonProgress.currentLesson = null;
        showCurrentLesson();
    }, 3000);
}

// Show celebration
function showCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
        <h2>🎉 Great Job! 🎉</h2>
        <p>You completed the lesson!</p>
        <p>+100 points</p>
    `;
    
    document.body.appendChild(celebration);
    
    // Character celebrates
    characterReact('happy');
    
    setTimeout(() => {
        celebration.remove();
    }, 3000);
}

// Show completion message
function showCompletionMessage() {
    const lessonCard = document.getElementById('lessonCard');
    if (!lessonCard) return;

    lessonCard.innerHTML = `
        <h3>🏆 Congratulations! 🏆</h3>
        <p>You've completed all the lessons!</p>
        <p>Final Score: ${lessonProgress.score}</p>
        <button onclick="resetProgress()">Start Over</button>
    `;
}

// Reset progress
function resetProgress() {
    lessonProgress = {
        currentLesson: null,
        completedLessons: [],
        currentLevel: 'basics',
        score: 0
    };
    
    saveProgress();
    showCurrentLesson();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeLessons);
