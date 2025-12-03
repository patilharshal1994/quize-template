// Profile Page JavaScript

// Sample profile data (in real app, this would come from API)
const profileData = {
    id: 1,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    dob: '1995-01-15',
    gender: 'Male',
    address: '123 Main Street, New York, NY 10001',
    totalQuizzes: 12,
    passedQuizzes: 8,
    averageScore: 85
};

// Sample transaction history data
const transactions = [
    {
        id: 1,
        type: 'subscription',
        description: 'Premium Subscription - Monthly Plan',
        amount: 29.99,
        date: '2024-01-15',
        status: 'completed',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2024-001234'
    },
    {
        id: 2,
        type: 'payment',
        description: 'Quiz Package - Advanced Mathematics',
        amount: 19.99,
        date: '2024-01-10',
        status: 'completed',
        paymentMethod: 'PayPal',
        transactionId: 'TXN-2024-001189'
    },
    {
        id: 3,
        type: 'refund',
        description: 'Refund - Quiz Package Purchase',
        amount: -19.99,
        date: '2024-01-08',
        status: 'completed',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2024-001156'
    },
    {
        id: 4,
        type: 'subscription',
        description: 'Premium Subscription - Monthly Plan',
        amount: 29.99,
        date: '2023-12-15',
        status: 'completed',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2023-009876'
    },
    {
        id: 5,
        type: 'payment',
        description: 'Quiz Package - Physics Fundamentals',
        amount: 24.99,
        date: '2023-12-10',
        status: 'completed',
        paymentMethod: 'Debit Card',
        transactionId: 'TXN-2023-009654'
    },
    {
        id: 6,
        type: 'payment',
        description: 'Quiz Package - Chemistry Basics',
        amount: 19.99,
        date: '2023-12-05',
        status: 'pending',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2023-009432'
    },
    {
        id: 7,
        type: 'subscription',
        description: 'Premium Subscription - Monthly Plan',
        amount: 29.99,
        date: '2023-11-15',
        status: 'completed',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2023-008765'
    },
    {
        id: 8,
        type: 'payment',
        description: 'Quiz Package - English Grammar',
        amount: 15.99,
        date: '2023-11-10',
        status: 'failed',
        paymentMethod: 'PayPal',
        transactionId: 'TXN-2023-008543'
    }
];

// Sample quiz results data
const quizResults = [
    {
        id: 1,
        quizName: 'Mathematics Basics',
        subject: 'Mathematics',
        chapter: 'Algebra',
        date: '2024-01-15',
        score: 85,
        totalMarks: 100,
        obtainedMarks: 85,
        totalQuestions: 20,
        correctAnswers: 17,
        timeTaken: '25:30',
        status: 'passed',
        passingMarks: 60
    },
    {
        id: 2,
        quizName: 'Physics Fundamentals',
        subject: 'Physics',
        chapter: 'Mechanics',
        date: '2024-01-10',
        score: 92,
        totalMarks: 100,
        obtainedMarks: 92,
        totalQuestions: 25,
        correctAnswers: 23,
        timeTaken: '28:45',
        status: 'passed',
        passingMarks: 60
    },
    {
        id: 3,
        quizName: 'Chemistry Basics',
        subject: 'Chemistry',
        chapter: 'Organic Chemistry',
        date: '2024-01-08',
        score: 55,
        totalMarks: 100,
        obtainedMarks: 55,
        totalQuestions: 20,
        correctAnswers: 11,
        timeTaken: '30:00',
        status: 'failed',
        passingMarks: 60
    },
    {
        id: 4,
        quizName: 'English Grammar',
        subject: 'English',
        chapter: 'Grammar',
        date: '2024-01-05',
        score: 78,
        totalMarks: 100,
        obtainedMarks: 78,
        totalQuestions: 30,
        correctAnswers: 23,
        timeTaken: '22:15',
        status: 'passed',
        passingMarks: 60
    },
    {
        id: 5,
        quizName: 'History Quiz',
        subject: 'History',
        chapter: 'World History',
        date: '2024-01-03',
        score: 88,
        totalMarks: 100,
        obtainedMarks: 88,
        totalQuestions: 25,
        correctAnswers: 22,
        timeTaken: '26:20',
        status: 'passed',
        passingMarks: 60
    },
    {
        id: 6,
        quizName: 'Biology Basics',
        subject: 'Biology',
        chapter: 'Cell Biology',
        date: '2024-01-01',
        score: 45,
        totalMarks: 100,
        obtainedMarks: 45,
        totalQuestions: 20,
        correctAnswers: 9,
        timeTaken: '30:00',
        status: 'failed',
        passingMarks: 60
    }
];

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    loadQuizResults();
    loadTransactions();
    setupEventListeners();
});

