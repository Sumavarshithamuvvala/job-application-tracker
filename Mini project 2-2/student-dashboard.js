// ===============================
// STUDENT DASHBOARD
// ===============================

// Student Name
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const studentName = document.getElementById("studentName");
const welcomeName = document.getElementById("welcomeName");
const dashboardAvatar = document.getElementById("dashboardAvatar");
const navAvatar = document.getElementById("navAvatar");
// ===============================
// INITIALS AVATAR
// ===============================

function getInitials(name){

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}

const initials = getInitials(studentName);

const dashboardAvatar = document.getElementById("dashboardAvatar");

if(dashboardAvatar){
    dashboardAvatar.textContent = initials;
}

const navAvatar = document.getElementById("navAvatar");

if(navAvatar){
    navAvatar.textContent = initials;
}

// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function(){

    console.log("Searching :", searchInput.value);

    // Firebase:
    // Search senior profiles

});

// ===============================
// FILTERS
// ===============================

const companyFilter = document.getElementById("companyFilter");
const roleFilter = document.getElementById("roleFilter");
const hiringFilter = document.getElementById("hiringFilter");

companyFilter.addEventListener("change", filterProfiles);
roleFilter.addEventListener("change", filterProfiles);
hiringFilter.addEventListener("change", filterProfiles);

function filterProfiles(){

    console.log(
        companyFilter.value,
        roleFilter.value,
        hiringFilter.value
    );

    // Firebase:
    // Filter senior profiles

}

// ===============================
// RESET
// ===============================

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    companyFilter.selectedIndex = 0;

    roleFilter.selectedIndex = 0;

    hiringFilter.selectedIndex = 0;

});

// ===============================
// VIEW PROFILE BUTTONS
// ===============================

const buttons = document.querySelectorAll(".profile-card button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        window.location.href = "senior-details.html";

    });

});

// ===============================
// QUICK ACTIONS
// ===============================



// ===============================
// LOGOUT
// ===============================

const logout = document.getElementById("logout");

logout.addEventListener("click", function(e){

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.clear();

        window.location.href = "auth.html";

    }

});
const avatar = document.getElementById("navAvatar");
const dropdown = document.getElementById("profileDropdown");

avatar.addEventListener("click", function () {

    if(dropdown.style.display === "block"){
        dropdown.style.display = "none";
    }else{
        dropdown.style.display = "block";
    }

});

window.addEventListener("click", function(e){

    if(!e.target.closest(".profile-menu")){
        dropdown.style.display = "none";
    }

});

// ===============================
// FUTURE FIREBASE
// ===============================

/*

Later this dashboard will:

✔ Load Student Details

✔ Fetch Senior Profiles

✔ Search Seniors

✔ Filter Companies

✔ Skill Match

✔ Recent Updates

✔ Placement Statistics

✔ Notifications

✔ Logout using Firebase Authentication

*/