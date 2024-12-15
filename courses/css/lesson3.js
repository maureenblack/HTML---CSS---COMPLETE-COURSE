// Lesson 3: Box Model & Layout
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Box Model Demo
    function initBoxModelDemo() {
        const boxModel = document.querySelector('.box-model-demo');
        if (!boxModel) return;

        const controls = {
            margin: document.querySelectorAll('[data-property="margin"]'),
            padding: document.querySelectorAll('[data-property="padding"]'),
            border: document.querySelectorAll('[data-property="border-width"]')
        };

        const demoBox = boxModel.querySelector('.demo-box');
        const dimensions = boxModel.querySelector('.dimensions');

        // Update box model when controls change
        Object.entries(controls).forEach(([property, inputs]) => {
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    const side = input.dataset.side;
                    const value = input.value + 'px';
                    
                    if (side === 'all') {
                        if (property === 'border') {
                            demoBox.style.borderWidth = value;
                        } else {
                            demoBox.style[property] = value;
                        }
                    } else {
                        demoBox.style[`${property}${side.charAt(0).toUpperCase() + side.slice(1)}`] = value;
                    }

                    updateDimensions();
                });
            });
        });

        function updateDimensions() {
            const computed = window.getComputedStyle(demoBox);
            dimensions.innerHTML = `
                Content: ${computed.width} × ${computed.height}<br>
                Padding Box: ${demoBox.clientWidth}px × ${demoBox.clientHeight}px<br>
                Border Box: ${demoBox.offsetWidth}px × ${demoBox.offsetHeight}px<br>
                Margin Box: ${demoBox.offsetWidth + parseInt(computed.marginLeft) + parseInt(computed.marginRight)}px × 
                           ${demoBox.offsetHeight + parseInt(computed.marginTop) + parseInt(computed.marginBottom)}px
            `;
        }

        // Initialize dimensions
        updateDimensions();
    }

    // Display Property Interactive Demo
    function initDisplayDemo() {
        const displaySelect = document.getElementById('display-property');
        const demoContainer = document.querySelector('.display-demo');
        const elements = demoContainer.querySelectorAll('.demo-element');

        displaySelect.addEventListener('change', () => {
            elements.forEach(element => {
                element.style.display = displaySelect.value;
            });
            updateDisplayCode();
        });

        function updateDisplayCode() {
            const codePreview = document.getElementById('display-code');
            codePreview.textContent = `.demo-element {
    display: ${displaySelect.value};
}`;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Position Property Demo
    function initPositionDemo() {
        const positionSelect = document.getElementById('position-property');
        const demoElement = document.querySelector('.position-demo .demo-element');
        const offsetControls = document.querySelectorAll('.offset-control');

        positionSelect.addEventListener('change', () => {
            demoElement.style.position = positionSelect.value;
            updatePositionCode();
        });

        offsetControls.forEach(control => {
            control.addEventListener('input', () => {
                const property = control.dataset.property;
                const value = control.value + 'px';
                demoElement.style[property] = value;
                updatePositionCode();
            });
        });

        function updatePositionCode() {
            const codePreview = document.getElementById('position-code');
            const style = window.getComputedStyle(demoElement);
            
            codePreview.textContent = `.demo-element {
    position: ${style.position};
    top: ${style.top};
    right: ${style.right};
    bottom: ${style.bottom};
    left: ${style.left};
}`;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Float and Clear Demo
    function initFloatDemo() {
        const floatControls = document.querySelectorAll('[name="float"]');
        const clearControl = document.getElementById('clear-property');
        const demoElements = document.querySelectorAll('.float-demo .demo-element');
        const clearElement = document.querySelector('.float-demo .clear-element');

        floatControls.forEach(control => {
            control.addEventListener('change', (e) => {
                const selectedElement = demoElements[e.target.dataset.index];
                selectedElement.style.float = e.target.value;
                updateFloatCode();
            });
        });

        clearControl.addEventListener('change', () => {
            clearElement.style.clear = clearControl.value;
            updateFloatCode();
        });

        function updateFloatCode() {
            const codePreview = document.getElementById('float-code');
            let code = '';
            
            demoElements.forEach((el, index) => {
                code += `.demo-element:nth-child(${index + 1}) {
    float: ${el.style.float || 'none'};
}\n`;
            });

            code += `\n.clear-element {
    clear: ${clearElement.style.clear || 'none'};
}`;

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Layout Challenges
    function initLayoutChallenges() {
        const challenges = document.querySelectorAll('.layout-challenge');
        
        challenges.forEach(challenge => {
            const checkButton = challenge.querySelector('.check-solution');
            const userContainer = challenge.querySelector('.user-solution');
            const targetContainer = challenge.querySelector('.target-solution');

            checkButton.addEventListener('click', () => {
                const isCorrect = compareLayouts(userContainer, targetContainer);
                showResult(challenge, isCorrect);
            });
        });
    }

    // Helper Functions
    function compareLayouts(userContainer, targetContainer) {
        const userElements = userContainer.children;
        const targetElements = targetContainer.children;

        if (userElements.length !== targetElements.length) return false;

        for (let i = 0; i < userElements.length; i++) {
            const userStyle = window.getComputedStyle(userElements[i]);
            const targetStyle = window.getComputedStyle(targetElements[i]);
            
            const properties = [
                'display', 'position', 'float', 'clear',
                'margin', 'padding', 'border',
                'width', 'height'
            ];

            for (const prop of properties) {
                if (userStyle[prop] !== targetStyle[prop]) return false;
            }
        }

        return true;
    }

    function showResult(challenge, correct) {
        const resultDiv = challenge.querySelector('.result');
        resultDiv.textContent = correct ? '✅ Perfect layout!' : '❌ Not quite right. Try again!';
        resultDiv.className = `result ${correct ? 'success' : 'error'}`;
        
        if (correct) {
            challenge.classList.add('completed');
            updateProgress();
        }
    }

    function updateProgress() {
        const total = document.querySelectorAll('.layout-challenge').length;
        const completed = document.querySelectorAll('.layout-challenge.completed').length;
        const progress = (completed / total) * 100;

        const progressBar = document.getElementById('lesson-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Initialize all components
    initBoxModelDemo();
    initDisplayDemo();
    initPositionDemo();
    initFloatDemo();
    initLayoutChallenges();
});
