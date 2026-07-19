// ============================================
// MODAL
// ============================================

const openModal = document.getElementById("openModal");
const modal = document.getElementById("placementModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".cancel");

openModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

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

// ============================================
// COMPANY → ROLE DATA
// ============================================

const companyRoles = {

    "Google": [

        "Software Engineer",

        "Data Analyst",

        "Cloud Engineer",

        "Product Engineer"

    ],

    "Amazon": [

        "SDE",

        "Business Analyst",

        "Data Engineer",

        "Cloud Support"

    ],

    "Microsoft": [

        "Software Engineer",

        "Program Manager",

        "Data Scientist"

    ],

    "Deloitte": [

        "Analyst",

        "Data Analyst",

        "Associate Analyst",

        "Consultant"

    ]

};

// ============================================
// ROLE DROPDOWN
// ============================================

const companySelect = document.getElementById("companySelect");

const roleSelect = document.getElementById("roleSelect");

companySelect.addEventListener("change", function () {

    roleSelect.innerHTML = "<option>Select Role</option>";

    const roles = companyRoles[this.value];

    if (!roles) return;

    roles.forEach(role => {

        const option = document.createElement("option");

        option.value = role;

        option.textContent = role;

        roleSelect.appendChild(option);

    });

});

// ============================================
// SKILLS DATA
// ============================================

const skills = {

    "Programming Languages": [
        "Java",
        "Python",
        "C",
        "C++"
    ],

    "Web Development": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Spring Boot"
    ],

    "Database & Cloud": [
        "SQL",
        "AWS",
        "Azure"
    ],

    "Data Analytics": [
        "Excel",
        "Power BI",
        "Tableau"
    ],

    "Version Control": [
        "Git",
        "GitHub"
    ],

    "Core Subjects": [
        "DSA",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "OOP"
    ]

};

// ============================================
// GENERATE SKILL SLIDERS
// ============================================

const skillsContainer = document.getElementById("skillsContainer");

function createSkillSliders() {

    skillsContainer.innerHTML = "";

    Object.keys(skills).forEach(group => {

        const skillGroup = document.createElement("div");

        skillGroup.className = "skill-group";

        skillGroup.innerHTML = `<h3>${group}</h3>`;

        skills[group].forEach(skill => {

            skillGroup.innerHTML += `

                <div class="skill-row">

                    <label>${skill}</label>

                    <input
                        type="range"
                        min="1"
                        max="5"
                        value="3"
                        class="slider">

                    <div class="skill-value">3</div>

                </div>

            `;

        });

        skillsContainer.appendChild(skillGroup);

    });

}

createSkillSliders();

// ============================================
// LIVE SLIDER VALUES
// ============================================

const progressBar = document.querySelector(".progress-bar");

const overallScore = document.getElementById("overallScore");

const skillLevel = document.getElementById("skillLevel");

function initializeSliders() {

    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {

        slider.addEventListener("input", function () {

            this.nextElementSibling.textContent = this.value;

            calculateOverall();

        });

    });

}

// ============================================
// CALCULATE SCORE
// ============================================

function calculateOverall() {

    const sliders = document.querySelectorAll(".slider");

    let total = 0;

    sliders.forEach(slider => {

        total += Number(slider.value);

    });

    const maxScore = sliders.length * 5;

    const percentage = Math.round((total / maxScore) * 100);

    progressBar.style.width = percentage + "%";

    overallScore.innerHTML = percentage + "%";

    if (percentage < 40) {

        skillLevel.innerHTML = "Beginner";

    }

    else if (percentage < 60) {

        skillLevel.innerHTML = "Intermediate";

    }

    else if (percentage < 80) {

        skillLevel.innerHTML = "Advanced";

    }

    else {

        skillLevel.innerHTML = "Excellent";

    }

}

initializeSliders();

calculateOverall();

// ============================================
// SEARCH PLACEMENT RECORDS
// ============================================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll(".placement-table tbody tr");

    rows.forEach(row => {

        const text = row.innerText.toLowerCase();

        if (text.includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

// ============================================
// TOAST MESSAGE
// ============================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ============================================
// SAVE PLACEMENT
// ============================================

const placementForm = document.getElementById("placementForm");

placementForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Later:
    // Save to Firebase

    showToast("Placement Record Saved Successfully!");

    placementForm.reset();

    modal.style.display = "none";

    // Reset role dropdown

    roleSelect.innerHTML = "<option>Select Role</option>";

    // Reset sliders

    document.querySelectorAll(".slider").forEach(slider => {

        slider.value = 3;

        slider.nextElementSibling.textContent = "3";

    });

    calculateOverall();

});

// ============================================
// SAMPLE FUNCTION
// (Replace with Firebase later)
// ============================================

function addPlacementToTable(data) {

    const tbody = document.querySelector(".placement-table tbody");

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>${data.student}</td>

        <td>${data.company}</td>

        <td>${data.role}</td>

        <td>${data.batch}</td>

        <td>${data.package}</td>

        <td>

            <span class="status active">

                Selected

            </span>

        </td>

        <td>

            <button class="edit">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

    `;

    tbody.prepend(row);

}

// ============================================
// READY
// ============================================

console.log("Placement Module Loaded Successfully.");