// Load profile data
function loadProfileData() {
    // Set profile header info
    document.getElementById('profileName').textContent = profileData.fullName;
    document.getElementById('profileEmail').textContent = profileData.email;
    
    // Set profile stats
    document.getElementById('totalQuizzes').textContent = profileData.totalQuizzes;
    document.getElementById('passedQuizzes').textContent = profileData.passedQuizzes;
    document.getElementById('averageScore').textContent = profileData.averageScore + '%';
    
    // Set profile details
    document.getElementById('infoFullName').textContent = profileData.fullName;
    document.getElementById('infoEmail').textContent = profileData.email;
    document.getElementById('infoPhone').textContent = profileData.phone || 'Not provided';
    document.getElementById('infoDOB').textContent = formatDate(profileData.dob) || 'Not provided';
    document.getElementById('infoGender').textContent = profileData.gender || 'Not provided';
    document.getElementById('infoAddress').textContent = profileData.address || 'Not provided';
    
    // Populate edit form
    document.getElementById('editFullName').value = profileData.fullName;
    document.getElementById('editEmail').value = profileData.email;
    document.getElementById('editPhone').value = profileData.phone || '';
    document.getElementById('editDOB').value = profileData.dob || '';
    document.getElementById('editGender').value = profileData.gender || '';
    document.getElementById('editAddress').value = profileData.address || '';
}

