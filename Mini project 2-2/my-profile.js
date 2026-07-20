// ======================================
// MY PROFILE
// PART 1
// ======================================

// ---------- Form Sections ----------
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const editProfile = document.getElementById("editProfile");
const viewProfile = document.getElementById("viewProfile");

// ---------- Buttons ----------
const saveBtn = document.getElementById("saveProfile");
const editBtn = document.getElementById("editProfileBtn");
const uploadBtn = document.querySelector(".upload-btn");

// ---------- Input Fields ----------
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const roll = document.getElementById("roll");
const college = document.getElementById("college");
const branch = document.getElementById("branch");
const year = document.getElementById("year");
const cgpa = document.getElementById("cgpa");
const semester = document.getElementById("semester");
const graduation = document.getElementById("graduation");
const careerGoal = document.getElementById("careerGoal");
const dreamCompanies = document.getElementById("dreamCompanies");

// ---------- Skills ----------
const skillButtons = document.querySelectorAll(".skill");
const selectedContainer = document.getElementById("selectedSkills");
const customSkill = document.getElementById("customSkill");
const addSkillBtn = document.getElementById("addSkill");

// ---------- View Profile ----------
const viewName = document.getElementById("viewName");
const viewEmail = document.getElementById("viewEmail");
const viewPhone = document.getElementById("viewPhone");
const viewRoll = document.getElementById("viewRoll");
const viewCollege = document.getElementById("viewCollege");
const viewBranch = document.getElementById("viewBranch");
const viewYear = document.getElementById("viewYear");
const viewCgpa = document.getElementById("viewCgpa");
const viewSemester = document.getElementById("viewSemester");
const viewGraduation = document.getElementById("viewGraduation");
const viewGoal = document.getElementById("viewGoal");
const viewDreamCompanies = document.getElementById("viewDreamCompanies");
const viewSkills = document.getElementById("viewSkills");

// ---------- Selected Skills ----------
let selectedSkills = [];

// ======================================
// DISPLAY SKILLS
// ======================================

function renderSelectedSkills() {

    selectedContainer.innerHTML = "";

    selectedSkills.forEach(skill => {

        const chip = document.createElement("span");

        chip.className = "selected-skill";

        chip.textContent = skill;

        selectedContainer.appendChild(chip);

    });

}

// ======================================
// PREDEFINED SKILLS
// ======================================

skillButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if (selectedSkills.includes(value)) {

            selectedSkills = selectedSkills.filter(s => s !== value);

            button.classList.remove("active");

        } else {

            selectedSkills.push(value);

            button.classList.add("active");

        }

        renderSelectedSkills();

    });

});

// ======================================
// ADD CUSTOM SKILL
// ======================================

addSkillBtn.addEventListener("click", () => {

    const value = customSkill.value.trim();

    if (value === "") {

        alert("Enter a skill.");

        return;

    }

    if (selectedSkills.includes(value)) {

        alert("Skill already added.");

        return;

    }

    selectedSkills.push(value);

    customSkill.value = "";

    renderSelectedSkills();

});

// ======================================
// INPUT VALIDATION
// ======================================

const allInputs = document.querySelectorAll("input, textarea, select");

allInputs.forEach(input => {

    input.addEventListener("blur", () => {

        if (input.value.trim() === "") {

            input.style.borderColor = "red";

        } else {

            input.style.borderColor = "#2563eb";

        }

    });

});
// ======================================
// LOAD PROFILE FROM LOCAL STORAGE
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "auth.html";
        return;
    }

    try {

        const docRef = doc(db, "studentProfiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const profile = docSnap.data();

            fullName.value = profile.fullName || "";
            email.value = profile.email || "";
            phone.value = profile.phone || "";
            roll.value = profile.roll || "";
            college.value = profile.college || "";
            branch.value = profile.branch || "";
            year.value = profile.year || "";
            cgpa.value = profile.cgpa || "";
            semester.value = profile.semester || "";
            graduation.value = profile.graduation || "";
            careerGoal.value = profile.careerGoal || "";
            dreamCompanies.value = profile.dreamCompanies || "";

            selectedSkills = profile.skills || [];

            renderSelectedSkills();

            // THIS LINE IS THE IMPORTANT ONE
            showProfile(profile);

        }

    } catch(error) {

        console.log(error);

    }

});

// ======================================
// SAVE PROFILE
// ======================================

saveBtn.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {

        alert("Please login again.");

        return;

    }

    const profile = {

        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        roll: roll.value,
        college: college.value,
        branch: branch.value,
        year: year.value,
        cgpa: cgpa.value,
        semester: semester.value,
        graduation: graduation.value,
        careerGoal: careerGoal.value,
        dreamCompanies: dreamCompanies.value,
        skills: selectedSkills

    };

    try {

        await setDoc(doc(db, "studentProfiles", user.uid), profile, { merge: true });

        alert("Profile Saved Successfully!");

        showProfile(profile);

    } catch (error) {

        alert(error.message);

    }

});

// ======================================
// SHOW PROFESSIONAL PROFILE
// ======================================

function showProfile(profile){

    viewName.textContent = profile.fullName || "";
    viewEmail.textContent = profile.email || "";
    viewPhone.textContent = profile.phone || "";
    viewRoll.textContent = profile.roll || "";
    viewCollege.textContent = profile.college || "";
    viewBranch.textContent = profile.branch || "";
    viewYear.textContent = profile.year || "";
    viewCgpa.textContent = profile.cgpa || "";
    viewSemester.textContent = profile.semester || "";
    viewGraduation.textContent = profile.graduation || "";
    viewGoal.textContent = profile.careerGoal || "";
    viewDreamCompanies.textContent = profile.dreamCompanies || "";

    viewSkills.innerHTML = "";

    (profile.skills || []).forEach(skill => {

        const chip = document.createElement("span");

        chip.className = "selected-skill";

        chip.textContent = skill;

        viewSkills.appendChild(chip);

    });

    editProfile.style.display = "none";
    viewProfile.style.display = "block";

}

// ======================================
// SHOW PROFILE IF ALREADY SAVED
// ======================================




// ======================================
// EDIT PROFILE
// ======================================

editBtn.addEventListener("click",()=>{

    viewProfile.style.display="none";

    editProfile.style.display="block";

});

// ======================================
// UPLOAD PHOTO
// ======================================

uploadBtn.addEventListener("click",()=>{

    alert("Profile photo upload will be connected to Firebase Storage.");

});