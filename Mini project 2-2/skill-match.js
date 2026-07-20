// ==========================================
// Skill Match JavaScript
// ==========================================

// Student Skills (Later from Firebase)

const studentSkills = [
    "Java",
    "HTML",
    "CSS",
    "SQL",
    "Python"
];

// Senior Data (Later from Firebase)

const seniors = {

    google: [
        "Java",
        "DSA",
        "System Design",
        "SQL",
        "Git"
    ],

    microsoft: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git"
    ],

    amazon: [
        "Java",
        "SQL",
        "Spring Boot",
        "AWS",
        "DSA"
    ]

};

// Elements

const seniorSelect = document.getElementById("seniorSelect");
const seniorSkillsDiv = document.getElementById("seniorSkills");
const missingSkillsDiv = document.getElementById("missingSkills");
const percentage = document.getElementById("percentage");

// ==========================================
// Update Skill Match
// ==========================================

function updateSkillMatch() {

    const selected = seniorSelect.value;

    const seniorSkills = seniors[selected];

    // Display Senior Skills

    seniorSkillsDiv.innerHTML = "";

    seniorSkills.forEach(skill => {

        seniorSkillsDiv.innerHTML +=
        `<span>${skill}</span>`;

    });

    // Matching Skills

    const matchedSkills = studentSkills.filter(skill =>
        seniorSkills.includes(skill)
    );

    // Missing Skills

    const missingSkills = seniorSkills.filter(skill =>
        !studentSkills.includes(skill)
    );

    // Display Missing Skills

    missingSkillsDiv.innerHTML = "";

    missingSkills.forEach(skill => {

        missingSkillsDiv.innerHTML +=
        `<span>${skill}</span>`;

    });

    // Percentage

    const matchPercentage = Math.round(
        (matchedSkills.length / seniorSkills.length) * 100
    );

    percentage.innerText = matchPercentage + "%";

}

// Initial Load

updateSkillMatch();

// Dropdown Change

seniorSelect.addEventListener("change", updateSkillMatch);