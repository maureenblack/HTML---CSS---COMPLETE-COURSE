// Lesson 4: Flexbox & Grid
document.addEventListener('DOMContentLoaded', () => {
    // Flexbox Interactive Demo
    function initFlexboxDemo() {
        const container = document.querySelector('.flexbox-container');
        const controls = {
            direction: document.getElementById('flex-direction'),
            justifyContent: document.getElementById('justify-content'),
            alignItems: document.getElementById('align-items'),
            flexWrap: document.getElementById('flex-wrap'),
            gap: document.getElementById('flex-gap')
        };

        Object.entries(controls).forEach(([property, control]) => {
            if (!control) return;

            control.addEventListener('change', () => {
                const value = control.value;
                if (property === 'gap') {
                    container.style.gap = value + 'px';
                } else {
                    container.style[property] = value;
                }
                updateFlexboxCode();
            });
        });

        // Item Controls
        const itemControls = document.querySelectorAll('.flex-item-control');
        itemControls.forEach(control => {
            control.addEventListener('change', (e) => {
                const item = document.querySelector(`[data-item="${e.target.dataset.item}"]`);
                const property = e.target.dataset.property;
                const value = e.target.value;
                item.style[property] = value;
                updateFlexboxCode();
            });
        });

        function updateFlexboxCode() {
            const codePreview = document.getElementById('flexbox-code');
            const containerStyle = window.getComputedStyle(container);
            
            let code = `.flexbox-container {
    display: flex;
    flex-direction: ${containerStyle.flexDirection};
    justify-content: ${containerStyle.justifyContent};
    align-items: ${containerStyle.alignItems};
    flex-wrap: ${containerStyle.flexWrap};
    gap: ${containerStyle.gap};
}\n\n`;

            // Add styles for flex items
            document.querySelectorAll('.flex-item').forEach((item, index) => {
                const itemStyle = window.getComputedStyle(item);
                code += `.flex-item:nth-child(${index + 1}) {
    flex-grow: ${itemStyle.flexGrow};
    flex-shrink: ${itemStyle.flexShrink};
    flex-basis: ${itemStyle.flexBasis};
    align-self: ${itemStyle.alignSelf};
}\n`;
            });

            codePreview.textContent = code;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        }
    }

    // Grid Interactive Demo
    function initGridDemo() {
        const container = document.querySelector('.grid-container');
        const controls = {
            templateColumns: document.getElementById('grid-template-columns'),
            templateRows: document.getElementById('grid-template-rows'),
            gap: document.getElementById('grid-gap'),
            justifyItems: document.getElementById('justify-items'),
            alignItems: document.getElementById('align-items')
        };

        Object.entries(controls).forEach(([property, control]) => {
            if (!control) return;

            control.addEventListener('change', () => {
                const value = control.value;
                if (property === 'gap') {
                    container.style.gap = value + 'px';
                } else if (property.includes('template')) {
                    container.style[`grid${property.charAt(0).toUpperCase() + property.slice(1)}`] = value;
                } else {
                    container.style[property] = value;
                }
                updateGridCode();
            });
        });

        // Item Controls
        const itemControls = document.querySelectorAll('.grid-item-control');
        itemControls.forEach(control => {
            control.addEventListener('change', (e) => {
                const item = document.querySelector(`[data-grid-item="${e.target.dataset.item}"]`);
                const property = e.target.dataset.property;
                const value = e.target.value;
                item.style[property] = value;
                updateGridCode();
            });
        });

        function updateGridCode() {
            const codePreview = document.getElementById('grid-code');
            const containerStyle = window.getComputedStyle(container);
            
            let code = `.grid-container {
    display: grid;
    grid-template-columns: ${containerStyle.gridTemplateColumns};
    grid-template-rows: ${containerStyle.gridTemplateRows};
    gap: ${containerStyle.gap};
    justify-items: ${containerStyle.justifyItems};
    align-items: ${containerStyle.alignItems};
}\n\n`;

            // Add styles for grid items
            document.querySelectorAll('.grid-item').forEach((item, index) => {
                const itemStyle = window.getComputedStyle(item);
                if (itemStyle.gridArea !== 'auto / auto / auto / auto') {
                    code += `.grid-item:nth-child(${index + 1}) {
    grid-column: ${itemStyle.gridColumn};
    grid-row: ${itemStyle.gridRow};
    justify-self: ${itemStyle.justifySelf};
    align-self: ${itemStyle.alignSelf};
}\n`;
                }
            });

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
            const userSolution = challenge.querySelector('.user-solution');
            const targetSolution = challenge.querySelector('.target-solution');

            checkButton.addEventListener('click', () => {
                const isCorrect = compareLayouts(userSolution, targetSolution);
                showResult(challenge, isCorrect);
            });
        });
    }

    // Common Layout Patterns Demo
    function initLayoutPatterns() {
        const patternSelect = document.getElementById('pattern-select');
        const patternDemo = document.querySelector('.pattern-demo');
        const codePreview = document.getElementById('pattern-code');

        const patterns = {
            'holy-grail': {
                html: `<header>Header</header>
<div class="content">
    <nav>Navigation</nav>
    <main>Main Content</main>
    <aside>Sidebar</aside>
</div>
<footer>Footer</footer>`,
                css: `.holy-grail {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.content {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 1rem;
}`
            },
            'card-grid': {
                html: `<div class="card-grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <!-- More cards -->
</div>`,
                css: `.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}`
            },
            'sidebar': {
                html: `<div class="sidebar-layout">
    <aside>Sidebar</aside>
    <main>Main Content</main>
</div>`,
                css: `.sidebar-layout {
    display: flex;
    gap: 1rem;
}

aside {
    flex: 0 0 250px;
}

main {
    flex: 1;
}`
            }
        };

        patternSelect.addEventListener('change', () => {
            const pattern = patterns[patternSelect.value];
            patternDemo.innerHTML = pattern.html;
            codePreview.textContent = pattern.css;
            if (window.Prism) {
                Prism.highlightElement(codePreview);
            }
        });
    }

    // Helper Functions
    function compareLayouts(userLayout, targetLayout) {
        const userStyle = window.getComputedStyle(userLayout);
        const targetStyle = window.getComputedStyle(targetLayout);
        
        const properties = [
            'display', 'grid-template-columns', 'grid-template-rows',
            'flex-direction', 'justify-content', 'align-items',
            'gap', 'grid-gap'
        ];

        for (const prop of properties) {
            if (userStyle[prop] !== targetStyle[prop]) return false;
        }

        // Compare children
        const userChildren = userLayout.children;
        const targetChildren = targetLayout.children;

        if (userChildren.length !== targetChildren.length) return false;

        for (let i = 0; i < userChildren.length; i++) {
            const userChildStyle = window.getComputedStyle(userChildren[i]);
            const targetChildStyle = window.getComputedStyle(targetChildren[i]);
            
            const childProperties = [
                'grid-column', 'grid-row', 'flex', 'align-self', 'justify-self'
            ];

            for (const prop of childProperties) {
                if (userChildStyle[prop] !== targetChildStyle[prop]) return false;
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
    initFlexboxDemo();
    initGridDemo();
    initLayoutChallenges();
    initLayoutPatterns();
});
