// Course interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Code editor functionality
    const codeInput = document.getElementById('code-input');
    const preview = document.getElementById('preview');
    const runButton = document.getElementById('run-code');
    
    function updatePreview() {
        if (!codeInput || !preview) return;
        
        try {
            const previewDocument = preview.contentDocument || preview.contentWindow.document;
            previewDocument.open();
            const cleanCode = codeInput.value.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/g, '');
            previewDocument.write(cleanCode);
            previewDocument.close();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Set up initial code based on lesson
    if (codeInput) {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('lesson1.html')) {
            codeInput.value = `<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
</head>
<body>
    <!-- Add your introduction here! -->
    
</body>
</html>`;
        } 
        else if (currentPath.includes('lesson2.html')) {
            codeInput.value = `<!DOCTYPE html>
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
</html>`;
        }
        else if (currentPath.includes('lesson3.html')) {
            codeInput.value = `<!DOCTYPE html>
<html>
<head>
    <title>My Gallery</title>
</head>
<body>
    <h1>My Photo Gallery</h1>
    <!-- Add your images and links here -->
    
</body>
</html>`;
        }

        // Set up run button
        if (runButton) {
            runButton.addEventListener('click', updatePreview);
        }

        // Initial preview
        updatePreview();
    }

    // Track progress
    function saveProgress() {
        const currentLesson = document.location.pathname;
        localStorage.setItem('lastLesson', currentLesson);
    }

    function updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        const totalLessons = 6;
        const currentLesson = parseInt(document.location.pathname.match(/\d+/) || [0]);
        const progress = (currentLesson / totalLessons) * 100;
        progressBar.style.width = progress + '%';
    }

    // Initialize progress tracking
    saveProgress();
    updateProgress();
});
