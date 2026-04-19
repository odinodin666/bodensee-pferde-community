// Firebase Authentication logic for admin-dashboard
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc8nbumzXwtjuDzLs_qdbbF6dm6OWRVPI",
  authDomain: "bodensse-pferde-community.firebaseapp.com",
  projectId: "bodensse-pferde-community",
  storageBucket: "bodensse-pferde-community.firebasestorage.app",
  messagingSenderId: "277799917200",
  appId: "1:277799917200:web:56a709e8549ff6b7526a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export functions and auth object for use in other scripts
window.firebaseAuth = {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

// Optional: expose auth globally for easy access
window.auth = auth;