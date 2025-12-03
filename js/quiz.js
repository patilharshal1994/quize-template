// Quiz JavaScript

// Quiz Data
const quizData = {
    totalQuestions: 25, // 25 questions
    timeLimit: 30 * 60, // 30 minutes in seconds
    questions: [
        {
            id: 1,
            text: "What is the value of x in the equation 2x + 5 = 15?",
            options: [
                { id: 1, text: "x = 5" },
                { id: 2, text: "x = 10" },
                { id: 3, text: "x = 7" },
                { id: 4, text: "x = 8" }
            ],
            correct: 1,
            marks: 5
        },
        {
            id: 2,
            text: "What is the square root of 64?",
            options: [
                { id: 1, text: "6" },
                { id: 2, text: "8" },
                { id: 3, text: "10" },
                { id: 4, text: "12" }
            ],
            correct: 2,
            marks: 5
        },
        {
            id: 3,
            text: "What is 15% of 200?",
            options: [
                { id: 1, text: "25" },
                { id: 2, text: "30" },
                { id: 3, text: "35" },
                { id: 4, text: "40" }
            ],
            correct: 2,
            marks: 5
        },
        {
            id: 4,
            text: "What is the area of a circle with radius 5?",
            options: [
                { id: 1, text: "25π" },
                { id: 2, text: "10π" },
                { id: 3, text: "15π" },
                { id: 4, text: "20π" }
            ],
            correct: 1,
            marks: 5
        },
        {
            id: 5,
            text: "What is the value of 3² + 4²?",
            options: [
                { id: 1, text: "25" },
                { id: 2, text: "24" },
                { id: 3, text: "23" },
                { id: 4, text: "22" }
            ],
            correct: 1,
            marks: 5
        },
        {
            id: 6,
            text: "What is the next number in the sequence: 2, 4, 8, 16, ?",
            options: [
                { id: 1, text: "24" },
                { id: 2, text: "32" },
                { id: 3, text: "28" },
                { id: 4, text: "30" }
            ],
            correct: 2,
            marks: 5
        },
        {
            id: 7,
            text: "What is the sum of angles in a triangle?",
            options: [
                { id: 1, text: "90°" },
                { id: 2, text: "180°" },
                { id: 3, text: "270°" },
                { id: 4, text: "360°" }
            ],
            correct: 2,
            marks: 5
        },
        {
            id: 8,
            text: "What is 2³ × 2²?",
            options: [
                { id: 1, text: "2⁵" },
                { id: 2, text: "2⁶" },
                { id: 3, text: "4⁵" },
                { id: 4, text: "4⁶" }
            ],
            correct: 1,
            marks: 5
        },
        {
            id: 9,
            text: "What is the prime factorization of 24?",
            options: [
                { id: 1, text: "2 × 2 × 2 × 3" },
                { id: 2, text: "2 × 3 × 4" },
                { id: 3, text: "3 × 8" },
                { id: 4, text: "2 × 12" }
            ],
            correct: 1,
            marks: 5
        },
        {
            id: 10,
            text: "What is the median of: 5, 7, 9, 11, 13?",
            options: [
                { id: 1, text: "7" },
                { id: 2, text: "9" },
                { id: 3, text: "11" },
                { id: 4, text: "13" }
            ],
            correct: 2,
            marks: 5
        }
    ]
};

// Generate additional questions dynamically (11-25)
for (let i = 11; i <= 25; i++) {
    const num1 = i;
    const num2 = i - 5;
    const result = num1 * num2;
    quizData.questions.push({
        id: i,
        text: `Question ${i}: What is the result of ${num1} × ${num2}?`,
        options: [
            { id: 1, text: `${result}` },
            { id: 2, text: `${result + 1}` },
            { id: 3, text: `${result - 1}` },
            { id: 4, text: `${result + 5}` }
        ],
        correct: 1,
        marks: 5
    });
}

// Quiz State
let currentQuestionIndex = 0;
let timeRemaining = quizData.timeLimit;
let answers = {};
let questionStatus = {}; // 'answered', 'skipped', 'not-answered'
let timerInterval;

// Initialize Quiz
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    startTimer();
    generateQuestionNumbers();
    loadQuestion(0);
});

// Initialize Quiz
function initializeQuiz() {
    document.getElementById('total-questions').textContent = quizData.totalQuestions;
    
    // Initialize question status
    for (let i = 0; i < quizData.totalQuestions; i++) {
        questionStatus[i] = 'not-answered';
    }
}

// Generate Question Numbers
function generateQuestionNumbers() {
    const container = document.getElementById('question-numbers');
    container.innerHTML = '';
    
    for (let i = 0; i < quizData.totalQuestions; i++) {
        const number = document.createElement('div');
        number.className = 'question-number';
        number.setAttribute('data-number', i + 1);
        number.onclick = () => goToQuestion(i);
        number.id = `q-num-${i}`;
        
        container.appendChild(number);
    }
    
    updateQuestionNumbers();
}