// Load quiz results
function loadQuizResults(filter = 'all') {
    const resultsList = document.getElementById('quizResultsList');
    let filteredResults = quizResults;
    
    if (filter === 'passed') {
        filteredResults = quizResults.filter(q => q.status === 'passed');
    } else if (filter === 'failed') {
        filteredResults = quizResults.filter(q => q.status === 'failed');
    }
    
    if (filteredResults.length === 0) {
        resultsList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <h5>No quiz results found</h5>
                <p>You haven't attempted any quizzes yet.</p>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = filteredResults.map(quiz => `
        <div class="quiz-result-item ${quiz.status}">
            <div class="quiz-result-header">
                <div class="quiz-result-title">
                    <h5>${quiz.quizName}</h5>
                    <p><i class="bi bi-book"></i> ${quiz.subject} - ${quiz.chapter} | <i class="bi bi-calendar"></i> ${formatDate(quiz.date)}</p>
                </div>
                <span class="quiz-result-badge ${quiz.status}">
                    ${quiz.status === 'passed' ? '<i class="bi bi-check-circle"></i> Passed' : '<i class="bi bi-x-circle"></i> Failed'}
                </span>
            </div>
            <div class="quiz-result-details">
                <div class="quiz-result-detail-item">
                    <label>Score</label>
                    <div class="value score">${quiz.score}%</div>
                </div>
                <div class="quiz-result-detail-item">
                    <label>Marks</label>
                    <div class="value">${quiz.obtainedMarks} / ${quiz.totalMarks}</div>
                </div>
                <div class="quiz-result-detail-item">
                    <label>Correct Answers</label>
                    <div class="value">${quiz.correctAnswers} / ${quiz.totalQuestions}</div>
                </div>
                <div class="quiz-result-detail-item">
                    <label>Time Taken</label>
                    <div class="value">${quiz.timeTaken}</div>
                </div>
            </div>
            <div class="quiz-result-actions">
                <button class="btn btn-view-details" onclick="viewQuizDetails(${quiz.id})">
                    <i class="bi bi-eye"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Load transactions
function loadTransactions(filter = 'all') {
    const transactionList = document.getElementById('transactionList');
    let filteredTransactions = transactions;
    
    if (filter === 'payment') {
        filteredTransactions = transactions.filter(t => t.type === 'payment');
    } else if (filter === 'subscription') {
        filteredTransactions = transactions.filter(t => t.type === 'subscription');
    } else if (filter === 'refund') {
        filteredTransactions = transactions.filter(t => t.type === 'refund');
    }
    
    if (filteredTransactions.length === 0) {
        transactionList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <h5>No transactions found</h5>
                <p>You don't have any transactions yet.</p>
            </div>
        `;
        return;
    }
    
    // Sort transactions by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    transactionList.innerHTML = filteredTransactions.map(transaction => `
        <div class="transaction-item ${transaction.status}">
            <div class="transaction-header">
                <div class="transaction-info">
                    <div class="transaction-icon ${transaction.type}">
                        <i class="bi ${getTransactionIcon(transaction.type)}"></i>
                    </div>
                    <div class="transaction-details">
                        <h5>${transaction.description}</h5>
                        <p>
                            <span><i class="bi bi-calendar"></i> ${formatDate(transaction.date)}</span>
                            <span><i class="bi bi-credit-card"></i> ${transaction.paymentMethod}</span>
                            <span><i class="bi bi-hash"></i> ${transaction.transactionId}</span>
                        </p>
                    </div>
                </div>
                <div class="transaction-amount">
                    <span class="amount ${transaction.amount < 0 ? 'negative' : 'positive'}">
                        ${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <span class="status-badge ${transaction.status}">
                        ${getStatusText(transaction.status)}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Get transaction icon based on type
function getTransactionIcon(type) {
    switch(type) {
        case 'subscription':
            return 'bi-calendar-check';
        case 'payment':
            return 'bi-cart-check';
        case 'refund':
            return 'bi-arrow-counterclockwise';
        default:
            return 'bi-wallet2';
    }
}

// Get status text
function getStatusText(status) {
    switch(status) {
        case 'completed':
            return '<i class="bi bi-check-circle"></i> Completed';
        case 'pending':
            return '<i class="bi bi-clock"></i> Pending';
        case 'failed':
            return '<i class="bi bi-x-circle"></i> Failed';
        default:
            return status;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Edit profile button
    document.getElementById('editProfileBtn').addEventListener('click', showEditForm);
    document.getElementById('editDetailsBtn').addEventListener('click', showEditForm);
    
    // Cancel edit buttons
    document.getElementById('cancelEditBtn').addEventListener('click', hideEditForm);
    document.getElementById('cancelFormBtn').addEventListener('click', hideEditForm);
    
    // Profile edit form submit
    document.getElementById('profileEditForm').addEventListener('submit', handleProfileUpdate);
    
    // Filter quiz results
    document.getElementById('filterStatus').addEventListener('change', function(e) {
        loadQuizResults(e.target.value);
    });
    
    // Filter transactions
    document.getElementById('filterTransaction').addEventListener('change', function(e) {
        loadTransactions(e.target.value);
    });
    
    // Edit avatar button
    document.getElementById('editAvatarBtn').addEventListener('click', function() {
        alert('Avatar upload feature coming soon!');
    });
}

// Show edit form
function showEditForm() {
    document.getElementById('profileDetailsCard').style.display = 'none';
    document.getElementById('profileEditCard').style.display = 'block';
    
    // Scroll to edit form
    document.getElementById('profileEditCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide edit form
function hideEditForm() {
    document.getElementById('profileEditCard').style.display = 'none';
    document.getElementById('profileDetailsCard').style.display = 'block';
    
    // Reset form to original values
    loadProfileData();
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const form = e.target;
    const password = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editConfirmPassword').value;
    
    // Validate password if provided
    if (password && password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Get form values
    const updatedData = {
        fullName: document.getElementById('editFullName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        dob: document.getElementById('editDOB').value,
        gender: document.getElementById('editGender').value,
        address: document.getElementById('editAddress').value
    };
    
    // Update profile data (in real app, this would be an API call)
    Object.assign(profileData, updatedData);
    
    // Show success message
    alert('Profile updated successfully!');
    
    // Reload profile data
    loadProfileData();
    
    // Hide edit form
    hideEditForm();
}

// View quiz details
function viewQuizDetails(quizId) {
    const quiz = quizResults.find(q => q.id === quizId);
    if (!quiz) return;
    
    const modal = new bootstrap.Modal(document.getElementById('quizDetailsModal'));
    const modalContent = document.getElementById('quizDetailsContent');
    const retakeBtn = document.getElementById('retakeQuizBtn');
    
    // Build modal content
    modalContent.innerHTML = `
        <div class="quiz-detail-header">
            <div class="quiz-detail-title">
                <h4>${quiz.quizName}</h4>
                <p class="quiz-detail-meta">
                    <span><i class="bi bi-book"></i> ${quiz.subject}</span>
                    <span><i class="bi bi-journal-text"></i> ${quiz.chapter}</span>
                    <span><i class="bi bi-calendar"></i> ${formatDate(quiz.date)}</span>
                </p>
            </div>
            <div class="quiz-detail-status">
                <span class="status-badge ${quiz.status}">
                    ${quiz.status === 'passed' ? '<i class="bi bi-check-circle"></i> Passed' : '<i class="bi bi-x-circle"></i> Failed'}
                </span>
            </div>
        </div>
        
        <div class="quiz-detail-stats">
            <div class="stat-card primary">
                <div class="stat-icon">
                    <i class="bi bi-trophy"></i>
                </div>
                <div class="stat-content">
                    <label>Score</label>
                    <h3>${quiz.score}%</h3>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-check2-circle"></i>
                </div>
                <div class="stat-content">
                    <label>Marks</label>
                    <h3>${quiz.obtainedMarks} / ${quiz.totalMarks}</h3>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-question-circle"></i>
                </div>
                <div class="stat-content">
                    <label>Correct Answers</label>
                    <h3>${quiz.correctAnswers} / ${quiz.totalQuestions}</h3>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-clock"></i>
                </div>
                <div class="stat-content">
                    <label>Time Taken</label>
                    <h3>${quiz.timeTaken}</h3>
                </div>
            </div>
        </div>
        
        <div class="quiz-detail-info">
            <div class="info-row">
                <div class="info-item">
                    <label><i class="bi bi-percent"></i> Passing Marks</label>
                    <p>${quiz.passingMarks}%</p>
                </div>
                <div class="info-item">
                    <label><i class="bi bi-calculator"></i> Accuracy</label>
                    <p>${Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}%</p>
                </div>
            </div>
            <div class="info-row">
                <div class="info-item">
                    <label><i class="bi bi-check-circle-fill"></i> Correct</label>
                    <p class="text-success">${quiz.correctAnswers} questions</p>
                </div>
                <div class="info-item">
                    <label><i class="bi bi-x-circle-fill"></i> Incorrect</label>
                    <p class="text-danger">${quiz.totalQuestions - quiz.correctAnswers} questions</p>
                </div>
            </div>
        </div>
        
        <div class="quiz-detail-progress">
            <div class="progress-info">
                <label>Overall Performance</label>
                <div class="progress" style="height: 25px;">
                    <div class="progress-bar ${quiz.status === 'passed' ? 'bg-success' : 'bg-danger'}" 
                         role="progressbar" 
                         style="width: ${quiz.score}%" 
                         aria-valuenow="${quiz.score}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${quiz.score}%
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show/hide retake button based on status
    if (quiz.status === 'failed') {
        retakeBtn.style.display = 'block';
        retakeBtn.onclick = () => {
            modal.hide();
            // In real app, this would navigate to quiz start page
            alert('Redirecting to quiz...');
        };
    } else {
        retakeBtn.style.display = 'none';
    }
    
    modal.show();
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

