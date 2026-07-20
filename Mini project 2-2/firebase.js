// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Paste your firebaseConfig here
const firebaseConfig = {
  
  
    apiKey: "AIzaSyDZiHldbkJ3STKMATia_T3fvkdafuGGSVQ",
    authDomain: "job-preparation-tracker-1c00d.firebaseapp.com",
    projectId: "job-preparation-tracker-1c00d",
    storageBucket: "job-preparation-tracker-1c00d.firebasestorage.app",
    messagingSenderId: "78382755039",
    appId: "1:78382755039:web:baa621ce0ea5f2de28cd6a",
    measurementId: "G-K11DHVRS43"
  

 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export for use in other files
export { auth, db };