// Authentication JavaScript

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(inputId + '-eye');
    
    if (input.type === 'password') {
        input.type = 'text';
        eye.classList.remove('bi-eye');
        eye.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        eye.classList.remove('bi-eye-slash');
        eye.classList.add('bi-eye');
    }
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            // Password confirmation validation (for register page)
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (confirmPassword && password) {
                if (password.value !== confirmPassword.value) {
                    isValid = false;
                    confirmPassword.classList.add('is-invalid');
                    showError('Passwords do not match');
                } else {
                    confirmPassword.classList.remove('is-invalid');
                }
                
                // Password strength validation
                if (password.value.length < 8) {
                    isValid = false;
                    password.classList.add('is-invalid');
                    showError('Password must be at least 8 characters long');
                }
            }
            
            // Email validation
            const email = document.getElementById('email');
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    isValid = false;
                    email.classList.add('is-invalid');
                    showError('Please enter a valid email address');
                }
            }
            
            if (isValid) {
                // Form is valid, you can submit it here
                showSuccess('Form submitted successfully!');
                // Uncomment the line below to actually submit the form
                // form.submit();
            } else {
                showError('Please fill in all required fields correctly');
            }
        });
        
        // Remove invalid class on input
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    });
});

// Show error message
function showError(message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-message alert-dismissible fade show';
    alert.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(alert, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-message alert-dismissible fade show';
    alert.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(alert, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

