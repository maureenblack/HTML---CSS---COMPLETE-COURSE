class QuizSystem {
    constructor(quizContainer, questions) {
        this.container = quizContainer;
        this.questions = questions;
        this.currentScore = 0;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const quiz = document.createElement('div');
        quiz.className = 'quiz-container';
        
        this.questions.forEach((question, index) => {
            const questionEl = document.createElement('div');
            questionEl.className = 'quiz-question';
            questionEl.innerHTML = `
                <h4>Question ${index + 1}:</h4>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, optIndex) => `
                        <label class="option">
                            <input type="radio" name="q${index}" value="${optIndex}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="feedback"></div>
            `;
            quiz.appendChild(questionEl);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-quiz';
        submitBtn.textContent = 'Check Answers 📝';
        quiz.appendChild(submitBtn);

        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'quiz-results';
        quiz.appendChild(resultsDiv);

        this.container.appendChild(quiz);
    }

    attachEventListeners() {
        const submitBtn = this.container.querySelector('.submit-quiz');
        submitBtn.addEventListener('click', () => this.checkAnswers());
    }

    checkAnswers() {
        this.currentScore = 0;
        const questions = this.container.querySelectorAll('.quiz-question');
        
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="q${index}"]:checked`);
            const feedback = question.querySelector('.feedback');
            
            if (selectedOption) {
                const isCorrect = parseInt(selectedOption.value) === this.questions[index].correct;
                
                feedback.textContent = isCorrect ? '✅ Correct!' : '❌ Try again!';
                feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
                
                if (isCorrect) this.currentScore++;
            } else {
                feedback.textContent = '⚠️ Please select an answer';
                feedback.className = 'feedback warning';
            }
        });

        this.showResults();
    }

    showResults() {
        const resultsDiv = this.container.querySelector('.quiz-results');
        const percentage = (this.currentScore / this.questions.length) * 100;
        
        resultsDiv.innerHTML = `
            <h3>Quiz Results 📊</h3>
            <p>You got ${this.currentScore} out of ${this.questions.length} correct! (${percentage}%)</p>
            <div class="score-bar">
                <div class="score-progress" style="width: ${percentage}%"></div>
            </div>
            ${this.getEncouragement(percentage)}
        `;
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    getEncouragement(score) {
        if (score === 100) return '<p class="encouragement">🌟 Perfect score! You're a HTML master!</p>';
        if (score >= 80) return '<p class="encouragement">🎉 Great job! You're almost there!</p>';
        if (score >= 60) return '<p class="encouragement">💪 Good effort! Keep practicing!</p>';
        return '<p class="encouragement">📚 Keep learning! You've got this!</p>';
    }
}

// Export for use in other files
window.QuizSystem = QuizSystem;
