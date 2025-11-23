/**
 * @file user.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description This file contains the UserDashboardPage class that manages the user dashboard functionality.
 */

import { BACKEND_URL } from "../../lang/en/constants.js";

const TOTAL_REQUESTS_AVAILABLE = 20

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
        // this.loadUserData       = this.loadUserData.bind(this); // commented out
        this.goToAIService      = this.goToAIService.bind(this);
        this.logout             = this.logout.bind(this);

        // Initialize when DOM is ready
        window.addEventListener('DOMContentLoaded', this.init);
    }

    async init() 
    {
        try {
            await this.loadUserData(); // commented out

            // Optional: wire buttons if present
            const aiBtn = document.getElementById('goToAIServiceBtn');
            if (aiBtn) aiBtn.addEventListener('click', this.goToAIService);

            const logoutBtn = document.getElementById('user_logout');
            if (logoutBtn) logoutBtn.addEventListener('click', this.logout);

        } catch (err) {
            console.error('Error initializing user dashboard:', err);
        }
    }

    async loadUserData() 
    {
        // const token     = localStorage.getItem('token');
        // const response  = await fetch(`${BACKEND_URL}/api/auth/current-user`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json',
        //     },
        // });


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



        // let data = null;
        // try {
        //     data = await response.json();
        // } catch (err) {
        //     console.warn('Response not JSON or empty:', err);
        // }

        // if (response.ok && data) {     
        //     if (this.usernameEl) this.usernameEl.textContent            = data.username;
        //     if (this.apiCallsEl) this.apiCallsEl.textContent            = data.apiCalls?.toLocaleString() ?? '0';
        //     if (this.totalRequestsEl) this.totalRequestsEl.textContent  = data.totalRequests?.toString() ?? '0';
        // } 
        // else {
        //     console.warn('Failed to load user data:', data?.message || response.statusText);
        //     alert('No user data available: ' + (data?.message || 'Unknown error'));
        //     // window.location.href = 'login.html';
        // }
    }


    goToAIService() 
    {
        window.location.href = 'ai.html';
    }

    logout() 
    {
        // Clear stored auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();

        alert('Logging out...');
        window.location.href = 'login.html';
    }
}

// Instantiate
window.UserDashboardPage = new UserDashboardPage();
// Example HTML hooks (optional):
// <button id="goToAIServiceBtn">Use AI Service</button>
// <button id="logoutBtn">Logout</button>
