// Quiz questions for Lesson 1
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyper Text Modern Links"
        ],
        correct: 0
    },
    {
        question: "Which tag is used to define the main content of an HTML document?",
        options: ["<content>", "<main>", "<body>", "<doc>"],
        correct: 2
    },
    {
        question: "What is the correct way to close an HTML tag?",
        options: ["</tag>", "<tag/>", "<end tag>", "<tag>"],
        correct: 0
    },
    {
        question: "Which part of the HTML document contains information about the page, like its title?",
        options: ["<body>", "<meta>", "<head>", "<info>"],
        correct: 2
    }
];

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('beginner-quiz');
    if (quizContainer) {
        new QuizSystem(quizContainer, quizQuestions);
    }
});
