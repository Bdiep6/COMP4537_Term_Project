/**
 * @file login.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the LoginPage class that manages user login functionality.
 */

import { BACKEND_URL } from "../../lang/en/constants.js";


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

        const email     = document.getElementById('email').value.trim();
        const password  = document.getElementById('password').value.trim();

        if (!email || !password) 
            {
                alert('Please enter both email and password.');
                return;
            }

        try 
        {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, 
                {
                    method:     'POST',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       JSON.stringify({ email, password })
                });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                window.location.href = 'user.html';
            } else {
                alert('Login failed: ' + (data.message || 'Unknown error'));
            }

        } catch (error) 
        {
            console.error("Login error:", error);
            alert(`Network or fetch error: ${error.message}`);
        }       
    }
}

// Instantiate the class
const loginPage = new LoginPage();
