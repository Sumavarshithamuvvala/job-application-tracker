// ============================================
// FIREBASE IMPORTS
// ============================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ============================================
// ELEMENTS
// ============================================

const studentName = document.getElementById("studentName");
const studentBranch = document.getElementById("studentBranch");
const welcomeName = document.getElementById("welcomeName");

const dashboardAvatar = document.getElementById("dashboardAvatar");
const navAvatar = document.getElementById("navAvatar");

const totalSeniors = document.getElementById("totalSeniors");
const totalCompanies = document.getElementById("totalCompanies");
const totalPlacements = document.getElementById("totalPlacements");
const skillMatch = document.getElementById("skillMatch");

const featuredProfiles = document.getElementById("featuredProfiles");
const recentUpdates = document.getElementById("recentUpdates");

const searchInput = document.getElementById("searchInput");

const companyFilter = document.getElementById("companyFilter");
const roleFilter = document.getElementById("roleFilter");
const hiringFilter = document.getElementById("hiringFilter");

const resetBtn = document.getElementById("resetBtn");

const sidebarLogout = document.getElementById("sidebarLogout");
const dropdownLogout = document.getElementById("dropdownLogout");

const dropdown = document.getElementById("profileDropdown");


// ============================================
// GLOBAL DATA
// ============================================

let allPlacements = [];


// ============================================
// INITIALS
// ============================================

function getInitials(name) {

    if (!name) return "";

    return name
        .trim()
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

}


// ============================================
// LOAD LOGGED IN STUDENT
// ============================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "auth.html";
        return;

    }

    try {

        const studentRef = doc(db, "students", user.uid);

        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {

            const data = studentSnap.data();

            studentName.textContent = data.fullName || "Student";

            welcomeName.textContent = data.fullName || "Student";

            studentBranch.textContent = data.branch || "";

            const initials = getInitials(data.fullName);

            dashboardAvatar.textContent = initials;

            navAvatar.textContent = initials;

        }

        await loadDashboardStats();

    }

    catch (error) {

        console.error(error);

    }

});


// ============================================
// LOAD DASHBOARD STATISTICS
// ============================================

async function loadDashboardStats() {

    try {

        const snapshot = await getDocs(
            collection(db, "placements")
        );

        const companies = new Set();

        allPlacements = [];

        snapshot.forEach(docSnap => {

            const data = docSnap.data();

            allPlacements.push({

                id: docSnap.id,

                ...data

            });

            if (data.companyName) {

                companies.add(data.companyName);

            }

        });

        totalSeniors.textContent = allPlacements.length;

        totalPlacements.textContent = allPlacements.length;

        totalCompanies.textContent = companies.size;

        // Will calculate later

        skillMatch.textContent = "--";
        loadFeaturedProfiles();
loadActivityFeed();

    }

    catch (error) {

        console.log(error);

    }

}
// ============================================
// DISPLAY FEATURED SENIOR PROFILES
// ============================================

function displayFeaturedProfiles(list) {

    featuredProfiles.innerHTML = "";

    if (list.length === 0) {

        featuredProfiles.innerHTML = `
            <h3>No Senior Profiles Found</h3>
        `;

        return;

    }

    // Show only first 3 profiles
    list.slice(0, 3).forEach(profile => {

        const initials = getInitials(profile.studentName || "Student");

        const card = document.createElement("div");

        card.className = "profile-card";

        card.innerHTML = `

            <div class="profile-avatar">
                ${initials}
            </div>

            <h3>${profile.studentName || ""}</h3>

            <p>
                <strong>Company:</strong>
                ${profile.companyName || ""}
            </p>

            <p>
                <strong>Role:</strong>
                ${profile.roleOffered || ""}
            </p>

            <p>
                <strong>Hiring:</strong>
                ${profile.hiringType || ""}
            </p>

            <button class="viewProfileBtn">
                View Profile
            </button>

        `;

        card.querySelector(".viewProfileBtn").addEventListener("click", () => {

            sessionStorage.setItem("placementId", profile.id);

            window.location.href = "senior-details.html";

        });

        featuredProfiles.appendChild(card);

    });

}


// ============================================
// LOAD FEATURED SENIORS
// ============================================

