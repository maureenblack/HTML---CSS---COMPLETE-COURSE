// Quiz questions for Lesson 3
const quizQuestions = [
    {
        question: "Which HTML tag is used to create a link?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "What attribute specifies the destination of a link?",
        options: ["src", "href", "link", "to"],
        correct: 1
    },
    {
        question: "Which attribute is required for the <img> tag?",
        options: ["href", "src", "link", "url"],
        correct: 1
    },
    {
        question: "What's the purpose of the 'alt' attribute in an image tag?",
        options: [
            "To make the image load faster",
            "To provide alternative text when the image can't be displayed",
            "To specify the image size",
            "To add a border to the image"
        ],
        correct: 1
    }
];

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('links-quiz');
    if (quizContainer) {
        new QuizSystem(quizContainer, quizQuestions);
    }
});
