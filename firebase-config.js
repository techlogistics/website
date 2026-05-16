// Firebase Configuration
// Replace this entire file with the code below.

// Import Firebase modules (ES Module version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ7Ob9US5dKcdJ1-OoRhxFyaeG0GL2W4Q",
  authDomain: "tech-logistics.firebaseapp.com",
  projectId: "tech-logistics",
  storageBucket: "tech-logistics.firebasestorage.app",
  messagingSenderId: "855587196274",
  appId: "1:855587196274:web:de28ab6cd791828697a1eb",
  measurementId: "G-WVH771VCWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);