// Function to initialize code editors
function initializeCodeEditors() {
    const codeEditors = document.querySelectorAll('.code-editor');
    codeEditors.forEach((editor) => {
        const editorSection = editor.closest('.editor-section');
        const previewFrame = editor.closest('.code-playground').querySelector('.preview-frame');
        
        // Store original code for reset
        const originalCode = editor.value;
        
        // Create and add reset button if it doesn't exist
        if (!editorSection.querySelector('.reset-code')) {
            const resetButton = document.createElement('button');
            resetButton.className = 'reset-code';
            resetButton.textContent = '↺ Reset';
            resetButton.style.marginLeft = '10px';
            editorSection.querySelector('.run-code').after(resetButton);
            
            // Add reset functionality
            resetButton.addEventListener('click', () => {
                editor.value = originalCode;
                updatePreview(previewFrame, originalCode);
            });
        }
        
        // Add run button click handler
        const runButton = editorSection.querySelector('.run-code');
        runButton.addEventListener('click', () => {
            const code = editor.value;
            updatePreview(previewFrame, code);
        });

        // Set up iframe
        previewFrame.sandbox = 'allow-same-origin';
        
        // Initial preview
        updatePreview(previewFrame, editor.value);
    });
}

function updatePreview(iframe, code) {
    try {
        // Create a new document in the iframe
        const preview = iframe.contentWindow || iframe.contentDocument;
        const doc = preview.document || preview;
        
        // Write content to iframe without allowing scripts
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        padding: 15px; 
                        margin: 0;
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>${code}</body>
            </html>
        `);
        doc.close();
    } catch (error) {
        console.error('Error updating preview:', error);
        iframe.contentDocument.body.innerHTML = '<p style="color: red;">Error previewing code. Please try again.</p>';
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeEditors);
} else {
    initializeCodeEditors();
}
