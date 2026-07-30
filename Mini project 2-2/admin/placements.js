
import { db } from "../firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
    getDoc,
    setDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

console.log("placements.js loaded");

const placementCollection = collection(db, "placements");
// ===================================
// CREATE MASTER TOPICS (FIRST TIME)
// ===================================

async function initializeMasterTopics() {

    const docRef = doc(db, "interviewTopics", "masterTopics");

    const snap = await getDoc(docRef);

    if (snap.exists()) return;

    await setDoc(docRef, {

        Programming: [
            "Java",
            "Python",
            "C",
            "C++",
            "JavaScript"
        ],

        DSA: [
            "Arrays",
            "Strings",
            "Linked List",
            "Stack",
            "Queue",
            "Trees",
            "Graphs",
            "DP",
            "Sliding Window",
            "Binary Search",
            "Recursion",
            "HashMap"
        ],

        SQL: [
            "Joins",
            "GROUP BY",
            "HAVING",
            "Window Functions",
            "CTE",
            "Indexing"
        ],

        DBMS: [
            "ACID",
            "Transactions",
            "Keys",
            "Normalization"
        ],

        OS: [
            "Deadlock",
            "Scheduling",
            "Process vs Thread",
            "Memory Management"
        ],

        CN: [
            "TCP/IP",
            "OSI Model",
            "HTTP",
            "DNS"
        ],

       HR: [
    "Tell Me About Yourself",
    "Strengths",
    "Weaknesses",
    "Why Our Company?",
    "Conflict Handling"
],

Resources: [
    "Striver",
    "Love Babbar",
    "Apna College",
    "LeetCode",
    "GeeksforGeeks",
    "NPTEL",
    "Coursera",
    "Udemy",
    "YouTube",
    "ChatGPT"
]

    });

    console.log("Master Topics Created");

   
}
async function loadTopics() {

    const docRef = doc(db, "interviewTopics", "masterTopics");
    const snap = await getDoc(docRef);

    if (!snap.exists()) return;

    const data = snap.data();
    const mapping = {

    Programming: "Programming Languages",
    DSA: "DSA",
    SQL: "SQL",
    DBMS: "DBMS",
    OS: "Operating Systems",
    CN: "Computer Networks",
    HR: "HR Interview"

};
for (const firestoreField in mapping) {

    const title = mapping[firestoreField];

    const card = [...document.querySelectorAll(".topic-card")]
        .find(c => c.querySelector("h4").innerText === title);

    if (!card) continue;

    const grid = card.querySelector(".checkGrid");

    const otherLabel = grid.querySelector("label:last-child");

    grid.innerHTML = "";

    data[firestoreField].forEach(topic => {

        const label = document.createElement("label");

        label.innerHTML = `
            <input type="checkbox" value="${topic}">
            ${topic}
        `;

        grid.appendChild(label);

    });

    grid.appendChild(otherLabel);

}

    console.log(data);

}


initializeMasterTopics();
//loadResources();
// =========================
// ELEMENTS
// =========================

const modal = document.getElementById("placementModal");

const openBtn = document.getElementById("openModal");

const closeBtn = document.querySelector(".close");

const cancelBtn = document.querySelector(".cancel");

const placementForm = document.getElementById("placementForm");

const tableBody = document.getElementById("placementTableBody");


// =========================
// OPEN MODAL
// =========================

openBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});
// =========================
// CLOSE MODAL
// =========================

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

cancelBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

console.log("Placement Module Loaded Successfully.");
console.log("Form =", placementForm);
console.log(db);
// ===================================
// SKILLS LIST
// ===================================

const allSkills = [

    "Java",
    "Python",
    "C",
    "C++",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Spring Boot",
    "SQL",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Excel",
    "Power BI",
    "Tableau",
    "Python Pandas",
    "NumPy",
    "Machine Learning",
    "AWS",
    "Azure",
    "Git",
    "GitHub",
    "DSA",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "OOP",
    "Aptitude",
    "Communication",
    "Problem Solving"

];

const skillInput = document.getElementById("skillInput");

const suggestionBox = document.getElementById("skillsSuggestions");

const selectedSkillsContainer =
document.getElementById("selectedSkills");

const hiddenSkills =
document.getElementById("technicalSkills");

let selectedSkills = [];

//let editingPlacementId = null;
let editingPlacementId = null;
let editingOriginalData = null;


function updateHiddenSkills(){

    hiddenSkills.value =
    JSON.stringify(selectedSkills);

}

