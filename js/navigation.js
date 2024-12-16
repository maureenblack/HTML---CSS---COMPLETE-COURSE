document.addEventListener('DOMContentLoaded', function() {
    // Get current page URL
    const currentPage = window.location.pathname;

    // Add active class to navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        if (button.getAttribute('href').includes(currentPage)) {
            button.classList.add('active');
        }
    });

    // Add active class to lesson cards
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach(card => {
        if (card.getAttribute('href') === currentPage) {
            card.classList.add('active');
        }
    });

    // Add active class to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (card.getAttribute('href') === currentPage) {
            card.classList.add('active');
        }
    });
});
