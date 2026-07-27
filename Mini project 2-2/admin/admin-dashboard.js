import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const placementsCollection = collection(db, "placements");
const studentsCollection = collection(db, "students");

const totalPlacements = document.getElementById("totalPlacements");
const totalStudents = document.getElementById("totalStudents");

async function loadDashboard() {

    console.log("Dashboard loaded");

    const placementSnapshot = await getDocs(placementsCollection);

    totalPlacements.innerText = placementSnapshot.size;

    const studentSnapshot = await getDocs(studentsCollection);

    totalStudents.innerText = studentSnapshot.size;
}



document.getElementById("placementBtn").onclick = () => {
    window.location.href = "placements.html";
};

loadDashboard();