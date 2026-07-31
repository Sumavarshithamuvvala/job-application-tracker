// ======================================
// SKILL MATCH
// PART 1
// ======================================

import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ======================================
// ELEMENTS
// ======================================

const overallPercent =
document.getElementById("overallPercent");

const overallBar =
document.getElementById("overallBar");

const overallMessage =
document.getElementById("overallMessage");

const missingTopics =
document.getElementById("missingTopics");

const recommendedSeniors =
document.getElementById("recommendedSeniors");

const refreshBtn =
document.getElementById("refreshBtn");

// ======================================
// CATEGORY MAP
// ======================================

const categories = [

{
    student:"Programming",
    senior:"programmingTopics",
    bar:"ProgrammingBar",
    percent:"ProgrammingPercent",
    title:"Programming Languages"
},

{
    student:"DSA",
    senior:"dsaTopics",
    bar:"DSABar",
    percent:"DSAPercent",
    title:"DSA"
},

{
    student:"SQL",
    senior:"sqlTopics",
    bar:"SQLBar",
    percent:"SQLPercent",
    title:"SQL"
},

{
    student:"DBMS",
    senior:"dbmsTopics",
    bar:"DBMSBar",
    percent:"DBMSPercent",
    title:"DBMS"
},

{
    student:"OS",
    senior:"osTopics",
    bar:"OSBar",
    percent:"OSPercent",
    title:"Operating Systems"
},

{
    student:"CN",
    senior:"cnTopics",
    bar:"CNBar",
    percent:"CNPercent",
    title:"Computer Networks"
}


];

// ======================================
// LOAD STUDENT
// ======================================
function getInitials(name) {

    if (!name) return "ST";

    return name
        .trim()
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        location.href="auth.html";

        return;

    }

    const studentSnap =
    await getDoc(
        doc(db,"studentProfiles",user.uid)
    );

    if(!studentSnap.exists()){

        overallMessage.innerHTML =
        "Complete your profile first.";

        return;

    }

    const profile = studentSnap.data();

// Sidebar Details
studentName.textContent =
profile.fullName || "Student";

studentBranch.textContent =
profile.branch || "";

dashboardAvatar.textContent =
getInitials(profile.fullName);

    const placementSnap =
    await getDocs(
        collection(db,"placements")
    );

    const seniors=[];


    placementSnap.forEach(doc=>{

        seniors.push({

            id:doc.id,

            ...doc.data()

        });

    });

    calculateMatches(profile, seniors);

});

// ======================================
// CALCULATE MATCH
// ======================================

function calculateMatches(student,seniors){

    let bestMatch=0;

    let bestSenior=null;

    let allMissing=new Set();
    let totalPercentage = 0;
const categoryPercent = {};
    seniors.forEach(senior=>{

        let totalMatch=0;

        let totalTopics=0;

        categories.forEach(cat=>{

            const studentTopics =
            student.topics?.[cat.student] || [];

            const seniorTopics =
            senior[cat.senior] || [];

            let matched=0;

            seniorTopics.forEach(topic=>{

                if(studentTopics.includes(topic)){

                    matched++;

                }
                else{

                    allMissing.add(topic);

                }

            });
            

            totalMatch+=matched;

            totalTopics+=seniorTopics.length;

        });

        senior.matchPercent =
        totalTopics===0
        ?0
        :Math.round(
            totalMatch*100/totalTopics
        );
totalPercentage += senior.matchPercent;
        if(senior.matchPercent>bestMatch){

            bestMatch=
            senior.matchPercent;

            bestSenior=
            senior;

        }

    });
const overallAverage =
seniors.length === 0
? 0
: Math.round(totalPercentage / seniors.length);

updateOverall(overallAverage);

    showMissingTopics([...allMissing]);

    showRecommendedSeniors(seniors);
    if(bestSenior){

    updateCategoryMatch(student, bestSenior);

}


}
// ======================================
// UPDATE OVERALL MATCH
// ======================================

function updateOverall(percent){

    overallPercent.textContent = percent + "%";

    overallBar.style.width = percent + "%";

    if(percent>=80){

        overallMessage.textContent =
        "Excellent! Your skills closely match placed seniors.";

    }
    else if(percent>=60){

        overallMessage.textContent =
        "Good progress. Learn the missing topics to improve.";

    }
    else if(percent>=40){

        overallMessage.textContent =
        "Keep practicing. You are halfway there.";

    }
    else{

        overallMessage.textContent =
        "Start building your technical profile.";

    }

}

// ======================================
// SHOW MISSING TOPICS
// ======================================

function showMissingTopics(topics){

    missingTopics.innerHTML="";

    if(topics.length===0){

        missingTopics.innerHTML=
        "<p class='empty'>No missing topics 🎉</p>";

        return;

    }

    topics.sort();

    topics.forEach(topic=>{

        const chip=document.createElement("span");

        chip.className="missing-chip";

        chip.textContent=topic;

        missingTopics.appendChild(chip);

    });

}

// ======================================
// SHOW RECOMMENDED SENIORS
// ======================================

function showRecommendedSeniors(seniors){

    recommendedSeniors.innerHTML="";

    seniors.sort((a,b)=>b.matchPercent-a.matchPercent);
    const topSeniors = seniors.slice(0, 3);

    topSeniors.forEach(senior=>{

        const card=document.createElement("div");

        card.className="senior-card";

        card.innerHTML=`

            <div class="senior-top">

                <div>

                    <h3>${senior.studentName}</h3>

                    <p>${senior.companyName}</p>

                </div>

                <span class="match-badge">

                    ${senior.matchPercent}%

                </span>

            </div>

            <p>

                <strong>Role:</strong>

                ${senior.roleOffered}

            </p>

            <p>

                <strong>Package:</strong>

                ${senior.package}

            </p>

            <p>

                <strong>Branch:</strong>

                ${senior.branch}

            </p>

            <div class="skill-list">

                ${buildSkillChips(senior)}

            </div>

        `;

        recommendedSeniors.appendChild(card);

    });

}

// ======================================
// BUILD SKILL CHIPS
// ======================================

function buildSkillChips(senior){

    let html="";

    categories.forEach(cat=>{

        const topics=senior[cat.senior]||[];

        topics.forEach(topic=>{

            html+=`

            <span class="skill-chip">

                ${topic}

            </span>

            `;

        });

    });

    return html;

}
// ======================================
// BUILD COMPARISON TABLE
// ======================================
function updateCategoryMatch(student, senior){

    categories.forEach(cat=>{

        const studentTopics =
        student.topics?.[cat.student] || [];

        const seniorTopics =
        senior[cat.senior] || [];

        let matched = 0;

        seniorTopics.forEach(topic=>{

            if(studentTopics.includes(topic)){
                matched++;
            }

        });

        const percent =
        seniorTopics.length===0
        ?0
        :Math.round((matched*100)/seniorTopics.length);

        document.getElementById(cat.bar).style.width =
        percent + "%";

        document.getElementById(cat.percent).textContent =
        percent + "%";

    });

}

// ======================================
// REFRESH
// ======================================

refreshBtn.addEventListener("click", () => {

    location.reload();

});