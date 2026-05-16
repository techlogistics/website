// contact.js

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Contact form
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name =
      document.getElementById("name")?.value.trim() || "";

    const email =
      document.getElementById("email")?.value.trim() || "";

    // CHANGED: Removed phone and added USDOT number
    const usdot =
      document.getElementById("usdot")?.value.trim() || "";

    const company =
      document.getElementById("company")?.value.trim() || "";

    const service =
      document.getElementById("service")?.value || "";

    const message =
      document.getElementById("message")?.value.trim() || "";

    try {
      // Save to Firestore
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        usdot, // Saved instead of phone
        company,
        service,
        message,
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
}