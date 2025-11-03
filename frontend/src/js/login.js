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
            // Call backend login API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = data && data.message ? data.message : 'Invalid credentials';
                alert('Login failed: ' + message);
                return;
            }

            // Accept multiple common token property names
            const token = data.token || data.accessToken || data.access_token || data.jwt;
            let user = data.user || data.payload || data.userInfo || null;

            // If server only returned a token, try to decode user info from JWT
            if (!user && token) {
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    user = JSON.parse(jsonPayload);
                } catch (e) {
                    // ignore decode errors
                    console.warn('Unable to decode JWT payload for user info', e);
                }
            }

            // Persist token and user
            if (token) {
                localStorage.setItem('token', token);
            }

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            // Redirect based on role if available, otherwise fallback to user page
            const role = user && user.role ? user.role.toString().toLowerCase() : null;
            if (role === 'admin') {
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
