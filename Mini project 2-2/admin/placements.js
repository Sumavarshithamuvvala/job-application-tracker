
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
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

console.log("placements.js loaded");

const placementCollection = collection(db, "placements");
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

skillInput.addEventListener("input", ()=>{

    const value =
    skillInput.value.toLowerCase();

    suggestionBox.innerHTML = "";

    if(value==="") return;

    const filtered =
    allSkills.filter(skill=>

        skill.toLowerCase().includes(value)

        &&

        !selectedSkills.includes(skill)

    );

    filtered.forEach(skill=>{

        const item =
        document.createElement("div");

        item.className="suggestion-item";

        item.innerText=skill;

        suggestionBox.appendChild(item);

    });

});
// ===================================
// CLICK ON A SUGGESTION
// ===================================

suggestionBox.addEventListener("click", (e) => {

    if (!e.target.classList.contains("suggestion-item")) return;

    const skill = e.target.innerText;

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
            resourcesUsed: getCheckedValues("resource"),

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