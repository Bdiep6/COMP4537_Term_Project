/**
 * @file registration.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the RegisterPage class that manages user registration functionality.
 */

class RegisterPage {
    constructor() {
        // Bind context
        this.handleSubmit = this.handleSubmit.bind(this);

        // Initialize when DOM is ready
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit);
        } else {
            console.error('Register form not found in DOM.');
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const username          = document.getElementById('username').value.trim();
        const email             = document.getElementById('email').value.trim();
        const password          = document.getElementById('password').value.trim();
        const confirmPassword   = document.getElementById('confirmPassword').value.trim();

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please log in.');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed: ' + (data.message || 'Unknown error'));
            }

        } catch (error) {
            console.error('Registration error:', error);
            alert('Error during registration. Please try again later.');
        }
    }
}

// Instantiate the class
const registerPage = new RegisterPage();
