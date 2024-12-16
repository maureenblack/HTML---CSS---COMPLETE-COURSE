// Function to run code in the "Try it Yourself" editors
function runCode() {
    const editor = document.querySelector('.code-editor');
    const preview = document.querySelector('.preview-frame');
    
    if (editor && preview) {
        const code = editor.value;
        const previewDoc = preview.contentDocument || preview.contentWindow.document;
        previewDoc.open();
        previewDoc.write(code);
        previewDoc.close();
    }
}

// Initialize all code editors
function initializeEditors() {
    const runButtons = document.querySelectorAll('.run-code');
    runButtons.forEach(button => {
        button.addEventListener('click', runCode);
    });
}

// Function to handle quiz start
function startQuiz() {
    // This function is just for the button animation
    // The actual quiz functionality is in quiz-scripts.js
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    initializeEditors();
});
