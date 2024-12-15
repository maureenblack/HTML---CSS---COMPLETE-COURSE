// Lesson 6: Animations & Effects
document.addEventListener('DOMContentLoaded', () => {
    // Transition Demo
    function initTransitionDemo() {
        const demoElement = document.querySelector('.transition-demo .demo-element');
        const controls = {
            property: document.getElementById('transition-property'),
            duration: document.getElementById('transition-duration'),
            timing: document.getElementById('transition-timing'),
            delay: document.getElementById('transition-delay')
        };

        // Property toggles
        const propertyToggles = document.querySelectorAll('.property-toggle');
        propertyToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const property = toggle.dataset.property;
                const value = toggle.dataset.value;
                demoElement.style[property] = demoElement.style[property] === value ? '' : value;
            });
        });

        // Update transition properties
        Object.entries(controls).forEach(([property, control]) => {
            if (!control) return;

            control.addEventListener('change', () => {
                const value = control.value;
                if (property === 'duration' || property === 'delay') {
                    demoElement.style[`transition${property.charAt(0).toUpperCase() + property.slice(1)}`] = 
                        value + 's';
                } else {
                    demoElement.style[`transition${property.charAt(0).toUpperCase() + property.slice(1)}`] = value;
                }
                updateTransitionCode();
            });
        });

        function updateTransitionCode() {
            const codePreview = document.getElementById('transition-code');
            const style = window.getComputedStyle(demoElement);
            
            const code = `.demo-element {
    transition-property: ${style.transitionProperty};
    transition-duration: ${style.transitionDuration};
    transition-timing-function: ${style.transitionTimingFunction};
    transition-delay: ${style.transitionDelay};
}`;

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Animation Demo
    function initAnimationDemo() {
        const demoElement = document.querySelector('.animation-demo .demo-element');
        const controls = {
            name: document.getElementById('animation-name'),
            duration: document.getElementById('animation-duration'),
            timing: document.getElementById('animation-timing'),
            delay: document.getElementById('animation-delay'),
            iteration: document.getElementById('animation-iteration'),
            direction: document.getElementById('animation-direction'),
            fillMode: document.getElementById('animation-fill-mode')
        };

        // Predefined animations
        const animations = {
            bounce: `@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-50px); }
}`,
            rotate: `@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}`,
            pulse: `@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}`,
            shake: `@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}`
        };

        // Update animation properties
        Object.entries(controls).forEach(([property, control]) => {
            if (!control) return;

            control.addEventListener('change', () => {
                const value = control.value;
                if (property === 'duration' || property === 'delay') {
                    demoElement.style[`animation${property.charAt(0).toUpperCase() + property.slice(1)}`] = 
                        value + 's';
                } else {
                    demoElement.style[`animation${property.charAt(0).toUpperCase() + property.slice(1)}`] = value;
                }
                updateAnimationCode();
            });
        });

        function updateAnimationCode() {
            const codePreview = document.getElementById('animation-code');
            const style = window.getComputedStyle(demoElement);
            
            let code = animations[controls.name.value] + '\n\n';
            code += `.demo-element {
    animation-name: ${style.animationName};
    animation-duration: ${style.animationDuration};
    animation-timing-function: ${style.animationTimingFunction};
    animation-delay: ${style.animationDelay};
    animation-iteration-count: ${style.animationIterationCount};
    animation-direction: ${style.animationDirection};
    animation-fill-mode: ${style.animationFillMode};
}`;

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Transform Demo
    function initTransformDemo() {
        const demoElement = document.querySelector('.transform-demo .demo-element');
        const controls = {
            translate: {
                x: document.getElementById('translate-x'),
                y: document.getElementById('translate-y')
            },
            rotate: document.getElementById('rotate'),
            scale: {
                x: document.getElementById('scale-x'),
                y: document.getElementById('scale-y')
            },
            skew: {
                x: document.getElementById('skew-x'),
                y: document.getElementById('skew-y')
            }
        };

        function updateTransform() {
            const transforms = [];

            // Translate
            const tx = controls.translate.x.value;
            const ty = controls.translate.y.value;
            if (tx !== '0' || ty !== '0') {
                transforms.push(`translate(${tx}px, ${ty}px)`);
            }

            // Rotate
            const rotate = controls.rotate.value;
            if (rotate !== '0') {
                transforms.push(`rotate(${rotate}deg)`);
            }

            // Scale
            const sx = controls.scale.x.value;
            const sy = controls.scale.y.value;
            if (sx !== '1' || sy !== '1') {
                transforms.push(`scale(${sx}, ${sy})`);
            }

            // Skew
            const skx = controls.skew.x.value;
            const sky = controls.skew.y.value;
            if (skx !== '0' || sky !== '0') {
                transforms.push(`skew(${skx}deg, ${sky}deg)`);
            }

            demoElement.style.transform = transforms.join(' ');
            updateTransformCode();
        }

        // Add event listeners to all controls
        Object.values(controls).forEach(control => {
            if (control instanceof HTMLElement) {
                control.addEventListener('input', updateTransform);
            } else {
                Object.values(control).forEach(subControl => {
                    subControl.addEventListener('input', updateTransform);
                });
            }
        });

        function updateTransformCode() {
            const codePreview = document.getElementById('transform-code');
            const style = window.getComputedStyle(demoElement);
            
            const code = `.demo-element {
    transform: ${style.transform};
}`;

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Animation Challenges
    function initAnimationChallenges() {
        const challenges = document.querySelectorAll('.animation-challenge');
        
        challenges.forEach(challenge => {
            const checkButton = challenge.querySelector('.check-solution');
            const userSolution = challenge.querySelector('.user-solution');
            const targetSolution = challenge.querySelector('.target-solution');

            checkButton.addEventListener('click', () => {
                const isCorrect = compareAnimations(userSolution, targetSolution);
                showResult(challenge, isCorrect);
            });
        });
    }

    // Helper Functions
    function compareAnimations(userElement, targetElement) {
        const userStyle = window.getComputedStyle(userElement);
        const targetStyle = window.getComputedStyle(targetElement);
        
        const properties = [
            'animation', 'transform',
            'transition', 'transitionProperty',
            'transitionDuration', 'transitionTimingFunction'
        ];

        for (const prop of properties) {
            if (userStyle[prop] !== targetStyle[prop]) return false;
        }

        return true;
    }

    function showResult(challenge, correct) {
        const resultDiv = challenge.querySelector('.result');
        resultDiv.textContent = correct ? 
            '✅ Perfect animation!' : 
            '❌ Not quite right. Check your timing and properties';
        resultDiv.className = `result ${correct ? 'success' : 'error'}`;
        
        if (correct) {
            challenge.classList.add('completed');
            updateProgress();
        }
    }

    function updateProgress() {
        const total = document.querySelectorAll('.animation-challenge').length;
        const completed = document.querySelectorAll('.animation-challenge.completed').length;
        const progress = (completed / total) * 100;

        const progressBar = document.getElementById('lesson-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Initialize all components
    initTransitionDemo();
    initAnimationDemo();
    initTransformDemo();
    initAnimationChallenges();
});
