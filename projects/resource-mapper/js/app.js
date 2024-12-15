// UI Controls and Form Handling
function handleResourceSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('resourceName').value;
    const type = document.getElementById('resourceType').value;
    const description = document.getElementById('resourceDescription').value;

    addResourceToList({ name, type, description });
    event.target.reset();
}

function addResourceToList(resource) {
    const resourceList = document.getElementById('resourceList');
    const resourceElement = document.createElement('div');
    resourceElement.className = 'resource-item';
    resourceElement.innerHTML = `
        <h4>${resource.name}</h4>
        <p class="resource-type">${resource.type}</p>
        <p class="resource-description">${resource.description}</p>
    `;
    resourceList.appendChild(resourceElement);
}

function toggleHelpMenu() {
    const helpMenu = document.querySelector('.help-menu');
    helpMenu.classList.toggle('show');
}

function bookSession() {
    window.open('https://calendly.com/contact-giiyo', '_blank');
}

function showDiscussion() {
    alert('Discussion forum coming soon!');
}

function showResources() {
    alert('Additional resources coming soon!');
}

// Navigation
function prevStep() {
    const currentStep = getCurrentStep();
    if (currentStep > 1) {
        jumpToStep(currentStep - 1);
    }
    updateNavButtons();
}

function nextStep() {
    const currentStep = getCurrentStep();
    if (currentStep < getTotalSteps()) {
        jumpToStep(currentStep + 1);
    }
    updateNavButtons();
}

function getCurrentStep() {
    // Implement step tracking logic
    return 1;
}

function getTotalSteps() {
    return 5; // Total number of steps in the project
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentStep = getCurrentStep();

    prevBtn.disabled = currentStep === 1;
    nextBtn.disabled = currentStep === getTotalSteps();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateNavButtons();
});
