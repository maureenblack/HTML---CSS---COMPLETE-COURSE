const answers = {
    quiz1: {
        1: 'a',
        2: 'b',
        3: 'b'
    },
    quiz2: {
        1: 'b',
        2: 'b',
        3: 'b'
    },
    quiz3: {
        1: 'a',
        2: 'b',
        3: 'b'
    },
    quiz4: {
        1: 'd',
        2: 'b',
        3: 'b'
    },
    quiz5: {
        1: 'a',
        2: 'b',
        3: 'b'
    },
    quiz6: {
        1: 'a',
        2: 'b',
        3: 'b'
    }
};

let score = 0;
let questionsAnswered = new Set();
let currentQuiz = '';

// Set the current quiz based on the HTML file
function initializeQuiz() {
    const path = window.location.pathname;
    currentQuiz = path.includes('quiz1.html') ? 'quiz1' :
                 path.includes('quiz2.html') ? 'quiz2' :
                 path.includes('quiz3.html') ? 'quiz3' :
                 path.includes('quiz4.html') ? 'quiz4' :
                 path.includes('quiz5.html') ? 'quiz5' :
                 'quiz6';
}

function checkAnswer(questionNum, choice) {
    const question = document.querySelector(`#q${questionNum}`);
    const buttons = question.querySelectorAll('button');
    const feedback = question.querySelector('.feedback');
    
    buttons.forEach(button => button.disabled = true);
    questionsAnswered.add(questionNum);

    if (choice === answers[currentQuiz][questionNum]) {
        feedback.textContent = "Correct! ✅";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = "Incorrect! ❌";
        feedback.style.color = "red";
    }
}

function submitQuiz() {
    if (questionsAnswered.size < 3) {
        alert("Please answer all questions before submitting!");
        return;
    }

    document.getElementById('score').textContent = score;
    document.getElementById('results').style.display = 'block';
    document.getElementById('submit-quiz').style.display = 'none';

    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `<p>Great job completing the quiz! ${
        score === 3 ? "Perfect score! 🌟" :
        score === 2 ? "Almost there! Keep practicing! 💪" :
        "Review the material and try again! 📚"
    }</p>`;
}

// Initialize the quiz when the page loads
window.addEventListener('load', initializeQuiz);
