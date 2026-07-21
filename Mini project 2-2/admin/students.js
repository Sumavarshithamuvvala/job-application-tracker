// ===========================
// Student Data
// ===========================

import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let students = [];



// ===========================
// Elements
// ===========================

const tableBody = document.getElementById("studentTable");

const search = document.getElementById("search");

const modal = document.getElementById("studentModal");

const addBtn = document.getElementById("addStudent");

const closeBtn = document.querySelector(".close");

const cancelBtn = document.querySelector(".cancel");

const saveBtn = document.getElementById("saveStudent");




// Input fields

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const branchInput = document.getElementById("branch");

const yearInput = document.getElementById("year");




// ===========================
// Display Students
// ===========================
async function loadStudents() {

    try {

        students = [];

        const querySnapshot = await getDocs(collection(db, "studentProfiles"));

        querySnapshot.forEach((docSnap) => {

            const profile = docSnap.data();

            students.push({

                id: docSnap.id,

                name: profile.fullName || "",

                email: profile.email || "",

                branch: profile.branch || "",

                year: profile.graduation || ""

            });

        });

        displayStudents(students);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load student records.");

    }

}


function displayStudents(data){


    tableBody.innerHTML="";


    data.forEach((student,index)=>{


        let row=document.createElement("tr");


        row.innerHTML=`

        <td>${student.name}</td>

        <td>${student.email}</td>

        <td>${student.branch}</td>

        <td>${student.year}</td>


        <td>

        <button class="view-btn">
        View
        </button>


        <button class="delete-btn" onclick="deleteStudent(${index})">
        Delete
        </button>


        </td>

        `;


        tableBody.appendChild(row);


    });


}



// Initial load
loadStudents();





// ===========================
// Search Students
// ===========================


search.addEventListener("keyup",()=>{


    let value=search.value.toLowerCase();


    let filteredStudents=students.filter(student=>


        student.name.toLowerCase().includes(value) ||

        student.email.toLowerCase().includes(value)


    );


    displayStudents(filteredStudents);


});





// ===========================
// Open Modal
// ===========================








// ===========================
// Delete Student
// ===========================


function deleteStudent(index){


    let confirmDelete=confirm(
        "Are you sure you want to delete this student?"
    );


    if(confirmDelete){


        students.splice(index,1);


        displayStudents(students);


    }


}