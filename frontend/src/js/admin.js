/**
 * @file admin.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the Admin class that manages the admin dashboard functionality, including loading user statistics and handling admin actions.
 */

import { BACKEND_URL } from "./constants.js";


class Admin {
    constructor() {
        this.userTableBody = document.getElementById('usersTable');
        this.totalUsersEl  = document.getElementById('totalUsers');
        this.totalCallsEl  = document.getElementById('totalCalls');
        this.activeTodayEl = document.getElementById('activeToday');

        
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {

        try {
            // Check user role - must be "admin"
            const userJson = localStorage.getItem('user');
            if (!userJson) {
                window.location.href = 'login.html';
                return;
            }

            const user = JSON.parse(userJson);
            if (user.role !== 'admin') {
                window.location.href = 'user.html';
                return;
            }

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

        const token = localStorage.getItem('token');

        const response = await fetch(`${BACKEND_URL}/api/auth/users`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await response.json();

        // Check for server-side authorization errors
        if (response.status === 403) 
            {
                window.location.href = 'user.html';
                return;
            }

        if (!response.ok) 
            {
                console.error('Error loading admin data:', data);
                this.userTableBody.innerHTML = JSON.stringify(data, null, 2);
                return;
            }

        console.log('Admin data received:', data);

        // Handle case where data might be wrapped in an object (e.g., { result: [...] })
        const users = data.result.rows;

        if (!Array.isArray(users)) {
            console.error('Users data is not an array:', users);
            this.userTableBody.innerHTML = JSON.stringify(data, null, 2);
            return;
        }

        let totalRequests = 0;
        let totalUsers = users.length;

        // Render user rows
        for (const user of users) {

            const row = document.createElement("tr");

            row.style.borderBottom = "1px solid #ccc";
            row.style.padding = "12px 16px";

            row.innerHTML = `
                <td style="padding: 12px 16px;">${user.username}</td>
                <td style="padding: 12px 16px;">${user.email}</td>
                <td style="padding: 12px 16px; text-align:center;">${user.api_usage_count}</td>
                <td style="padding: 12px 16px; text-align:center;">${20 - user.api_usage_count}</td>
            `;

            this.userTableBody.appendChild(row);



            totalRequests += user.api_usage_count;
        }

        this.totalCallsEl.textContent = totalRequests;
        this.totalUsersEl.textContent = totalUsers;

    }

    /**
     * Update dashboard summary stats
     */
    updateStats(stats) {
        this.totalUsersEl.textContent   = stats.totalUsers.toString();
        this.totalCallsEl.textContent   = stats.totalCalls.toLocaleString();
        this.activeTodayEl.textContent  = stats.activeToday.toString();
    }

    /**
     * Render user data table
     */
    renderUsers(users) {
        
        // Clear existing rows
        this.userTableBody.innerHTML = ADMIN_LANG.ADMIN_CLEAR_ROWS;

        const row       = this.userTableBody.insertRow();
        row.innerHTML   = users;

    }

    /**
     * Logout and redirect to login page
     */
    logout() {
        // Clear stored auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();

        window.location.href = 'login.html';
    }
}

// Instantiate Admin class
const admin = new Admin();