function loadFeaturedProfiles() {

    displayFeaturedProfiles(allPlacements);

}

loadFeaturedProfiles();


// ============================================
// SEARCH + FILTER
// ============================================

function applyFilters() {

    let filtered = [...allPlacements];

    // Search

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    if (searchValue !== "") {

        filtered = filtered.filter(profile =>

            profile.studentName?.toLowerCase().includes(searchValue)

            ||

            profile.companyName?.toLowerCase().includes(searchValue)

            ||

            profile.roleOffered?.toLowerCase().includes(searchValue)

        );

    }

    // Company

    if (companyFilter.value !== "All Companies") {

        filtered = filtered.filter(profile =>

            profile.companyName === companyFilter.value

        );

    }

    // Role

    if (roleFilter.value !== "All Roles") {

        filtered = filtered.filter(profile =>

            profile.roleOffered === roleFilter.value

        );

    }

    // Hiring

    if (hiringFilter.value !== "All Hiring") {

        filtered = filtered.filter(profile =>

            profile.hiringType === hiringFilter.value

        );

    }

    displayFeaturedProfiles(filtered);

}


// ============================================
// EVENTS
// ============================================

searchInput.addEventListener("keyup", applyFilters);

companyFilter.addEventListener("change", applyFilters);

roleFilter.addEventListener("change", applyFilters);

hiringFilter.addEventListener("change", applyFilters);


// ============================================
// RESET FILTERS
// ============================================

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    companyFilter.selectedIndex = 0;

    roleFilter.selectedIndex = 0;

    hiringFilter.selectedIndex = 0;

    displayFeaturedProfiles(allPlacements);

});
// ============================================
// RECENT UPDATES
// ============================================

function loadRecentUpdates() {

    recentUpdates.innerHTML = "";

    if (allPlacements.length === 0) {

        recentUpdates.innerHTML = `
            <li>No recent updates available.</li>
        `;

        return;

    }

    allPlacements
        .slice(0, 5)
        .forEach(profile => {

            const li = document.createElement("li");

            li.innerHTML = `
                🎉
                <strong>${profile.companyName || "Company"}</strong>
                added a new
                <strong>${profile.roleOffered || "Role"}</strong>
                profile by
                <strong>${profile.studentName || "Student"}</strong>.
            `;

            recentUpdates.appendChild(li);

        });

}


// ============================================
// NAVBAR DROPDOWN
// ============================================

navAvatar.addEventListener("click", (e) => {

    e.stopPropagation();

    dropdown.style.display =
        dropdown.style.display === "block"
            ? "none"
            : "block";

});

window.addEventListener("click", (e) => {

    if (!e.target.closest(".profile-menu")) {

        dropdown.style.display = "none";

    }

});


// ============================================
// LOGOUT
// ============================================

async function logoutUser(e) {

    e.preventDefault();

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        window.location.href = "auth.html";

    }

    catch (error) {

        alert(error.message);

    }

}

sidebarLogout.addEventListener(
    "click",
    logoutUser
);

dropdownLogout.addEventListener(
    "click",
    logoutUser
);


// ============================================
// INITIALIZE DASHBOARD
// ============================================

window.addEventListener("load", () => {

    dropdown.style.display = "none";

});
// ============================================
// ACTIVITY FEED
// ============================================

// ============================================
// ACTIVITY FEED
// ============================================

function loadActivityFeed() {

    const activityFeed = document.getElementById("activityFeed");

    activityFeed.innerHTML = "";

    if (allPlacements.length === 0) {

        activityFeed.innerHTML =
            "<li>No recent activities available.</li>";

        return;

    }

    // Sort by createdAt (latest first)
    allPlacements.sort((a, b) => {

        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;

        return timeB - timeA;

    });

    // Show only latest 5 activities
    const latestActivities = allPlacements.slice(0, 5);

    latestActivities.forEach(profile => {

        const li = document.createElement("li");

        li.innerHTML = `
            🎉
            <strong>${profile.studentName}</strong>
            shared placement experience at
            <strong>${profile.companyName}</strong>
            as
            <strong>${profile.roleOffered}</strong>.
        `;

        activityFeed.appendChild(li);

    });

}