/**
 * @file login.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the LoginPage class that manages user login functionality.
 */

class LoginPage {
    constructor() {
        // Bind methods to preserve context
        this.handleSubmit = this.handleSubmit.bind(this);

        // Initialize after DOM is loaded
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit);
        } else {
            console.error('Login form not found in DOM.');
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            // TODO: Replace with actual API call
            console.log('Login data:', { email, password });

            // Simulate async login delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('Login functionality - Connect to your API');

            // Example redirect logic (demo only)
            if (email.includes('admin')) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user.html';
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in. Please try again later.');
        }
    }
}

// Instantiate the class
const loginPage = new LoginPage();
