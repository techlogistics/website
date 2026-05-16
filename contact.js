// contact.js
// This version uses the Firebase app and Firestore instance already created
// in firebase-config.js. Do NOT import db here, so there is no module conflict.

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Get existing Firebase app initialized in firebase-config.js
const app = getApp();
const db = getFirestore(app);

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("contactForm not found.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Read values from contact.html
        const name =
            document.getElementById("name")?.value.trim() || "";

        const usdotNumber =
            document.getElementById("usdotNumber")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const subject =
            document.getElementById("subject")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";

        // Validate
        if (!name || !usdotNumber || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Save to Firestore collection: contact_messages
            // NOTE: No phone field is saved.
            await addDoc(collection(db, "contact_messages"), {
                name: name,
                "USDOT Number": usdotNumber,
                email: email,
                subject: subject,
                message: message,
                createdAt: serverTimestamp()
            });

            alert("Message sent successfully!");
            form.reset();
        } catch (error) {
            console.error("Firestore Error:", error);
            alert("Failed to send message. Check browser console for details.");
        }
    });
});