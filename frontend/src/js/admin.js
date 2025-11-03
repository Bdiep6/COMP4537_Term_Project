/**
 * @file admin.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the Admin class that manages the admin dashboard functionality, including loading user statistics and handling admin actions.
 */

import { BACKEND_URL } from "../../lang/en/constants.js";


class Admin {
    constructor() {
        this.userTableBody = document.getElementById('usersTableBody');
        this.totalUsersEl  = document.getElementById('totalUsers');
        this.totalCallsEl  = document.getElementById('totalCalls');
        this.activeTodayEl = document.getElementById('activeToday');

        
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {

        try{
            const logoutBtn = document.getElementById('admin-logout');
            if (logoutBtn) logoutBtn.addEventListener('click', this.logout);
        } catch (error) {
            console.error('Error initializing admin logout:', error);
        }

        try {
            await this.loadAdminData();
        } catch (error) {
            console.error('Error initializing admin dashboard:', error);
        }
    }

    /**
     * Load admin data from API (currently placeholder)
     * /api/auth/admin-dashboard
     */
    async loadAdminData() {
        // 🔸 Example for future: replace this with actual API call
        // const token = localStorage.getItem('token');
        // const response = await fetch('/api/admin/stats', {
        //     headers: { 'Authorization': 'Bearer ' + token }
        // });
        // const data = await response.json();

        // Temporary placeholder data
        // const stats = {
        //     totalUsers: 5,
        //     totalCalls: 1234,
        //     activeToday: 3
        // };

        // const users = [
        //     { username: 'john_doe', email: 'john@example.com', used: 234, remaining: 766, lastActive: '2 hours ago' },
        //     { username: 'jane_smith', email: 'jane@example.com', used: 456, remaining: 544, lastActive: '5 hours ago' },
        //     { username: 'bob_wilson', email: 'bob@example.com', used: 123, remaining: 877, lastActive: '1 day ago' }
        // ];

        // this.updateStats(stats);


        const token = localStorage.getItem('token');

        const response = await fetch(`${BACKEND_URL}/api/auth/users`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await response.json();



        this.renderUsers(data);
    }

    /**
     * Update dashboard summary stats
     */
    updateStats(stats) {
        this.totalUsersEl.textContent = stats.totalUsers.toString();
        this.totalCallsEl.textContent = stats.totalCalls.toLocaleString();
        this.activeTodayEl.textContent = stats.activeToday.toString();
    }

    /**
     * Render user data table
     */
    renderUsers(users) {
        
        // Clear existing rows
        this.userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = this.userTableBody;
            row.innerHTML = user + " ";
        });
    }

    /**
     * Logout and redirect to login page
     */
    logout() {
        // Clear stored auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();

        alert('Logging out...');
        window.location.href = 'login.html';
    }
}

// Instantiate Admin class
const admin = new Admin();

// Optional: attach logout to button in HTML
// <button onclick="adminDashboard.logout()">Logout</button>