function renderSelectedSkills(){

    selectedSkillsContainer.innerHTML = "";

    selectedSkills.forEach(skill=>{

        const tag =
        document.createElement("div");

        tag.className = "skill-tag";

        tag.innerHTML = `
            ${skill}
            <span data-skill="${skill}">
            ✕
            </span>
        `;

        selectedSkillsContainer.appendChild(tag);

    });

    updateHiddenSkills();

}

skillInput.addEventListener("input", () => {

    const value = skillInput.value.trim().toLowerCase();

    suggestionBox.innerHTML = "";

    if (value === "") return;

    const filtered = allSkills.filter(skill =>
        skill.toLowerCase().includes(value) &&
        !selectedSkills.includes(skill)
    );

    filtered.forEach(skill => {

        const item = document.createElement("div");

        item.className = "suggestion-item";

        item.innerText = skill;

        suggestionBox.appendChild(item);

    });

    // If no matching skill exists, show Add option
    if (filtered.length === 0) {

        const addItem = document.createElement("div");

        addItem.className = "suggestion-item add-new";

        addItem.innerText = `➕ Add "${skillInput.value.trim()}"`;

        addItem.dataset.newSkill = skillInput.value.trim();

        suggestionBox.appendChild(addItem);

    }

});
// ===================================
// CLICK ON A SUGGESTION
// ===================================

suggestionBox.addEventListener("click", (e) => {

    if (!e.target.classList.contains("suggestion-item")) return;

    let skill;

    if (e.target.dataset.newSkill) {

        skill = e.target.dataset.newSkill;

        // Add to master skill list
        if (!allSkills.includes(skill)) {
            allSkills.push(skill);
        }

    } else {

        skill = e.target.innerText;

    }

    if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
    }

    renderSelectedSkills();

    skillInput.value = "";

    suggestionBox.innerHTML = "";

});
// ===================================
// REMOVE SKILL
// ===================================

selectedSkillsContainer.addEventListener("click", (e) => {

    const removeBtn = e.target.closest("span");

    if (!removeBtn) return;

    const skill = removeBtn.dataset.skill;

    selectedSkills = selectedSkills.filter(s => s !== skill);
    console.log(selectedSkills);

    renderSelectedSkills();

});

function getCheckedValues(className) {

    return [...document.querySelectorAll("." + className + ":checked")]

        .map(item => item.value);

}


function getCheckedTopics(cardTitle) {

    const card = [...document.querySelectorAll(".topic-card")]

        .find(c => c.querySelector("h4").innerText === cardTitle);

    if (!card) return [];

    return [...card.querySelectorAll("input[type='checkbox']:checked")]

        .map(cb => cb.value);

}
// ===================================
// SAVE OTHER TOPICS TO MASTER LIST
// ===================================

// ===================================
// SHOW / HIDE OTHER INPUT
// ===================================
// ===================================
// SHOW / HIDE OTHER RESOURCE INPUT
// ===================================

document.addEventListener("change", function (e) {

    if (!e.target.classList.contains("resourceOtherCheckbox")) return;

    const otherInput = e.target.closest(".checkGrid").nextElementSibling;

    if (!otherInput) return;

    otherInput.style.display = e.target.checked ? "block" : "none";

    if (!e.target.checked) {
        otherInput.querySelector("input").value = "";
    }

});
document.querySelectorAll(".otherCheckbox").forEach(checkbox => {

    checkbox.addEventListener("change", function () {

        const topicCard = this.closest(".topic-card");

        if (!topicCard) return;

        const otherInput = topicCard.querySelector(".otherInput");

        if (!otherInput) return;

        otherInput.style.display = this.checked ? "block" : "none";

        if (!this.checked) {
            otherInput.querySelector("input").value = "";
        }

    });

});
async function saveOtherTopics() {

    const masterRef = doc(db, "interviewTopics", "masterTopics");

    const cards = document.querySelectorAll(".topic-card");

    for (const card of cards) {

        const category = card.querySelector("h4").innerText;

        const otherCheckbox = card.querySelector(".otherCheckbox");

        const otherInput = card.querySelector(".otherInput input");

        if (
            otherCheckbox &&
            otherCheckbox.checked &&
            otherInput &&
            otherInput.value.trim() !== ""
        ) {

            let firestoreField = "";

            switch (category) {

                case "Programming Languages":
                    firestoreField = "Programming";
                    break;

                case "DSA":
                    firestoreField = "DSA";
                    break;

                case "SQL":
                    firestoreField = "SQL";
                    break;

                case "DBMS":
                    firestoreField = "DBMS";
                    break;

                case "Operating Systems":
                    firestoreField = "OS";
                    break;

                case "Computer Networks":
                    firestoreField = "CN";
                    break;

                case "HR Interview":
                    firestoreField = "HR";
                    break;

            }

            if (firestoreField !== "") {

                await updateDoc(masterRef, {
                    [firestoreField]: arrayUnion(otherInput.value.trim())
                });

            }

        }

    }
    // Save Other Resource

const resourceOther = document.querySelector(".resourceOtherCheckbox");

const resourceInput = document.querySelector(".otherInput input");

if (
    resourceOther &&
    resourceOther.checked &&
    resourceInput &&
    resourceInput.value.trim() !== ""
) {

    await updateDoc(masterRef, {
        Resources: arrayUnion(resourceInput.value.trim())
    });

}

}

placementForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const placementData = {

            // =========================
            // Basic Placement Details
            // =========================

            studentName: document.getElementById("studentName").value,
            graduationYear: document.getElementById("graduationYear").value,
            branch: document.getElementById("branch").value,
            companyName: document.getElementById("companyName").value,
            companyType: document.getElementById("companyType").value,
            roleOffered: document.getElementById("roleOffered").value,
            jobType: document.getElementById("jobType").value,
            workMode: document.getElementById("workMode").value,
            location: document.getElementById("location").value,
            package: document.getElementById("package").value,
            placementDate: document.getElementById("placementDate").value,

            // =========================
            // Academic Profile
            // =========================

            cgpa: document.getElementById("cgpa").value,
            cgpaCutoff: document.getElementById("cgpaCutoff").value,
            activeBacklogs: document.getElementById("activeBacklogs").value,

            // =========================
            // Eligibility Criteria
            // =========================

            minimumCGPA: document.getElementById("minimumCGPA").value,
            eligibleBranches: document.getElementById("eligibleBranches").value,
            onlineAssessment: document.getElementById("onlineAssessment").value,
            oaMandatory: document.getElementById("oaMandatory").value,
            interviewRounds: document.getElementById("interviewRounds").value,
            additionalCriteria: document.getElementById("additionalCriteria").value,
            eligibleInitially: document.getElementById("eligibleInitially").value,
            eligibilityImprovement: document.getElementById("eligibilityImprovement").value,

            // =========================
            // Skills
            // =========================

            technicalSkills: selectedSkills,

            // =========================
            // Coding Preparation
            // =========================

            codingPlatform: document.getElementById("codingPlatform").value,
            problemsSolved: document.getElementById("problemsSolved").value,
            practiceFrequency: document.getElementById("practiceFrequency").value,

            // =========================
            // Projects
            // =========================

            projectCount: document.getElementById("projectCount").value,
            projectName: document.getElementById("projectName").value,
            projectDomain: document.getElementById("projectDomain").value,
            projectTechnologies: document.getElementById("projectTechnologies").value,
            projectDescription: document.getElementById("projectDescription").value,
            projectDiscussed: document.getElementById("projectDiscussed").value,
            githubLink: document.getElementById("githubLink").value,

            // =========================
            // Interview
            // =========================

            interviewDifficulty: document.getElementById("interviewDifficulty").value,
            codingDifficulty: document.getElementById("codingDifficulty").value,
            interviewExperience: document.getElementById("interviewExperience").value,
            preparationStrategy: document.getElementById("preparationStrategy").value,
            mistakesMade: document.getElementById("mistakesMade").value,

            roundsFaced: getCheckedValues("rounds"),

            // =========================
            // Preparation Journey
            // =========================

preparationDuration: document.getElementById("preparationDuration").value,
resourcesUsed: [
    ...getCheckedValues("resource"),
    ...(document.querySelector(".resourceOtherCheckbox")?.checked &&
       document.querySelector(".otherInput input")?.value.trim()
        ? [document.querySelector(".otherInput input").value.trim()]
        : [])
],

            // =========================
            // Advice
            // =========================

            wishStartedEarlier: document.getElementById("wishStartedEarlier").value,
            roadmap: document.getElementById("roadmap").value,

            // =========================
            // Frequently Asked Topics
            // =========================

            programmingTopics: getCheckedTopics("Programming Languages"),
            dsaTopics: getCheckedTopics("DSA"),
            sqlTopics: getCheckedTopics("SQL"),
            dbmsTopics: getCheckedTopics("DBMS"),
            osTopics: getCheckedTopics("Operating Systems"),
            cnTopics: getCheckedTopics("Computer Networks"),
            hrTopics: getCheckedTopics("HR Interview"),

            // =========================
            // Contact Details
            // =========================

            linkedin: document.getElementById("linkedin").value,
            email: document.getElementById("email").value

        };


        console.log("Saving placement:", placementData);
        
