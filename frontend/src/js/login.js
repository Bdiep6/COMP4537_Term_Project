/**
 * @file login.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the LoginPage class that manages user login functionality.
 */

import { BACKEND_URL } from "./constants.js";
import { ERROR_LANG } from "../../lang/en/errors-lang.js";


class LoginPage 
{
    constructor() 
    {
        // Bind methods to preserve context
        this.handleSubmit = this.handleSubmit.bind(this);

        // Initialize after DOM is loaded
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() 
    {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit);
        } else {
            console.error('Login form not found in DOM.');
        }
    }

    async handleSubmit(event) 
    {
        event.preventDefault();

        const email                 = document.getElementById('email').value.trim();
        const password              = document.getElementById('password').value.trim();
        const loginErrorMessage     = document.getElementById('login_error_message');
        
        
        // Send login request to backend
        try 
        {
            if(loginErrorMessage) loginErrorMessage.textContent = ERROR_LANG.LOGIN_CLEAR_ERROR;

            if (!email || !password) 
                {
                    loginErrorMessage.textContent = ERROR_LANG.LOGIN_EMPTY_FIELDS;
                    return;
                }

            const response = await fetch(`${BACKEND_URL}/api/auth/login`, 
                {
                    method:     'POST',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       JSON.stringify({ email, password })
                });

            const data = await response.json();

            if (response.ok) {
                // Assume data contains 'token'
                const token = data.token;
                if (!token) {
                    loginErrorMessage.textContent = 'Login failed: No token received';
                    return;
                }

                // Decode JWT to get user info
                let user = null;
                try {
                    const base64Url     = token.split('.')[1];
                    const base64        = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload   = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    user = JSON.parse(jsonPayload);
                } catch (e) {
                    console.error('Failed to decode JWT:', e);
                    loginErrorMessage.textContent = ERROR_LANG.LOGIN_JWT_MALFORMED;
                    return;
                }

                // Store token and user
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect based on role
                if (user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'user.html';
                }
            } else {
                // TODO: Backend should send message on failure 
                loginErrorMessage.textContent = (data.message);
            }

        } catch (error) 
        {
            console.error("Login error:", error);
            loginErrorMessage.textContent = `${ERROR_LANG.LOGIN_NETWORK_FETCH} ${error.message}`;        }       
    }
}

// Instantiate the class
const loginPage = new LoginPage();
