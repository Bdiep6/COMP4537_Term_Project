/**
 * @file registration.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the RegisterPage class that manages user registration functionality.
 */

import { BACKEND_URL } from "./constants.js";
import { ERROR_LANG } from "../../lang/en/errors-lang.js";

class RegisterPage 
{
    constructor() 
    {
        // Bind context
        this.handleSubmit = this.handleSubmit.bind(this);

        // Initialize when DOM is ready
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() 
    {
        const form = document.getElementById('registerForm');

        if (form) {
            form.addEventListener('submit', this.handleSubmit);
        } else {
            console.error('Register form not found in DOM.');
        }
    }

    async handleSubmit(event) 
    {
        event.preventDefault();

        const username          = document.getElementById('username').value.trim();
        const email             = document.getElementById('email').value.trim();
        const password          = document.getElementById('password').value.trim();
        const confirmPassword   = document.getElementById('confirmPassword').value.trim();
        const loginErrorMessage = document.getElementById('login_error_message');
        

        if (!username || !email || !password || !confirmPassword) 
            {
                loginErrorMessage.textContent = ERROR_LANG.LOGIN_EMPTY_FIELDS;
                return;
            }

        if (password !== confirmPassword) 
            {
                loginErrorMessage.textContent = ERROR_LANG.REGISTER_PASSWORD_DONT_MATCH;
                return;
            }

        try 
        {

            if(loginErrorMessage) loginErrorMessage.textContent = ERROR_LANG.LOGIN_CLEAR_ERROR;

            const response = await fetch(`${BACKEND_URL}/api/auth/signup`, 
                {
                    method:     'POST',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       JSON.stringify({ username, email, password })
                });

            const data = await response.json();

            if (response.ok) {
                window.location.href = 'login.html';
            } else {
                loginErrorMessage.textContent = (ERROR_LANG.LOGIN_UKNOWN_ERROR);
            }

        } catch (error) 
        {
            console.error("Login error:", error);
            loginErrorMessage.textContent = `${ERROR_LANG.LOGIN_NETWORK_FETCH} ${error.message}`;  
        }
    }
}

// Instantiate the class
const registerPage = new RegisterPage();
