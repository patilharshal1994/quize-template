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
    
    const details = `
Quiz: ${quiz.quizName}
Subject: ${quiz.subject}
Chapter: ${quiz.chapter}
Date: ${formatDate(quiz.date)}
Score: ${quiz.score}%
Marks: ${quiz.obtainedMarks} / ${quiz.totalMarks}
Correct Answers: ${quiz.correctAnswers} / ${quiz.totalQuestions}
Time Taken: ${quiz.timeTaken}
Status: ${quiz.status === 'passed' ? 'Passed ✓' : 'Failed ✗'}
Passing Marks: ${quiz.passingMarks}%
    `;
    
    alert(details);
    // In real app, this would open a detailed modal or navigate to a results page
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

