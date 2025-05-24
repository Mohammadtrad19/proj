document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    
    // Form elements for validation
    const regUsername = document.getElementById('reg-username');
    const regEmail = document.getElementById('reg-email');
    const regPassword = document.getElementById('reg-password');
    const logUsername = document.getElementById('log-username');
    const logPassword = document.getElementById('log-password');
    
    // Switch to login form
    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginForm.classList.add('animate-form');
        
        // Clear any error messages
        clearErrors();
    });
    
    // Switch to register form
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        registerForm.classList.add('animate-form');
        
        // Clear any error messages
        clearErrors();
    });
    
    // Form validation
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            let valid = true;
            
            // Username validation
            if (regUsername.value.trim().length < 3) {
                showError(regUsername, 'reg-username-error', 'Username must be at least 3 characters');
                valid = false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(regEmail.value.trim())) {
                showError(regEmail, 'reg-email-error', 'Please enter a valid email address');
                valid = false;
            }
            
            // Password validation
            if (regPassword.value.length < 8) {
                showError(regPassword, 'reg-password-error', 'Password must be at least 8 characters');
                valid = false;
            }
            
            // Prevent form submission if validation fails
            if (!valid) {
                e.preventDefault();
            }
        });
    }
    
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            let valid = true;
            
            // Username validation
            if (logUsername.value.trim() === '') {
                showError(logUsername, 'log-username-error', 'Please enter your username');
                valid = false;
            }
            
            // Password validation
            if (logPassword.value === '') {
                showError(logPassword, 'log-password-error', 'Please enter your password');
                valid = false;
            }
            
            // Prevent form submission if validation fails
            if (!valid) {
                e.preventDefault();
            }
        });
    }
    
    // Add input event listeners to clear errors when user types
    regUsername?.addEventListener('input', function() {
        clearError(regUsername, 'reg-username-error');
    });
    
    regEmail?.addEventListener('input', function() {
        clearError(regEmail, 'reg-email-error');
    });
    
    regPassword?.addEventListener('input', function() {
        clearError(regPassword, 'reg-password-error');
    });
    
    logUsername?.addEventListener('input', function() {
        clearError(logUsername, 'log-username-error');
    });
    
    logPassword?.addEventListener('input', function() {
        clearError(logPassword, 'log-password-error');
    });
    
    // Helper functions for validation
    function showError(inputElement, errorId, message) {
        const errorElement = document.getElementById(errorId);
        inputElement.style.borderColor = '#d9534f';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(inputElement, errorId) {
        const errorElement = document.getElementById(errorId);
        inputElement.style.borderColor = '#d1e7dd';
        errorElement.style.display = 'none';
    }
    
    function clearErrors() {
        // Clear all form fields
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
            input.style.borderColor = '#d1e7dd';
        });
        
        // Hide all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
        });
    }
});