// ======================================
// Settings Page JavaScript
// ======================================

// Buttons
const saveButtons = document.querySelectorAll(".save-btn");
const logoutBtn = document.getElementById("logoutBtn");

// Theme
const themeSelect = document.querySelector("select");

// Notification Checkboxes
const checkboxes = document.querySelectorAll(
    '.toggle input[type="checkbox"]'
);

// ======================================
// Save Buttons
// ======================================

saveButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Changes Saved Successfully!");

    });

});

// ======================================
// Theme Change
// ======================================

themeSelect.addEventListener("change", () => {

    const selectedTheme = themeSelect.value;

    alert(selectedTheme + " Selected");

    // Later:
    // Save theme in Firebase / Local Storage

});

// ======================================
// Notifications
// ======================================

checkboxes.forEach(box => {

    box.addEventListener("change", () => {

        console.log("Notification Preference Updated");

        // Later save into Firestore

    });

});

// ======================================
// Logout
// ======================================

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if(confirmLogout){

        // Later Firebase Sign Out

        localStorage.clear();

        window.location.href = "auth.html";

    }

});

