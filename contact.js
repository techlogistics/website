// contact.js

// Import Firestore from firebase-config.js
import { db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Wait until page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get form values
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

        // Basic validation
        if (!name || !usdotNumber || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Save data to Firestore
            await addDoc(collection(db, "contact_messages"), {
                name: name,
                "USDOT Number": usdotNumber,
                email: email,
                subject: subject,
                message: message,
                createdAt: serverTimestamp()
            });

            // Success message
            alert("Message sent successfully!");

            // Reset form
            form.reset();
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    });
});