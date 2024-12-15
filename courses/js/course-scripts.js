// Course interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Code editor functionality
    const codeInput = document.getElementById('code-input');
    const preview = document.getElementById('preview');
    const runButton = document.getElementById('run-code');
    const resetButton = document.getElementById('reset-code');
    const downloadButton = document.getElementById('download-code');
    const themeToggle = document.getElementById('theme-toggle');
    
    function updatePreview() {
        if (!codeInput || !preview) return;
        
        try {
            const previewDocument = preview.contentDocument || preview.contentWindow.document;
            previewDocument.open();
            const cleanCode = codeInput.value.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/g, '');
            previewDocument.write(cleanCode);
            previewDocument.close();

            // Save to local storage
            localStorage.setItem('savedCode-' + getCurrentLesson(), codeInput.value);
            
            // Update validation status
            validateCode();
        } catch (error) {
            showError('Error updating preview: ' + error.message);
        }
    }

    // Code validation
    function validateCode() {
        if (!codeInput) return;

        const code = codeInput.value;
        const validationResult = document.getElementById('validation-result');
        if (!validationResult) return;

        // Basic HTML validation
        const errors = [];
        
        // Check for matching tags
        const openTags = code.match(/<[^/][^>]*>/g) || [];
        const closeTags = code.match(/<\/[^>]+>/g) || [];
        
        if (openTags.length !== closeTags.length) {
            errors.push('Mismatched HTML tags');
        }

        // Check for required elements based on lesson
        const currentLesson = getCurrentLesson();
        const requiredElements = getRequiredElements(currentLesson);
        
        requiredElements.forEach(element => {
            const regex = new RegExp(`<${element}[^>]*>`, 'i');
            if (!regex.test(code)) {
                errors.push(`Missing required element: ${element}`);
            }
        });

        // Display validation results
        if (errors.length === 0) {
            validationResult.innerHTML = '✅ Code looks good!';
            validationResult.className = 'validation-success';
        } else {
            validationResult.innerHTML = '❌ Found issues:<br>' + errors.join('<br>');
            validationResult.className = 'validation-error';
        }
    }

    // Get required elements based on lesson
    function getRequiredElements(lesson) {
        const requirements = {
            'lesson1': ['html', 'head', 'body'],
            'lesson2': ['html', 'head', 'body', 'h1', 'p'],
            'lesson3': ['html', 'head', 'body', 'img', 'a'],
            'lesson4': ['html', 'head', 'body', 'form'],
            'lesson5': ['html', 'head', 'body', 'table'],
            'lesson6': ['html', 'head', 'body', 'video', 'audio']
        };
        return requirements[lesson] || [];
    }

    // Set up initial code based on lesson
    if (codeInput) {
        const currentLesson = getCurrentLesson();
        const savedCode = localStorage.getItem('savedCode-' + currentLesson);
        
        if (savedCode) {
            codeInput.value = savedCode;
        } else {
            // Default starter code
            const starterCode = getStarterCode(currentLesson);
            codeInput.value = starterCode;
        }

        // Set up buttons
        if (runButton) {
            runButton.addEventListener('click', updatePreview);
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Reset code to default?')) {
                    codeInput.value = getStarterCode(currentLesson);
                    updatePreview();
                }
            });
        }

        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                const blob = new Blob([codeInput.value], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${currentLesson}.html`;
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }

        // Initial preview
        updatePreview();
    }

    // Theme toggle
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }

    // Progress tracking
    function saveProgress() {
        const currentLesson = getCurrentLesson();
        const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        
        progress[currentLesson] = {
            completed: true,
            timestamp: new Date().toISOString(),
            code: codeInput ? codeInput.value : null
        };

        localStorage.setItem('courseProgress', JSON.stringify(progress));
        localStorage.setItem('lastLesson', currentLesson);
        updateProgressUI();
    }

    function updateProgressUI() {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        if (!progressBar || !progressText) return;
        
        const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        const totalLessons = 6;
        const completedLessons = Object.keys(progress).length;
        const percentage = (completedLessons / totalLessons) * 100;
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = `${completedLessons}/${totalLessons} lessons completed`;

        // Update navigation hints
        updateNavigationHints(completedLessons);
    }

    function updateNavigationHints(completedLessons) {
        const nextLesson = document.querySelector('.next-lesson');
        const prevLesson = document.querySelector('.prev-lesson');
        
        if (nextLesson) {
            const currentNumber = parseInt(getCurrentLesson().replace('lesson', ''));
            if (currentNumber < 6) {
                nextLesson.href = `lesson${currentNumber + 1}.html`;
                nextLesson.style.display = 'block';
            } else {
                nextLesson.style.display = 'none';
            }
        }

        if (prevLesson) {
            const currentNumber = parseInt(getCurrentLesson().replace('lesson', ''));
            if (currentNumber > 1) {
                prevLesson.href = `lesson${currentNumber - 1}.html`;
                prevLesson.style.display = 'block';
            } else {
                prevLesson.style.display = 'none';
            }
        }
    }

    // Helper functions
    function getCurrentLesson() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/);
        return match ? 'lesson' + match[1] : 'lesson1';
    }

    function getStarterCode(lesson) {
        const starterCodes = {
            'lesson1': `<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
</head>
<body>
    <!-- Add your introduction here! -->
    
</body>
</html>`,
            'lesson2': `<!DOCTYPE html>
<html>
<head>
    <title>My Content Page</title>
</head>
<body>
    <!-- Try adding:
    - A heading (h1)
    - A paragraph (p)
    - A list (ul, li) -->
    
</body>
</html>`,
            'lesson3': `<!DOCTYPE html>
<html>
<head>
    <title>My Gallery</title>
</head>
<body>
    <h1>My Photo Gallery</h1>
    <!-- Add your images and links here -->
    
</body>
</html>`,
            'lesson4': `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <!-- Create your form here -->
    
</body>
</html>`,
            'lesson5': `<!DOCTYPE html>
<html>
<head>
    <title>Data Table</title>
</head>
<body>
    <h1>Student Grades</h1>
    <!-- Create your table here -->
    
</body>
</html>`,
            'lesson6': `<!DOCTYPE html>
<html>
<head>
    <title>Media Player</title>
</head>
<body>
    <h1>My Media Player</h1>
    <!-- Add video and audio elements -->
    
</body>
</html>`
        };
        return starterCodes[lesson] || starterCodes['lesson1'];
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (runButton) runButton.click();
        }
        
        // Ctrl/Cmd + S to save progress
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveProgress();
        }
    });

    // Auto-save code periodically
    let autoSaveInterval = setInterval(() => {
        if (codeInput && codeInput.value) {
            localStorage.setItem('savedCode-' + getCurrentLesson(), codeInput.value);
        }
    }, 30000); // Auto-save every 30 seconds

    // Initialize
    updateProgressUI();

    // Cleanup
    window.addEventListener('beforeunload', () => {
        clearInterval(autoSaveInterval);
    });
});
