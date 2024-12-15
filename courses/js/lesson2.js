// Lesson 2: Colors & Typography
document.addEventListener('DOMContentLoaded', () => {
    // Color Picker Demo
    function initColorPicker() {
        const colorPickers = document.querySelectorAll('.color-picker');
        const previewElement = document.querySelector('.color-preview');

        colorPickers.forEach(picker => {
            picker.addEventListener('input', (e) => {
                const property = e.target.dataset.property;
                previewElement.style[property] = e.target.value;
                
                // Update color code display
                const codeDisplay = document.querySelector(`[data-color-code="${property}"]`);
                if (codeDisplay) {
                    codeDisplay.textContent = e.target.value;
                }
            });
        });
    }

    // Color Scheme Generator
    function initColorSchemeGenerator() {
        const baseColorInput = document.getElementById('base-color');
        const schemeType = document.getElementById('scheme-type');
        const schemeOutput = document.getElementById('color-scheme');

        function generateScheme() {
            const baseColor = baseColorInput.value;
            const type = schemeType.value;
            
            // Convert hex to HSL for easier manipulation
            const hsl = hexToHSL(baseColor);
            let colors = [];

            switch(type) {
                case 'monochromatic':
                    colors = generateMonochromatic(hsl);
                    break;
                case 'complementary':
                    colors = generateComplementary(hsl);
                    break;
                case 'analogous':
                    colors = generateAnalogous(hsl);
                    break;
            }

            displayColorScheme(colors);
        }

        baseColorInput.addEventListener('input', generateScheme);
        schemeType.addEventListener('change', generateScheme);
    }

    // Typography Playground
    function initTypographyPlayground() {
        const controls = document.querySelectorAll('.typography-control');
        const preview = document.querySelector('.typography-preview');

        controls.forEach(control => {
            control.addEventListener('input', (e) => {
                const property = e.target.dataset.property;
                const value = e.target.value + (e.target.dataset.unit || '');
                preview.style[property] = value;

                // Update CSS code display
                updateTypographyCode();
            });
        });
    }

    // Font Pairing Demo
    function initFontPairing() {
        const headingFont = document.getElementById('heading-font');
        const bodyFont = document.getElementById('body-font');
        const preview = document.querySelector('.font-pairing-preview');

        function updateFonts() {
            const heading = preview.querySelector('h2');
            const paragraph = preview.querySelector('p');

            heading.style.fontFamily = headingFont.value;
            paragraph.style.fontFamily = bodyFont.value;

            // Load fonts if using Google Fonts
            loadGoogleFont(headingFont.value);
            loadGoogleFont(bodyFont.value);
        }

        headingFont.addEventListener('change', updateFonts);
        bodyFont.addEventListener('change', updateFonts);
    }

    // Interactive Exercises
    function initExercises() {
        const exercises = document.querySelectorAll('.typography-exercise');
        
        exercises.forEach(exercise => {
            const checkButton = exercise.querySelector('.check-answer');
            const userInput = exercise.querySelector('.user-input');
            const target = exercise.querySelector('.target-text');

            checkButton.addEventListener('click', () => {
                const userStyles = window.getComputedStyle(userInput);
                const targetStyles = window.getComputedStyle(target);
                const properties = ['font-family', 'font-size', 'font-weight', 'line-height'];

                let correct = true;
                properties.forEach(prop => {
                    if (userStyles[prop] !== targetStyles[prop]) {
                        correct = false;
                    }
                });

                showResult(exercise, correct);
            });
        });
    }

    // Helper Functions
    function hexToHSL(hex) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.slice(1,3), 16);
            g = parseInt(hex.slice(3,5), 16);
            b = parseInt(hex.slice(5,7), 16);
        }

        // Convert RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function HSLToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return `#${[255 * f(0), 255 * f(8), 255 * f(4)]
            .map(x => Math.round(x).toString(16).padStart(2, '0'))
            .join('')}`;
    }

    function generateMonochromatic(hsl) {
        return [
            HSLToHex(hsl.h, hsl.s, hsl.l),
            HSLToHex(hsl.h, hsl.s, hsl.l + 20),
            HSLToHex(hsl.h, hsl.s - 20, hsl.l),
            HSLToHex(hsl.h, hsl.s, hsl.l - 20),
            HSLToHex(hsl.h, hsl.s + 20, hsl.l)
        ];
    }

    function generateComplementary(hsl) {
        return [
            HSLToHex(hsl.h, hsl.s, hsl.l),
            HSLToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
            HSLToHex(hsl.h, hsl.s, hsl.l + 20),
            HSLToHex((hsl.h + 180) % 360, hsl.s, hsl.l + 20),
            HSLToHex(hsl.h, hsl.s, hsl.l - 20)
        ];
    }

    function generateAnalogous(hsl) {
        return [
            HSLToHex(hsl.h, hsl.s, hsl.l),
            HSLToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
            HSLToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
            HSLToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
            HSLToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l)
        ];
    }

    function displayColorScheme(colors) {
        const schemeOutput = document.getElementById('color-scheme');
        schemeOutput.innerHTML = '';

        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.setAttribute('data-color', color);
            
            swatch.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                showMessage('Color code copied!', 'success');
            });

            schemeOutput.appendChild(swatch);
        });
    }

    function loadGoogleFont(fontName) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    function updateTypographyCode() {
        const preview = document.querySelector('.typography-preview');
        const codeDisplay = document.getElementById('typography-code');
        const style = window.getComputedStyle(preview);
        const properties = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'];

        let code = '.typography-preview {\n';
        properties.forEach(prop => {
            code += `    ${prop}: ${style[prop]};\n`;
        });
        code += '}';

        codeDisplay.textContent = code;
        if (window.Prism) {
            Prism.highlightElement(codeDisplay);
        }
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    function showResult(exercise, correct) {
        const resultDiv = exercise.querySelector('.result');
        resultDiv.textContent = correct ? '✅ Correct!' : '❌ Try again';
        resultDiv.className = `result ${correct ? 'success' : 'error'}`;
        
        if (correct) {
            exercise.classList.add('completed');
            updateProgress();
        }
    }

    function updateProgress() {
        const total = document.querySelectorAll('.typography-exercise').length;
        const completed = document.querySelectorAll('.typography-exercise.completed').length;
        const progress = (completed / total) * 100;

        const progressBar = document.getElementById('lesson-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Initialize all components
    initColorPicker();
    initColorSchemeGenerator();
    initTypographyPlayground();
    initFontPairing();
    initExercises();
});
