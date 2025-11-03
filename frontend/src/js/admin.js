/**
 * @file admin.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the Admin class that manages the admin dashboard functionality, including loading user statistics and handling admin actions.
 */

class Admin {
    constructor() {
        this.userTableBody = document.getElementById('usersTableBody');
        this.totalUsersEl  = document.getElementById('totalUsers');
        this.totalCallsEl  = document.getElementById('totalCalls');
        this.activeTodayEl = document.getElementById('activeToday');

        
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        try {
            // Require authentication for admin dashboard
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            let user = null;
            if (storedUser) {
                try { user = JSON.parse(storedUser); } catch(e) { user = null; }
            }

            // Basic client-side guard: redirect to login if no token or user role is not admin
            if (!token || !user || !user.role || user.role.toString().toLowerCase() !== 'admin') {
                // Optionally: show a message before redirecting
                console.warn('Admin access required. Redirecting to login.');
                window.location.href = 'login.html';
                return;
            }

            await this.loadAdminData();
        } catch (error) {
            console.error('Error initializing admin dashboard:', error);
        }
    }

    /**
     * Load admin data from API (currently placeholder)
     */
    async loadAdminData() {
        // 🔸 Example for future: replace this with actual API call
        // const token = localStorage.getItem('token');
        // const response = await fetch('/api/admin/stats', {
        //     headers: { 'Authorization': 'Bearer ' + token }
        // });
        // const data = await response.json();

        // Temporary placeholder data
        const stats = {
            totalUsers: 5,
            totalCalls: 1234,
            activeToday: 3
        };

        const users = [
            { username: 'john_doe', email: 'john@example.com', used: 234, remaining: 766, lastActive: '2 hours ago' },
            { username: 'jane_smith', email: 'jane@example.com', used: 456, remaining: 544, lastActive: '5 hours ago' },
            { username: 'bob_wilson', email: 'bob@example.com', used: 123, remaining: 877, lastActive: '1 day ago' }
        ];

        this.updateStats(stats);
        this.renderUsers(users);
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
            const row = this.userTableBody.insertRow();
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.used}</td>
                <td>${user.remaining}</td>
                <td>${user.lastActive}</td>
            `;
        });
    }

    /**
     * Logout and redirect to login page
     */
    logout() {
        // Clear stored auth and navigate to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();

        // Optional: inform server about logout if endpoint exists
        try {
            // fire-and-forget; don't wait
            fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('token') || '') } }).catch(() => {});
        } catch (e) {
            // ignore
        }

        alert('You have been logged out.');
        window.location.href = 'login.html';
    }
}

// Instantiate Admin class
const admin = new Admin();

// Optional: attach logout to button in HTML
// <button onclick="adminDashboard.logout()">Logout</button>
