import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// -------------------------------------
// Get Placement ID
// -------------------------------------

const placementId = sessionStorage.getItem("placementId");

if (!placementId) {

    alert("No placement record selected.");

    window.location.href = "senior-profiles.html";

}

// -------------------------------------
// Initial Load
// -------------------------------------

loadSeniorDetails();

// -------------------------------------
// Load Senior Details
// -------------------------------------

async function loadSeniorDetails() {

    try {

        console.log("Placement ID:", placementId);

        const docRef = doc(db, "placements", placementId);

        const docSnap = await getDoc(docRef);

        console.log("Document Exists:", docSnap.exists());

        if (!docSnap.exists()) {

            alert("Placement record not found.");

            window.location.href = "senior-profiles.html";

            return;

        }

        const data = docSnap.data();

        console.log("Firestore Data:", data);

        // Fill all text fields
        fillBasicFields(data);

        // Fill Checkboxes
        fillCheckboxes(data);

        // Fill Topic Cards
        fillTopicCards(data);

    }

    catch (error) {

        console.error("Error:", error);

        alert("Error loading placement details.");

    }

}
// -------------------------------------
// Fill Textboxes, Textareas & Selects
// -------------------------------------

function fillBasicFields(data) {

    for (const key in data) {

        const element = document.getElementById(key);

        if (!element) continue;

        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA"
        ) {

            element.value = data[key] ?? "";

        }

        else if (element.tagName === "SELECT") {

            element.value = data[key] ?? "";

        }

    }

}

// -------------------------------------
// Fill Interview Rounds, Resources,
// Technical Skills
// -------------------------------------

function fillCheckboxes(data) {

    // Interview Rounds

    if (Array.isArray(data.roundsFaced)) {

        document.querySelectorAll(".rounds").forEach(box => {

            box.checked = data.roundsFaced.includes(box.value);

        });

    }

    // Resources Used

    if (Array.isArray(data.resourcesUsed)) {

        document.querySelectorAll(".resource").forEach(box => {

            box.checked = data.resourcesUsed.includes(box.value);

        });

    }

    // Technical Skills

    const container = document.getElementById("selectedSkills");

    if (container) {

        container.innerHTML = "";

        if (Array.isArray(data.technicalSkills)) {

            data.technicalSkills.forEach(skill => {

                const chip = document.createElement("span");

                chip.className = "skill-chip";

                chip.textContent = skill;

                container.appendChild(chip);

            });

        }

    }

}
// -------------------------------------
// Fill Topic Cards
// -------------------------------------

function fillTopicCards(data) {

    const fieldMap = {

        "Programming Languages": "programmingTopics",
        "DSA": "dsaTopics",
        "SQL": "sqlTopics",
        "DBMS": "dbmsTopics",
        "Operating Systems": "osTopics",
        "Computer Networks": "cnTopics",
        "HR Interview": "hrTopics"

    };

    document.querySelectorAll(".topic-card").forEach(card => {

        const heading = card.querySelector("h4");

        if (!heading) return;

        const firestoreField = fieldMap[heading.textContent.trim()];

        if (!firestoreField) return;

        const selectedTopics = data[firestoreField];

        if (!Array.isArray(selectedTopics)) return;

        card.querySelectorAll('input[type="checkbox"]').forEach(box => {

            box.checked = selectedTopics.includes(box.value);

        });

    });

}