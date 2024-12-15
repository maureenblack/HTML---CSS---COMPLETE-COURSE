// Course interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Code editor functionality
    const codeEditors = document.querySelectorAll('.code-editor');
    
    codeEditors.forEach(editor => {
        const codeArea = editor.querySelector('.code-area');
        const runButton = editor.querySelector('.run-code');
        const checkButton = editor.querySelector('.check-answer');
        const previewArea = editor.nextElementSibling?.querySelector('.preview-area') || 
                           editor.nextElementSibling?.querySelector('.preview-window') ||
                           document.getElementById('preview');

        // Function to update the preview iframe with the code from the textarea
        function updatePreview() {
            const codeInput = codeArea;
            const preview = previewArea;
            
            if (codeInput && preview) {
                if (preview instanceof HTMLIFrameElement) {
                    const previewDocument = preview.contentDocument || preview.contentWindow.document;
                    previewDocument.open();
                    previewDocument.write(codeInput.value);
                    previewDocument.close();
                } else {
                    preview.innerHTML = codeInput.value;
                }
            }
        }

        if (runButton && previewArea) {
            updatePreview(); // Initial preview
            runButton.addEventListener('click', () => {
                try {
                    updatePreview();
                    
                    // Add success animation
                    runButton.textContent = 'Code Running! ';
                    setTimeout(() => {
                        runButton.textContent = 'Run Code ';
                    }, 1000);
                } catch (error) {
                    console.error('Error running code:', error);
                    runButton.textContent = 'Error! Try Again ';
                    setTimeout(() => {
                        runButton.textContent = 'Run Code ';
                    }, 1000);
                }
            });
        }

        if (checkButton) {
            checkButton.addEventListener('click', () => {
                const code = codeArea.textContent.toLowerCase();
                let correct = true;
                
                // Basic checks for required elements
                if (!code.includes('<h1>')) {
                    correct = false;
                }
                if (!code.includes('<p>')) {
                    correct = false;
                }
                if (!code.includes('<h2>') && !code.includes('<h3>')) {
                    correct = false;
                }

                // Show result
                checkButton.textContent = correct ? 'Great Job! ' : 'Try Again! ';
                checkButton.style.background = correct ? '#00BF63' : '#9C2B36';
                
                setTimeout(() => {
                    checkButton.textContent = 'Check My Code ';
                    checkButton.style.background = '';
                }, 2000);
            });
        }

        // Make code area behave better
        if (codeArea) {
            codeArea.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    document.execCommand('insertText', false, '    ');
                }
            });
        }
    });

    // Track progress
    const saveProgress = () => {
        const currentLesson = document.location.pathname;
        localStorage.setItem('currentLesson', currentLesson);
    };

    // Update progress bar
    const updateProgress = () => {
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            const currentWidth = progressBar.style.width;
            progressBar.style.width = currentWidth;
        }
    };

    // Initialize
    saveProgress();
    updateProgress();
});