console.log(placementData);
await saveOtherTopics();

        await saveOtherTopics();

        // =========================
        // EDIT EXISTING RECORD
        // =========================

       if (editingPlacementId) {

    const updatedData = {
        ...editingOriginalData,
        ...placementData
    };

    // Keep original creation timestamp
    if (editingOriginalData?.createdAt) {
        updatedData.createdAt = editingOriginalData.createdAt;
    }

    await updateDoc(
        doc(db, "placements", editingPlacementId),
        updatedData
    );

    alert("Placement Updated Successfully!");

    editingPlacementId = null;
    editingOriginalData = null;
}

        // =========================
        // ADD NEW RECORD
        // =========================

        else {

            placementData.createdAt = serverTimestamp();

            await addDoc(
                placementCollection,
                placementData
            );

            alert("Placement Saved Successfully!");

        }


       placementForm.reset();

selectedSkills = [];

renderSelectedSkills();

editingPlacementId = null;
editingOriginalData = null;

modal.style.display = "none";

await loadPlacements();

    }

    catch (error) {

        console.error("Save Error:", error);

        alert(error.message);

    }

});
// ======================================
// Load Placement Records
// ======================================

async function loadPlacements() {

    tableBody.innerHTML = "";

    const q = query(
        placementCollection,
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

  //  console.log(snapshot.docs.length);
    console.log("TOTAL DOCUMENTS:", snapshot.size);

snapshot.forEach((doc) => {
    console.log("ID:", doc.id);
    console.log("DATA:", doc.data());
});

    snapshot.forEach((doc) => {

        const data = doc.data();

       const row = `
<tr>
    <td>${data.studentName || "-"}</td>
    <td>${data.companyName || "-"}</td>
    <td>${data.roleOffered || "-"}</td>
    <td>${data.graduationYear || "-"}</td>
    <td>${data.package || "-"}</td>
    <td>Verified</td>
    <td>
        <button class="editBtn" data-id="${doc.id}">Edit</button>
        <button class="deleteBtn" data-id="${doc.id}">Delete</button>
    </td>
</tr>
`;

        tableBody.innerHTML += row;

    });

}
loadPlacements();

tableBody.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const id = e.target.dataset.id;

    const confirmDelete = confirm("Delete this placement record?");

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "placements", id));

    alert("Record deleted successfully!");

    loadPlacements();

});

// ======================================
// Edit Placement Record
// ======================================


