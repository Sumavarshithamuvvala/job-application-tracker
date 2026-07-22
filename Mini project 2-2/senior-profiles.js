// ==========================================
// FIREBASE IMPORTS
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ==========================================
// ELEMENTS
// ==========================================

const profilesGrid = document.getElementById("profilesGrid");

const searchInput = document.getElementById("searchInput");

const companyFilter = document.getElementById("companyFilter");

const roleFilter = document.getElementById("roleFilter");

const branchFilter = document.getElementById("branchFilter");

const batchFilter = document.getElementById("batchFilter");

const sortFilter = document.getElementById("sortFilter");

const resetFilters = document.getElementById("resetFilters");


// ==========================================
// GLOBAL ARRAY
// ==========================================

let placements = [];


// ==========================================
// LOAD ALL PLACEMENTS
// ==========================================
// ==========================================
// LOAD ALL PLACEMENTS
// ==========================================

async function loadProfiles() {

    try {

        const q = query(
            collection(db, "placements"),
            orderBy("studentName")
        );

        const snapshot = await getDocs(q);

        placements = [];

        snapshot.forEach((docSnap) => {

            placements.push({

                id: docSnap.id,

                ...docSnap.data()

            });

        });

        console.log("Placements:", placements);

        displayProfiles(placements);

    }

    catch (error) {

        console.error(error);

        profilesGrid.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Failed to load senior profiles.
            </h2>
        `;

    }

}

// ==========================================
// DISPLAY PROFILE CARDS
// ==========================================

// ==========================================
// DISPLAY PROFILE CARDS
// ==========================================

function displayProfiles(list) {

    profilesGrid.innerHTML = "";

    if (list.length === 0) {

        profilesGrid.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                No Senior Profiles Found
            </h2>
        `;

        return;
    }

    list.forEach(profile => {

        const card = document.createElement("div");

        card.className = "profile-card";

        card.innerHTML = `

            <div class="profile-image">

                <i class="fa-solid fa-user"></i>

            </div>

            <div class="profile-info">

                <h3>${profile.studentName || ""}</h3>

                <p>
                    ${profile.branch || ""} • ${profile.graduationYear || ""} Batch
                </p>

                <p>
                    ${profile.companyName || ""}
                </p>

                <p>
                    ${profile.roleOffered || ""}
                </p>

            </div>

        `;

        // Make the entire card clickable
        card.addEventListener("click", () => {

            sessionStorage.setItem("placementId", profile.id);

            window.location.href = "senior-details.html";

        });

        profilesGrid.appendChild(card);

    });

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = placements.filter(profile =>

        profile.studentName?.toLowerCase().includes(value)

        ||

        profile.companyName?.toLowerCase().includes(value)

        ||

        profile.roleOffered?.toLowerCase().includes(value)

    );

    displayProfiles(filtered);

});


// ==========================================
// INITIAL LOAD
// ==========================================

loadProfiles();
// ==========================================
// APPLY FILTERS
// ==========================================

function applyFilters() {

    let filtered = [...placements];

    // Search

    const searchValue = searchInput.value.toLowerCase();

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

    // Branch

    if (branchFilter.value !== "All Branches") {

        filtered = filtered.filter(profile =>

            profile.branch === branchFilter.value

        );

    }

    // Batch

    if (batchFilter.value !== "All Batches") {

        filtered = filtered.filter(profile =>

            profile.graduationYear === batchFilter.value

        );

    }

    // Sort

    if (sortFilter.value === "A-Z") {

        filtered.sort((a, b) =>

            a.studentName.localeCompare(b.studentName)

        );

    }

    else if (sortFilter.value === "Company") {

        filtered.sort((a, b) =>

            a.companyName.localeCompare(b.companyName)

        );

    }

    else if (sortFilter.value === "Newest Batch") {

        filtered.sort((a, b) =>

            Number(b.graduationYear) - Number(a.graduationYear)

        );

    }

    else if (sortFilter.value === "Oldest Batch") {

        filtered.sort((a, b) =>

            Number(a.graduationYear) - Number(b.graduationYear)

        );

    }

    displayProfiles(filtered);

}
companyFilter.addEventListener("change", applyFilters);
roleFilter.addEventListener("change", applyFilters);
branchFilter.addEventListener("change", applyFilters);
batchFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

resetFilters.addEventListener("click", () => {

    searchInput.value = "";

    companyFilter.selectedIndex = 0;

    roleFilter.selectedIndex = 0;

    branchFilter.selectedIndex = 0;

    batchFilter.selectedIndex = 0;

    sortFilter.selectedIndex = 0;

    displayProfiles(placements);

});