// ===============================
// STUDENT DASHBOARD
// ===============================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// ELEMENTS
// ===============================

const studentName = document.getElementById("studentName");
const welcomeName = document.getElementById("welcomeName");
const dashboardAvatar = document.getElementById("dashboardAvatar");
const navAvatar = document.getElementById("navAvatar");

const searchInput = document.getElementById("searchInput");

const companyFilter = document.getElementById("companyFilter");
const roleFilter = document.getElementById("roleFilter");
const hiringFilter = document.getElementById("hiringFilter");

const resetBtn = document.getElementById("resetBtn");

const sidebarLogout = document.getElementById("sidebarLogout");
const dropdownLogout = document.getElementById("dropdownLogout");

const dropdown = document.getElementById("profileDropdown");

// ===============================
// INITIALS
// ===============================

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}

// ===============================
// LOAD LOGGED IN STUDENT
// ===============================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "auth.html";
        return;

    }

    try {

        const docRef = doc(db, "students", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            studentName.textContent = data.fullName || "";

            welcomeName.textContent = data.fullName || "";

            const initials = getInitials(data.fullName || "");

            dashboardAvatar.textContent = initials;

            navAvatar.textContent = initials;

        }

    } catch (error) {

        console.log(error);

    }

});

// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("keyup", () => {

    console.log("Searching:", searchInput.value);

});

// ===============================
// FILTER
// ===============================

companyFilter.addEventListener("change", filterProfiles);
roleFilter.addEventListener("change", filterProfiles);
hiringFilter.addEventListener("change", filterProfiles);

function filterProfiles() {

    console.log(

        companyFilter.value,

        roleFilter.value,

        hiringFilter.value

    );

}

// ===============================
// RESET FILTERS
// ===============================

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    companyFilter.selectedIndex = 0;

    roleFilter.selectedIndex = 0;

    hiringFilter.selectedIndex = 0;

});

// ===============================
// VIEW PROFILE
// ===============================

const buttons = document.querySelectorAll(".profile-card button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        window.location.href = "senior-details.html";

    });

});

// ===============================
// NAVBAR DROPDOWN
// ===============================

navAvatar.addEventListener("click", function () {

    if (dropdown.style.display === "block") {

        dropdown.style.display = "none";

    } else {

        dropdown.style.display = "block";

    }

});

window.addEventListener("click", function (e) {

    if (!e.target.closest(".profile-menu")) {

        dropdown.style.display = "none";

    }

});

// ===============================
// LOGOUT FUNCTION
// ===============================

async function logoutUser(e) {

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        window.location.href = "auth.html";

    } catch (error) {

        alert(error.message);

    }

}

sidebarLogout.addEventListener("click", logoutUser);

dropdownLogout.addEventListener("click", logoutUser);