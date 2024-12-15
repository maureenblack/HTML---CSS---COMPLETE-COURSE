// Lesson 5: Responsive Design
document.addEventListener('DOMContentLoaded', () => {
    // Viewport Size Display
    function initViewportDisplay() {
        const viewportDisplay = document.getElementById('viewport-size');
        
        function updateViewportSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            viewportDisplay.textContent = `Viewport: ${width}px × ${height}px`;

            // Update breakpoint indicator
            const breakpoints = {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                xxl: 1400
            };

            let currentBreakpoint = 'xs';
            Object.entries(breakpoints).forEach(([name, value]) => {
                if (width >= value) currentBreakpoint = name;
            });

            document.querySelectorAll('.breakpoint-indicator').forEach(indicator => {
                indicator.classList.toggle('active', 
                    indicator.dataset.breakpoint === currentBreakpoint);
            });
        }

        window.addEventListener('resize', updateViewportSize);
        updateViewportSize();
    }

    // Media Query Demo
    function initMediaQueryDemo() {
        const demoContainer = document.querySelector('.media-query-demo');
        const mediaQueryCode = document.getElementById('media-query-code');
        const customQuery = document.getElementById('custom-media-query');
        
        function updateMediaQueryCode() {
            const queries = [
                {
                    query: '(max-width: 576px)',
                    style: `
    .responsive-element {
        background: var(--red);
        font-size: 14px;
        padding: 10px;
    }`
                },
                {
                    query: '(min-width: 577px) and (max-width: 992px)',
                    style: `
    .responsive-element {
        background: var(--orange);
        font-size: 16px;
        padding: 15px;
    }`
                },
                {
                    query: '(min-width: 993px)',
                    style: `
    .responsive-element {
        background: var(--green);
        font-size: 18px;
        padding: 20px;
    }`
                }
            ];

            let code = '/* Responsive Design with Media Queries */\n';
            queries.forEach(({query, style}) => {
                code += `\n@media ${query} {${style}
}\n`;
            });

            mediaQueryCode.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(mediaQueryCode);
            }
        }

        // Custom Media Query Testing
        customQuery.addEventListener('input', () => {
            try {
                const mediaQuery = window.matchMedia(customQuery.value);
                const result = document.getElementById('query-result');
                result.textContent = mediaQuery.matches ? 'Matches!' : 'No match';
                result.className = `query-result ${mediaQuery.matches ? 'success' : 'error'}`;
            } catch (error) {
                const result = document.getElementById('query-result');
                result.textContent = 'Invalid query';
                result.className = 'query-result error';
            }
        });

        updateMediaQueryCode();
    }

    // Responsive Units Demo
    function initResponsiveUnitsDemo() {
        const unitDemos = document.querySelectorAll('.unit-demo');
        
        unitDemos.forEach(demo => {
            const control = demo.querySelector('input[type="range"]');
            const element = demo.querySelector('.demo-element');
            const valueDisplay = demo.querySelector('.value-display');
            
            control.addEventListener('input', () => {
                const value = control.value;
                const unit = demo.dataset.unit;
                element.style.fontSize = `${value}${unit}`;
                valueDisplay.textContent = `${value}${unit}`;
                updateUnitCode();
            });
        });

        function updateUnitCode() {
            const codePreview = document.getElementById('units-code');
            let code = '/* Responsive Units Example */\n';
            
            unitDemos.forEach(demo => {
                const element = demo.querySelector('.demo-element');
                const computedStyle = window.getComputedStyle(element);
                code += `\n.${demo.dataset.unit}-example {
    font-size: ${computedStyle.fontSize};
}\n`;
            });

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Responsive Images Demo
    function initResponsiveImagesDemo() {
        const imageContainer = document.querySelector('.responsive-image-demo');
        const srcsetCode = document.getElementById('srcset-code');
        const pictureCode = document.getElementById('picture-code');

        // Update code examples
        function updateImageCode() {
            const srcsetExample = `<img
    src="image-800w.jpg"
    srcset="image-400w.jpg 400w,
            image-800w.jpg 800w,
            image-1200w.jpg 1200w"
    sizes="(max-width: 400px) 100vw,
           (max-width: 800px) 80vw,
           1200px"
    alt="Responsive image example">`;

            const pictureExample = `<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture>`;

            srcsetCode.textContent = srcsetExample;
            pictureCode.textContent = pictureExample;

            if (window.Prism) {
                Prism.highlightElement(srcsetCode);
                Prism.highlightElement(pictureCode);
            }
        }

        updateImageCode();
    }

    // Mobile-First Design Challenge
    function initMobileFirstChallenge() {
        const challenges = document.querySelectorAll('.mobile-first-challenge');
        
        challenges.forEach(challenge => {
            const checkButton = challenge.querySelector('.check-solution');
            const userSolution = challenge.querySelector('.user-solution');
            const targetSolution = challenge.querySelector('.target-solution');

            // Test at different viewport sizes
            const viewportSizes = [320, 768, 1024, 1440];

            checkButton.addEventListener('click', () => {
                let isCorrect = true;

                viewportSizes.forEach(size => {
                    if (!compareStyles(userSolution, targetSolution, size)) {
                        isCorrect = false;
                    }
                });

                showResult(challenge, isCorrect);
            });
        });
    }

    // Helper Functions
    function compareStyles(userElement, targetElement, viewportWidth) {
        // Simulate viewport width
        const originalWidth = window.innerWidth;
        window.innerWidth = viewportWidth;
        window.dispatchEvent(new Event('resize'));

        const userStyle = window.getComputedStyle(userElement);
        const targetStyle = window.getComputedStyle(targetElement);

        const properties = [
            'width', 'max-width', 'margin', 'padding',
            'font-size', 'flex-direction', 'grid-template-columns'
        ];

        let matches = true;
        properties.forEach(prop => {
            if (userStyle[prop] !== targetStyle[prop]) {
                matches = false;
            }
        });

        // Restore original viewport width
        window.innerWidth = originalWidth;
        window.dispatchEvent(new Event('resize'));

        return matches;
    }

    function showResult(challenge, correct) {
        const resultDiv = challenge.querySelector('.result');
        resultDiv.textContent = correct ? 
            '✅ Perfect responsive design!' : 
            '❌ Check your media queries and mobile-first approach';
        resultDiv.className = `result ${correct ? 'success' : 'error'}`;
        
        if (correct) {
            challenge.classList.add('completed');
            updateProgress();
        }
    }

    function updateProgress() {
        const total = document.querySelectorAll('.mobile-first-challenge').length;
        const completed = document.querySelectorAll('.mobile-first-challenge.completed').length;
        const progress = (completed / total) * 100;

        const progressBar = document.getElementById('lesson-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Initialize all components
    initViewportDisplay();
    initMediaQueryDemo();
    initResponsiveUnitsDemo();
    initResponsiveImagesDemo();
    initMobileFirstChallenge();
});
