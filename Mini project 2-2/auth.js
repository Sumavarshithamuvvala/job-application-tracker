// ==============================
// Get Selected Role
// ==============================
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const role = localStorage.getItem("role") || "student";

// ==============================
// Elements
// ==============================

const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeText = document.getElementById("welcomeText");

const loginHeading = document.getElementById("loginHeading");
const signupHeading = document.getElementById("signupHeading");

const roleField = document.getElementById("roleField");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// ==============================
// Set Page According To Role
// ==============================

if(role === "admin"){

    welcomeTitle.textContent = "Welcome Admin";

    welcomeText.textContent =
    "Manage alumni profiles, placement records and analytics.";

    loginHeading.textContent = "Admin Login";

    signupHeading.textContent = "Admin Registration";

    roleField.placeholder = "Admin ID";

}else{

    welcomeTitle.textContent = "Welcome Student";

    welcomeText.textContent =
    "Continue your placement preparation journey by logging in.";

    loginHeading.textContent = "Student Login";

    signupHeading.textContent = "Student Registration";

    roleField.placeholder = "Roll Number";

}

// ==============================
// Toggle Login / Signup
// ==============================

loginTab.addEventListener("click",()=>{

    loginForm.style.display="block";

    signupForm.style.display="none";

    loginTab.classList.add("active");

    signupTab.classList.remove("active");

});

signupTab.addEventListener("click",()=>{

    loginForm.style.display="none";

    signupForm.style.display="block";

    signupTab.classList.add("active");

    loginTab.classList.remove("active");

});

// ==============================
// Show / Hide Password
// ==============================

const passwordIcons=document.querySelectorAll(".togglePassword");

passwordIcons.forEach(icon=>{

    icon.addEventListener("click",()=>{

        const input=document.getElementById(icon.dataset.target);

        if(input.type==="password"){

            input.type="text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        }

        else{

            input.type="password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }

    });

});

// ==============================
// Login Demo
// ==============================
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful!");

        if (role === "student") {
            window.location.href = "student-dashboard.html";
        } else {
            window.location.href = "admin-dashboard.html";
        }

    } catch (error) {

        alert(error.message);

    }

});

// ==============================
// Signup Demo
// ==============================
signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("signupEmail").value;
    const rollNumber = document.getElementById("roleField").value;
    const password = document.getElementById("signupPassword").value;

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "students", user.uid), {

            fullName: fullName,
            email: email,
            rollNumber: rollNumber,
            role: role

        });

        alert("Account Created Successfully!");

        signupForm.reset();

        loginForm.style.display = "block";
        signupForm.style.display = "none";

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

    } catch (error) {

        alert(error.message);

    }

});