tableBody.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("editBtn")) return;

    const id = e.target.dataset.id;

    editingPlacementId = id;

    try {

        const snapshot = await getDocs(placementCollection);

        const selectedDoc =
            snapshot.docs.find(item => item.id === id);

        if (!selectedDoc) {

            alert("Placement record not found.");

            return;

        }

        const data = selectedDoc.data();

console.log("Editing record:", data);

editingOriginalData = { ...data };

        // =========================
        // Basic Details
        // =========================

        document.getElementById("studentName").value =
            data.studentName || "";

        document.getElementById("graduationYear").value =
            data.graduationYear || "";

        document.getElementById("branch").value =
            data.branch || "";

        document.getElementById("companyName").value =
            data.companyName || "";

        document.getElementById("companyType").value =
            data.companyType || "";

        document.getElementById("roleOffered").value =
            data.roleOffered || "";

        document.getElementById("jobType").value =
            data.jobType || "";

        document.getElementById("workMode").value =
            data.workMode || "";

        document.getElementById("location").value =
            data.location || "";

        document.getElementById("package").value =
            data.package || "";

        document.getElementById("placementDate").value =
            data.placementDate || "";


        // =========================
        // Academic Profile
        // =========================

        document.getElementById("cgpa").value =
            data.cgpa || "";

        document.getElementById("cgpaCutoff").value =
            data.cgpaCutoff || "";

        document.getElementById("activeBacklogs").value =
            data.activeBacklogs || "";


        // =========================
        // Eligibility
        // =========================

        document.getElementById("minimumCGPA").value =
            data.minimumCGPA || "";

        document.getElementById("eligibleBranches").value =
            data.eligibleBranches || "";

        document.getElementById("onlineAssessment").value =
            data.onlineAssessment || "";

        document.getElementById("oaMandatory").value =
            data.oaMandatory || "";

        document.getElementById("interviewRounds").value =
            data.interviewRounds || "";

        document.getElementById("additionalCriteria").value =
            data.additionalCriteria || "";

        document.getElementById("eligibleInitially").value =
            data.eligibleInitially || "";

        document.getElementById("eligibilityImprovement").value =
            data.eligibilityImprovement || "";


        // =========================
        // Technical Skills
        // =========================

        selectedSkills =
            Array.isArray(data.technicalSkills)
                ? [...data.technicalSkills]
                : [];

        renderSelectedSkills();


        // =========================
        // Coding Preparation
        // =========================

        document.getElementById("codingPlatform").value =
            data.codingPlatform || "";

        document.getElementById("problemsSolved").value =
            data.problemsSolved || "";

        document.getElementById("practiceFrequency").value =
            data.practiceFrequency || "";


        // =========================
        // Projects
        // =========================

        document.getElementById("projectCount").value =
            data.projectCount || "";

        document.getElementById("projectName").value =
            data.projectName || "";

        document.getElementById("projectDomain").value =
            data.projectDomain || "";

        document.getElementById("projectTechnologies").value =
            data.projectTechnologies || "";

        document.getElementById("projectDescription").value =
            data.projectDescription || "";

        document.getElementById("projectDiscussed").value =
            data.projectDiscussed || "";

        document.getElementById("githubLink").value =
            data.githubLink || "";


        // =========================
        // Interview
        // =========================

        document.getElementById("interviewDifficulty").value =
            data.interviewDifficulty || "";

        document.getElementById("codingDifficulty").value =
            data.codingDifficulty || "";

        document.getElementById("interviewExperience").value =
            data.interviewExperience || "";

        document.getElementById("preparationStrategy").value =
            data.preparationStrategy || "";

        document.getElementById("mistakesMade").value =
            data.mistakesMade || "";


        // =========================
        // Preparation Journey
        // =========================

        document.getElementById("preparationDuration").value =
            data.preparationDuration || "";


        // =========================
        // Advice
        // =========================

        document.getElementById("wishStartedEarlier").value =
            data.wishStartedEarlier || "";

        document.getElementById("roadmap").value =
            data.roadmap || "";


        // =========================
        // Contact Details
        // =========================

        document.getElementById("linkedin").value =
            data.linkedin || "";

        document.getElementById("email").value =
            data.email || "";


        // =========================
        // Restore Checkboxes
        // =========================

        function restoreCheckedValues(className, values) {

            const selected =
                Array.isArray(values) ? values : [];

            document
                .querySelectorAll("." + className)
                .forEach(checkbox => {

                    checkbox.checked =
                        selected.includes(checkbox.value);

                });

        }


        restoreCheckedValues(
            "rounds",
            data.roundsFaced
        );


        restoreCheckedValues(
            "resource",
            data.resourcesUsed
        );


        // =========================
        // Restore Topic Checkboxes
        // =========================

        function restoreTopicValues(cardTitle, values) {

            const selected =
                Array.isArray(values) ? values : [];

            const card =
                [...document.querySelectorAll(".topic-card")]
                    .find(c =>
                        c.querySelector("h4")?.innerText === cardTitle
                    );

            if (!card) return;

            card
                .querySelectorAll("input[type='checkbox']")
                .forEach(checkbox => {

                    checkbox.checked =
                        selected.includes(checkbox.value);

                });

        }


        restoreTopicValues(
            "Programming Languages",
            data.programmingTopics
        );

        restoreTopicValues(
            "DSA",
            data.dsaTopics
        );

        restoreTopicValues(
            "SQL",
            data.sqlTopics
        );

        restoreTopicValues(
            "DBMS",
            data.dbmsTopics
        );

        restoreTopicValues(
            "Operating Systems",
            data.osTopics
        );

        restoreTopicValues(
            "Computer Networks",
            data.cnTopics
        );

        restoreTopicValues(
            "HR Interview",
            data.hrTopics
        );


        // =========================
        // Open Modal
        // =========================

        modal.style.display = "flex";

        alert(
            "Edit mode opened. Modify the details and save."
        );

    }

    catch (error) {

        console.error("Edit Error:", error);

        alert(error.message);

    }

});