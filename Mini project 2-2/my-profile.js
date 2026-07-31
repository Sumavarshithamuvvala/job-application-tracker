// ======================================
// MY PROFILE
// ======================================

import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ======================================
// SECTIONS
// ======================================

const editProfile =
document.getElementById("editProfile");

const viewProfile =
document.getElementById("viewProfile");

// ======================================
// BUTTONS
// ======================================

const saveBtn =
document.getElementById("saveProfile");

const editBtn =
document.getElementById("editProfileBtn");

const uploadBtn =
document.querySelector(".upload-btn");

// ======================================
// FORM FIELDS
// ======================================

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const phone =
document.getElementById("phone");

const roll =
document.getElementById("roll");

const college =
document.getElementById("college");

const branch =
document.getElementById("branch");

const year =
document.getElementById("year");

const cgpa =
document.getElementById("cgpa");

const semester =
document.getElementById("semester");

const graduation =
document.getElementById("graduation");

const careerGoal =
document.getElementById("careerGoal");

const dreamCompanies =
document.getElementById("dreamCompanies");

// ======================================
// VIEW PROFILE
// ======================================

const viewName =
document.getElementById("viewName");

const viewEmail =
document.getElementById("viewEmail");

const viewPhone =
document.getElementById("viewPhone");

const viewRoll =
document.getElementById("viewRoll");

const viewCollege =
document.getElementById("viewCollege");

const viewBranch =
document.getElementById("viewBranch");

const viewYear =
document.getElementById("viewYear");

const viewCgpa =
document.getElementById("viewCgpa");

const viewSemester =
document.getElementById("viewSemester");

const viewGraduation =
document.getElementById("viewGraduation");

const viewGoal =
document.getElementById("viewGoal");

const viewDreamCompanies =
document.getElementById("viewDreamCompanies");

const viewTechnicalProfile =
document.getElementById("viewTechnicalProfile");

// ======================================
// TOPICS
// ======================================

const studentTopics = {

    Programming:[],
    DSA:[],
    SQL:[],
    DBMS:[],
    OS:[],
    CN:[],
    HR:[]

};

// ======================================
// LOAD MASTER TOPICS
// ======================================

async function loadMasterTopics(){

    const snap = await getDoc(

        doc(db,
        "interviewTopics",
        "masterTopics")

    );

    if(!snap.exists()) return;

    const data = snap.data();

    const mapping = {

        Programming:"programmingTopics",

        DSA:"dsaTopics",

        SQL:"sqlTopics",

        DBMS:"dbmsTopics",

        OS:"osTopics",

        CN:"cnTopics",

      //  HR:"hrTopics"

    };

    for(const category in mapping){

        const container =
        document.getElementById(
        mapping[category]);

        if(!container) continue;

        container.innerHTML="";

        (data[category]||[]).forEach(topic=>{

            const label =
            document.createElement("label");

            label.className="topic-option";

            label.innerHTML=`

            <input
            type="checkbox"
            class="studentTopic"
            data-category="${category}"
            value="${topic}">

            ${topic}

            `;

            container.appendChild(label);

        });

    }

}

// ======================================
// VALIDATION
// ======================================

document
.querySelectorAll(
"input,textarea,select"
)
.forEach(input=>{

    input.addEventListener("blur",()=>{

        if(input.value.trim()===""){

            input.style.borderColor="red";

        }

        else{

            input.style.borderColor="#2563eb";

        }

    });

});
// ======================================
// LOAD PROFILE
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "auth.html";
        return;

    }

    await loadMasterTopics();

    try {

        const docRef = doc(db, "studentProfiles", user.uid);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return;

        const profile = docSnap.data();

        // ---------- Basic Details ----------

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

        // ---------- Load Selected Topics ----------

        const savedTopics = profile.topics || {};

        Object.keys(studentTopics).forEach(category => {

            studentTopics[category] =
                savedTopics[category] || [];

        });

        document
            .querySelectorAll(".studentTopic")
            .forEach(check => {

                const category =
                    check.dataset.category;

                if (
                    studentTopics[category] &&
                    studentTopics[category]
                        .includes(check.value)
                ) {

                    check.checked = true;

                }

            });

        showProfile(profile);

    }

    catch (error) {

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

    // ---------- Clear Old Topics ----------

    Object.keys(studentTopics).forEach(category => {

        studentTopics[category] = [];

    });

    // ---------- Read Checked Topics ----------

    document
        .querySelectorAll(".studentTopic")
        .forEach(check => {

            if (check.checked) {

                studentTopics[
                    check.dataset.category
                ].push(check.value);

            }

        });

    const profile = {

        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        roll: roll.value.trim(),
        college: college.value.trim(),
        branch: branch.value.trim(),
        year: year.value,
        cgpa: cgpa.value,
        semester: semester.value,
        graduation: graduation.value,
        careerGoal: careerGoal.value.trim(),
        dreamCompanies: dreamCompanies.value.trim(),

        topics: studentTopics

    };

    try {

        await setDoc(

            doc(
                db,
                "studentProfiles",
                user.uid
            ),

            profile,

            {
                merge: true
            }

        );

        alert("Profile Saved Successfully!");

        showProfile(profile);

    }

    catch (error) {

        alert(error.message);

    }

});
// ======================================
// SHOW PROFILE
// ======================================

function showProfile(profile) {

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

    viewTechnicalProfile.innerHTML = "";

    const titles = {

        Programming: "Programming Languages",
        DSA: "Data Structures & Algorithms",
        SQL: "SQL",
        DBMS: "DBMS",
        OS: "Operating Systems",
        CN: "Computer Networks",
       // HR: "HR Interview"

    };

    const topics = profile.topics || {};

    Object.keys(titles).forEach(category => {

        const card = document.createElement("div");

        card.className = "profile-topic-card";

        const heading = document.createElement("h3");

        heading.textContent = titles[category];

        card.appendChild(heading);

        const values = topics[category] || [];

        if (values.length === 0) {

            const p = document.createElement("p");

            p.textContent = "No topics selected";

            card.appendChild(p);

        }

        else {

            const chipContainer = document.createElement("div");

            chipContainer.className = "skills-display";

            values.forEach(topic => {

                const chip = document.createElement("span");

                chip.className = "selected-skill";

                chip.textContent = topic;

                chipContainer.appendChild(chip);

            });

            card.appendChild(chipContainer);

        }

        viewTechnicalProfile.appendChild(card);

    });

    editProfile.style.display = "none";

    viewProfile.style.display = "block";

}

// ======================================
// EDIT PROFILE
// ======================================

editBtn.addEventListener("click", () => {

    viewProfile.style.display = "none";

    editProfile.style.display = "block";

});

// ======================================
// PROFILE PHOTO
// ======================================

uploadBtn.addEventListener("click", () => {

    alert(
        "Profile photo upload will be connected to Firebase Storage."
    );

});