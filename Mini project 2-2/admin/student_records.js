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

    students = [];

    const snapshot = await getDocs(collection(db, "studentProfiles"));

    snapshot.forEach((doc) => {

        const data = doc.data();

        students.push({

            name: data.fullName || "",

            email: data.email || "",

            branch: data.branch || "",

            year: data.graduation || ""

        });

    });

    displayStudents(students);

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


addBtn.onclick=()=>{


    modal.style.display="block";


};





// ===========================
// Close Modal
// ===========================


closeBtn.onclick=()=>{


    modal.style.display="none";


};


cancelBtn.onclick=()=>{


    modal.style.display="none";


};





// Close when clicking outside

window.onclick=(event)=>{


    if(event.target==modal){

        modal.style.display="none";

    }


};






// ===========================
// Add Student
// ===========================


saveBtn.onclick=()=>{


    let student={

        name:nameInput.value,

        email:emailInput.value,

        branch:branchInput.value,

        year:yearInput.value

    };



    if(

        student.name=="" ||

        student.email=="" ||

        student.branch=="" ||

        student.year==""

    ){

        alert("Please fill all details");

        return;

    }




    students.push(student);



    displayStudents(students);



    modal.style.display="none";



    clearForm();


};






// ===========================
// Clear Form
// ===========================


function clearForm(){


    nameInput.value="";

    emailInput.value="";

    branchInput.value="";

    yearInput.value="";


}





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