// Update Question Numbers Display
function updateQuestionNumbers() {
    for (let i = 0; i < quizData.totalQuestions; i++) {
        const numElement = document.getElementById(`q-num-${i}`);
        numElement.className = 'question-number';
        
        if (i === currentQuestionIndex) {
            numElement.classList.add('current');
        } else if (questionStatus[i] === 'answered') {
            numElement.classList.add('answered');
        } else if (questionStatus[i] === 'skipped') {
            numElement.classList.add('skipped');
        }
    }
}

// Load Question
function loadQuestion(index) {
    if (index < 0 || index >= quizData.totalQuestions) return;
    
    currentQuestionIndex = index;
    const question = quizData.questions[index];
    
    // Update question display
    document.getElementById('q-number').textContent = index + 1;
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('question-text').textContent = question.text;
    document.querySelector('.question-marks strong').textContent = question.marks;
    
    // Update progress bar
    const progress = ((index + 1) / quizData.totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    
    // Load options
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';
    
    const optionLabels = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, idx) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.innerHTML = `
            <input type="radio" name="answer" id="option${idx + 1}" value="${option.id}" ${answers[index] === option.id ? 'checked' : ''}>
            <label for="option${idx + 1}">
                <span class="option-label">${optionLabels[idx]}</span>
                <span class="option-text">${option.text}</span>
            </label>
        `;
        optionsContainer.appendChild(optionItem);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === quizData.totalQuestions - 1;
    
    // Update question numbers
    updateQuestionNumbers();
}

// Submit Answer
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
        questionStatus[currentQuestionIndex] = 'answered';
        updateQuestionNumbers();
        
        // Show success feedback
        showFeedback('Answer submitted successfully!', 'success');
        
        // Auto move to next question if not last
        if (currentQuestionIndex < quizData.totalQuestions - 1) {
            setTimeout(() => {
                nextQuestion();
            }, 500);
        } else {
            // Last question - show summary
            setTimeout(() => {
                showSummary();
            }, 500);
        }
    } else {
        showFeedback('Please select an answer!', 'error');
    }
}

// Skip Question
function skipQuestion() {
    questionStatus[currentQuestionIndex] = 'skipped';
    updateQuestionNumbers();
    
    showFeedback('Question skipped', 'warning');
    
    // Auto move to next question
    if (currentQuestionIndex < quizData.totalQuestions - 1) {
        setTimeout(() => {
            nextQuestion();
        }, 500);
    } else {
        showSummary();
    }
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < quizData.totalQuestions - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

// Go to Specific Question
function goToQuestion(index) {
    loadQuestion(index);
}

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

// Update Timer Display
function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timer').textContent = timeString;
    
    // Change color based on time
    const timerBar = document.querySelector('.timer-bar');
    if (timeRemaining <= 300) { // 5 minutes
        timerBar.classList.add('danger');
        timerBar.classList.remove('warning');
    } else if (timeRemaining <= 600) { // 10 minutes
        timerBar.classList.add('warning');
    }
}

// Time Up
function timeUp() {
    showFeedback('Time is up! Quiz will be submitted automatically.', 'error');
    setTimeout(() => {
        finalSubmit();
    }, 2000);
}

// Show Summary
function showSummary() {
    const answered = Object.values(questionStatus).filter(s => s === 'answered').length;
    const skipped = Object.values(questionStatus).filter(s => s === 'skipped').length;
    const notAnswered = Object.values(questionStatus).filter(s => s === 'not-answered').length;
    
    document.getElementById('answered-count').textContent = answered;
    document.getElementById('skipped-count').textContent = skipped;
    document.getElementById('not-answered-count').textContent = notAnswered;
    
    const modal = new bootstrap.Modal(document.getElementById('quizSummaryModal'));
    modal.show();
}

// Final Submit
function finalSubmit() {
    clearInterval(timerInterval);
    
    // Calculate score
    let score = 0;
    let totalMarks = 0;
    
    quizData.questions.forEach((question, index) => {
        totalMarks += question.marks;
        if (answers[index] === question.correct) {
            score += question.marks;
        }
    });
    
    const percentage = (score / totalMarks) * 100;
    
    // Redirect to results page (you can create this page)
    alert(`Quiz Submitted!\n\nScore: ${score}/${totalMarks}\nPercentage: ${percentage.toFixed(2)}%`);
    
    // In real implementation, redirect to results page
    // window.location.href = 'quiz-results.html';
}

// Quit Quiz
function quitQuiz() {
    const modal = new bootstrap.Modal(document.getElementById('quitModal'));
    modal.show();
}

// Confirm Quit
function confirmQuit() {
    clearInterval(timerInterval);
    // Save progress and redirect
    alert('Quiz progress saved. You can resume later.');
    window.location.href = 'quizzes.html';
}

// Show Feedback
function showFeedback(message, type) {
    // Remove existing feedback
    const existing = document.querySelector('.quiz-feedback');
    if (existing) existing.remove();
    
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'} alert-dismissible fade show`;
    feedback.style.cssText = 'position: fixed; top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    feedback.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}-fill me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

