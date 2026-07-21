import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
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
// Skills Worked With
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
// Interview Process & Experience
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

createdAt: serverTimestamp(),

// =========================
// Contact Details
// =========================

linkedin: document.getElementById("linkedin").value,

email: document.getElementById("email").value,

//phone: document.getElementById("phone").value


};
        console.log(placementData);

        await addDoc(placementCollection, placementData);

        alert("Placement Saved Successfully!");

    }
    catch(error){

        console.error(error);

        alert(error.message);

    }

});
