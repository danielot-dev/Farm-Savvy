// User data storage (in a real app, this would be a database)
const users = JSON.parse(localStorage.getItem('farmSavvyUsers')) || [];

// Login form handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) return;
    
    const email = this.email.value;
    const password = this.password.value;
    
    // Check if user exists
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...');
        
        // Redirect to home page (in a real app, this would be a dashboard)
        window.location.href = '../index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Registration form handling
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) return;
    
    // Check if passwords match
    if (this.password.value !== this.confirmPassword.value) {
        alert('Passwords do not match!');
        this.password.classList.add('error');
        this.confirmPassword.classList.add('error');
        return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === this.email.value)) {
        alert('Email already registered. Please login instead.');
        return;
    }
    
    // Create new user object
    const newUser = {
        id: Date.now().toString(),
        fullName: this.fullName.value,
        email: this.email.value,
        password: this.password.value,
        userType: this.userType.value,
        joinedDate: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('farmSavvyUsers', JSON.stringify(users));
    
    // Store current user in session
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Show success message
    alert('Registration successful! Welcome to Farm Savvy.');
    
    // Redirect to home page
    window.location.href = '../index.html';
});

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (currentUser && loginBtn) {
        loginBtn.textContent = 'My Account';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show dropdown or account page
            alert(`Logged in as ${currentUser.fullName}`);
        });
    }
});