/**
 * @file ai.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description In this file, we define the AIPage class that handles interactions with the AI, including submitting user input, displaying responses, and managing UI elements.
 */

import { BACKEND_URL } from "../../lang/en/constants.js";

class AIPage {
    constructor() {
        // Cache DOM elements
        // this.inputEl = document.getElementById('userInput'); // Commented out: no longer using textarea
        this.outputEl = document.getElementById('ai_response_placeholder');
        this.submitBtn = document.getElementById('ai_send_button');

        // Bind methods to maintain correct `this`
        this.submitRequest = this.submitRequest.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.goBack = this.goBack.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this); // Commented out: no longer using textarea

        // Initialize listeners when DOM is ready
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() 
    {
        try
        {
            const ai_send_button = document.getElementById('ai_send_button');
            if (ai_send_button) ai_send_button.addEventListener('click', this.submitRequest);

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

        // const input = this.inputEl.value.trim();
        // if (!input) {
        //     alert('Please enter some text');
        //     return;
        // }

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
                body: formData,
            });

            const data = await response.json();

            try{

                const user = JSON.parse(localStorage.getItem("user"));
                const userID = user?.sub;

                await fetch(`${BACKEND_URL}/api/ai/item`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId: userID,
                        category: data.category,
                        label: data.label
                    })
                });

            } catch (err){
                console.log("Sending AI data to database", err);
            }



            try {

                // const token = localStorage.getItem('token');

                const user = JSON.parse(localStorage.getItem("user"));
                const userEmail = user?.email;

                const res = await fetch(`${BACKEND_URL}/api/auth/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userEmail })
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



            // Simulate API delay
            // await new Promise(resolve => setTimeout(resolve, 2000));

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
        // this.inputEl.value = ''; // Commented out: no textarea to clear
        const fileInput = document.getElementById('imageFile');
        fileInput.value = '';
        this.outputEl.className = 'output-box empty';
        this.outputEl.textContent = 'Response will appear here...';
    }

    goBack() {
        window.location.href = 'user.html';
    }

    // handleKeyPress(event) { // Commented out: no longer using textarea
    //     if (event.key === 'Enter' && !event.shiftKey) {
    //         event.preventDefault();
    //         this.submitRequest();
    //     }
    // }
}

// Instantiate the class
const aiPage = new AIPage();

// Example HTML usage:
// <button id="submitBtn" onclick="aiPage.submitRequest()">Send Request</button>
// <button onclick="aiPage.clearAll()">Clear</button>
// <button onclick="aiPage.goBack()">Back</button>
