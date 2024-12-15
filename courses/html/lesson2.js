// Quiz questions for Lesson 2
const quizQuestions = [
    {
        question: "Which tag is used for the largest heading?",
        options: ["<h6>", "<h1>", "<heading>", "<head>"],
        correct: 1
    },
    {
        question: "How do you create an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<unordered>"],
        correct: 2
    },
    {
        question: "Which tag makes text bold?",
        options: ["<bold>", "<b>", "<strong>", "<em>"],
        correct: 2
    },
    {
        question: "What tag should you use for a paragraph?",
        options: ["<paragraph>", "<text>", "<p>", "<para>"],
        correct: 2
    }
];

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('content-quiz');
    if (quizContainer) {
        new QuizSystem(quizContainer, quizQuestions);
    }
});
