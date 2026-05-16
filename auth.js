// auth.js
// Real Firebase Authentication for Signup and Login

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

/* =========================================================
   SIGN UP
   Works with signup.html form id="signupForm"
   ========================================================= */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usdot =
      document.getElementById("USDOT NUMBER")?.value.trim() || "";
    const companyName =
      document.getElementById("companyName")?.value.trim() || "";
    const email =
      document.getElementById("signupEmail")?.value.trim() || "";
    const phone =
      document.getElementById("phone")?.value.trim() || "";
    const password =
      document.getElementById("signupPassword")?.value || "";
    const confirmPassword =
      document.getElementById("confirmPassword")?.value || "";

    // Validation
    if (
      !usdot ||
      !companyName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      // Create Firebase Auth user
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Update profile display name
      await updateProfile(user, {
        displayName: companyName
      });

      // Save additional data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        usdot,
        companyName,
        email,
        phone,
        createdAt: serverTimestamp()
      });

      alert("Account created successfully!");

      // Redirect to login page
      window.location.href = "login.html";
    } catch (error) {
      alert(getFirebaseErrorMessage(error.code));
    }
  });
}

/* =========================================================
   LOGIN
   Works with login.html form id="loginForm"
   ========================================================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email =
      document.getElementById("loginEmail")?.value.trim() || "";
    const password =
      document.getElementById("loginPassword")?.value || "";

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");

      // Redirect to homepage or dashboard
      window.location.href = "index.html";
    } catch (error) {
      alert(getFirebaseErrorMessage(error.code));
    }
  });
}

/* =========================================================
   FIREBASE ERROR MESSAGES
   ========================================================= */
function getFirebaseErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Invalid email address.";

    case "auth/weak-password":
      return "Password is too weak (minimum 6 characters).";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Error: " + code;
  }
}