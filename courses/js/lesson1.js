// Lesson 1: Introduction to CSS
document.addEventListener('DOMContentLoaded', () => {
    // Interactive CSS Selector Demo
    function initSelectorDemo() {
        const demoContainer = document.getElementById('selector-demo');
        if (!demoContainer) return;

        const elements = demoContainer.querySelectorAll('.demo-element');
        const selectorInput = document.getElementById('selector-input');
        const tryButton = document.getElementById('try-selector');

        tryButton.addEventListener('click', () => {
            // Reset previous selections
            elements.forEach(el => el.classList.remove('selected'));
            
            try {
                // Try to select elements with user's input
                const selectedElements = demoContainer.querySelectorAll(selectorInput.value);
                selectedElements.forEach(el => el.classList.add('selected'));
                
                // Show success message
                showMessage('Great! You selected ' + selectedElements.length + ' element(s)', 'success');
            } catch (error) {
                showMessage('Invalid selector. Try again!', 'error');
            }
        });
    }

    // CSS Property Playground
    function initPropertyPlayground() {
        const playground = document.getElementById('css-playground');
        if (!playground) return;

        const targetElement = playground.querySelector('.target-element');
        const controls = playground.querySelectorAll('.css-control');

        controls.forEach(control => {
            control.addEventListener('change', (e) => {
                const property = e.target.dataset.property;
                const value = e.target.value;
                targetElement.style[property] = value;
                
                // Update code preview
                updateCodePreview();
            });
        });
    }

    // Code Preview
    function updateCodePreview() {
        const codePreview = document.getElementById('code-preview');
        if (!codePreview) return;

        const targetElement = document.querySelector('.target-element');
        const computedStyle = window.getComputedStyle(targetElement);
        const relevantProperties = ['color', 'background-color', 'font-size', 'padding', 'margin'];
        
        let cssCode = '.target-element {\n';
        relevantProperties.forEach(prop => {
            const value = computedStyle.getPropertyValue(prop);
            if (value) {
                cssCode += `    ${prop}: ${value};\n`;
            }
        });
        cssCode += '}';

        codePreview.textContent = cssCode;
        highlightCode();
    }

    // Mini Challenge System
    function initChallenges() {
        const challenges = document.querySelectorAll('.css-challenge');
        challenges.forEach(challenge => {
            const checkButton = challenge.querySelector('.check-solution');
            const solution = challenge.querySelector('.solution-input');
            const target = challenge.querySelector('.target-output');

            checkButton.addEventListener('click', () => {
                const userStyle = solution.value;
                const targetStyle = target.getAttribute('data-style');

                if (compareStyles(userStyle, targetStyle)) {
                    showMessage('🎉 Correct! Well done!', 'success');
                    challenge.classList.add('completed');
                } else {
                    showMessage('Not quite right. Try again!', 'error');
                }
            });
        });
    }

    // Helper Functions
    function showMessage(text, type) {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        messageContainer.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    function compareStyles(userStyle, targetStyle) {
        // Normalize styles for comparison
        const normalize = (style) => {
            return style.replace(/\s+/g, '')
                       .toLowerCase()
                       .replace(/;$/, '');
        };
        return normalize(userStyle) === normalize(targetStyle);
    }

    function highlightCode() {
        // Add syntax highlighting if a library like Prism.js is available
        if (window.Prism) {
            Prism.highlightAll();
        }
    }

    // Progress Tracking
    function initProgressTracking() {
        const sections = document.querySelectorAll('.lesson-section');
        const progressBar = document.getElementById('lesson-progress');

        let completedSections = 0;

        sections.forEach(section => {
            const exercises = section.querySelectorAll('.exercise');
            let completed = true;

            exercises.forEach(exercise => {
                if (!exercise.classList.contains('completed')) {
                    completed = false;
                }
            });

            if (completed) {
                completedSections++;
                section.classList.add('section-completed');
            }
        });

        if (progressBar) {
            const progress = (completedSections / sections.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Initialize all components
    initSelectorDemo();
    initPropertyPlayground();
    initChallenges();
    initProgressTracking();
});
