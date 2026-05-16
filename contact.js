// contact.js
// Saves Contact Form messages to Firebase Firestore

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase-config.js";

// Contact form element
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name =
      document.getElementById("name")?.value.trim() || "";

    const email =
      document.getElementById("email")?.value.trim() || "";

    // Removed phone field and added USDOT Number
    const usdotNumber =
      document.getElementById("usdotNumber")?.value.trim() || "";

    const subject =
      document.getElementById("subject")?.value.trim() || "";

    const message =
      document.getElementById("message")?.value.trim() || "";

    // Validation
    if (!name || !email || !usdotNumber || !subject || !message) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // Save to Firestore
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        "USDOT Number": usdotNumber,
        subject,
        message,
        createdAt: serverTimestamp()
      });

      alert("Message sent successfully!");

      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again.");
    }
  });
}