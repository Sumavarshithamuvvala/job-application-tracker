import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ==============================
// Current Role
// ==============================
// ==============================
// Current Role
// ==============================

let role = localStorage.getItem("role") || "student";
console.log("Selected Role:", role);

// ==============================
// Get Elements
// ==============================



const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeText = document.getElementById("welcomeText");

const loginHeading = document.getElementById("loginHeading");
const signupHeading = document.getElementById("signupHeading");

const roleField = document.getElementById("roleField");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

// ==============================
// Student Button
// ==============================


// ==============================
// Admin Button
// ==============================

// ==============================
// Load Role UI
// ==============================

if (role === "admin") {

    welcomeTitle.textContent = "Welcome Admin";

    welcomeText.textContent =
        "Manage alumni profiles, placement records and analytics.";

    loginHeading.textContent = "Admin Login";

    signupHeading.textContent = "Admin Registration";

    roleField.placeholder = "Admin ID";

} else {

    welcomeTitle.textContent = "Welcome Student";

    welcomeText.textContent =
        "Continue your placement preparation journey by logging in.";

    loginHeading.textContent = "Student Login";

    signupHeading.textContent = "Student Registration";

    roleField.placeholder = "Roll Number";

}

// ==============================
// Login / Signup Tabs
// ==============================

loginTab.addEventListener("click", () => {

    loginForm.style.display = "block";
    signupForm.style.display = "none";

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

});

signupTab.addEventListener("click", () => {

    signupForm.style.display = "block";
    loginForm.style.display = "none";

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

});

// ==============================
// Password Toggle
// ==============================

document.querySelectorAll(".togglePassword").forEach(icon => {

    icon.addEventListener("click", () => {

        const input =
            document.getElementById(icon.dataset.target);

        if (input.type === "password") {

            input.type = "text";

            icon.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        }

        else {

            input.type = "password";

            icon.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );

        }

    });

});
// ==============================
// LOGIN
// ==============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        if (role === "student") {

            const studentDoc =
                await getDoc(doc(db, "students", user.uid));

            if (!studentDoc.exists()) {

                alert("Student account not found.");

                await signOut(auth);

                return;

            }

           alert("Student Login Successful!");

localStorage.removeItem("role");

window.location.href =
    "student-dashboard.html";

        }

        else {

            const adminDoc =
                await getDoc(doc(db, "admins", user.uid));

            if (!adminDoc.exists()) {

                alert("Admin account not found.");

                await signOut(auth);

                return;

            }

           alert("Admin Login Successful!");

localStorage.removeItem("role");

window.location.href =
    "admin/admin-dashboard.html";

        }

    }

    catch (error) {

        alert(error.message);

    }

});


// ==============================
// SIGNUP
// ==============================

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const roleValue =
        document.getElementById("roleField").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        if (role === "student") {

            await setDoc(
                doc(db, "students", user.uid),
                {

                    fullName: fullName,

                    email: email,

                    rollNumber: roleValue,

                    role: "student"

                }
            );

        }

        else {

            await setDoc(
                doc(db, "admins", user.uid),
                {

                    fullName: fullName,

                    email: email,

                    adminId: roleValue,

                    role: "admin"

                }
            );

        }

        alert("Account Created Successfully! Please login.");
        signupForm.reset();

        signupForm.style.display = "none";

        loginForm.style.display = "block";

        loginTab.classList.add("active");

        signupTab.classList.remove("active");

    }

    catch (error) {

        alert(error.message);

    }

});