/**
 * @file user.js
 * @author Yujin Jeong, Evan Vink, Brian Diep, Chat GPT
 * @version 1.0
 * @description This file contains the UserDashboardPage class that manages the user dashboard functionality.
 */

import { BACKEND_URL, TOTAL_REQUESTS_AVAILABLE } from "./constants.js";

class UserDashboardPage 
{
    constructor() 
    {
        // Cache DOM elements
        this.usernameEl         = document.getElementById('username');
        this.apiCallsEl         = document.getElementById('apiCalls');
        this.totalRequestsEl    = document.getElementById('totalRequests');

        // Bind methods
        this.init               = this.init.bind(this);
        this.goToAIService      = this.goToAIService.bind(this);
        this.logout             = this.logout.bind(this);

        // Initialize when DOM is ready
        window.addEventListener('DOMContentLoaded', this.init);
    }

    async init() 
    {
        try {
            await this.loadUserData(); 

            const aiBtn = document.getElementById('user_ai_button');
            if (aiBtn) aiBtn.addEventListener('click', this.goToAIService);

            const logoutBtn = document.getElementById('user_logout');
            if (logoutBtn) logoutBtn.addEventListener('click', this.logout);

            const natureDexBtn = document.getElementById('user_naturedex_button');
            if (natureDexBtn) natureDexBtn.addEventListener('click', this.goToNatureDex);

        } catch (err) {
            console.error('Error initializing user dashboard:', err);
        }
    }

    async loadUserData() 
    {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.sub;
        try {
            // POST to the backend because the endpoint expects a JSON body
            const res = await fetch(`${BACKEND_URL}/api/auth/get?id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const payload = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    console.warn("getApiUsage: Unauthorized", payload);
                } else if (res.status === 404) {
                    console.warn("getApiUsage: User not found", payload);
                } else {
                    console.warn("getApiUsage failed:", res.status, payload);
                }
            } else {
                if (this.totalRequestsEl){
                    this.totalRequestsEl.textContent = payload.amount;
                    this.apiCallsEl.textContent = TOTAL_REQUESTS_AVAILABLE - payload.amount;
                } else {
                    
                }

            }

        } catch (error){
            console.error("addApiUsage error:", error);
        }
    }


    goToAIService() 
    {
        window.location.href = 'ai.html';
    }

    goToNatureDex() 
    {
        window.location.href = 'naturedex.html';
    }

    logout() 
    {
        // Clear stored auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();

        window.location.href = 'login.html';
    }
}

window.UserDashboardPage = new UserDashboardPage();
