/**
 * @file ai.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the AIPage class that handles interactions with the AI, including submitting user input, displaying responses, and managing UI elements.
 */

import { BACKEND_URL } from "./constants.js";

class AIPage {
    constructor() {
        // Cache DOM elements
        this.outputEl   = document.getElementById('ai_response_placeholder');
        this.submitBtn  = document.getElementById('ai_send_button');
        this.backBtn    = document.getElementById('ai_back_button');

        // Bind methods to maintain correct `this`
        this.submitRequest  = this.submitRequest.bind(this);
        this.clearAll       = this.clearAll.bind(this);
        this.goBack         = this.goBack.bind(this);

        // Initialize listeners when DOM is ready
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() 
    {
        try
        {
            // Role check: Must be "user" or "admin" to access AI page
            const userJson = localStorage.getItem('user');
            if (!userJson) {
                window.location.href = 'login.html';
                return;
            }

            const user = JSON.parse(userJson);
            if (user.role !== 'user' && user.role !== 'admin') {
                window.location.href = 'login.html';
                return;
            }

            // Initialize back button events
            const ai_back_button = document.getElementById('ai_back_button');
            if (ai_back_button) ai_back_button.addEventListener('click', this.goBack);
            
            // Initialize send button events
            const ai_send_button = document.getElementById('ai_send_button');
            if (ai_send_button) ai_send_button.addEventListener('click', this.submitRequest);

            const ai_clear_button = document.getElementById('ai_clear_button');
            if (ai_clear_button) ai_clear_button.addEventListener('click', this.clearAll);

        }catch(error)
        {
            console.error("Error initializing AIPage:", error);
        }
       
    }

    async submitRequest() {
        const formData = new FormData();
        const fileInput = document.getElementById('imageFile');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select an image file.');
            return;
        }

        // Show preview
        const preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';


        formData.append('file', file);

        // Show loading state
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<span class="loading"></span> Processing...';
        this.outputEl.className = 'output-box';
        this.outputEl.textContent = 'Processing your request...';

        try {
            // 🔸 Replace this block with your actual API call later
            // const token = localStorage.getItem('token');
            // const response = await fetch('/api/ai/process', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + token
            //     },
            //     body: JSON.stringify({ text: input })
            // });
            // const data = await response.json();

            const response = await fetch('https://blip-backend-5svjo.ondigitalocean.app/describe', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            // Save discovery to NatureDex
            try {
                const token = localStorage.getItem("token");

                const categoryMap = {
                    flower: "flowers",
                    tree:   "trees",
                    rock:   "rocks"
                };

                const mappedCategory = categoryMap[data.category];

                if (token && mappedCategory) {
                    await fetch(`${BACKEND_URL}/api/ai/item`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            label: data.label,          // e.g. "sunflower"
                            category: mappedCategory    // "flowers" | "trees" | "rocks"
                        })
                    });
                }
            } catch (err) {
                console.error("Failed to save discovery:", err);
            }

            // Track API usage
            try {
                const token = localStorage.getItem('token');

                const res = await fetch(`${BACKEND_URL}/api/auth/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const payload = await res.json();

                if (!res.ok) {
                    if (res.status === 401) {
                        console.warn("addApiUsage: Unauthorized", payload);
                    } else if (res.status === 404) {
                        console.warn("addApiUsage: User not found", payload);
                    } else {
                        console.warn("addApiUsage failed:", res.status, payload);
                    }
                } else {
                    console.log("addApiUsage success:", payload);
                }


            } catch (err) {
                // handle network or parsing errors
                console.error("addApiUsage error:", err);
            }

            // Placeholder response
            this.outputEl.textContent =
                ` ${data.description}`;


        } catch (error) {
            this.outputEl.className = 'output-box';
            this.outputEl.textContent = 'Error: ' + error.message;
        } finally {
            // Reset button
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Send Request';
        }
    }

    clearAll() {

        const fileInput = document.getElementById('imageFile');
        const preview = document.getElementById('preview');

        preview.src = '';
        preview.style.display = 'none';
        fileInput.value = '';
        this.outputEl.className = 'output-box empty';
        this.outputEl.textContent = 'Response will appear here...';
    }

    goBack() {
        window.location.href = 'user.html';
    }
}

// Instantiate the class
const aiPage = new AIPage();
