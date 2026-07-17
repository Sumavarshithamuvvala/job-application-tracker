// Student Login

const studentBtn = document.getElementById("studentBtn");

studentBtn.addEventListener("click", () => {

    localStorage.setItem("role", "student");

    studentBtn.innerHTML = "Loading...";

    studentBtn.disabled = true;

    setTimeout(() => {

        window.location.href = "auth.html";

    }, 500);

});


// Admin Login

const adminBtn = document.getElementById("adminBtn");

adminBtn.addEventListener("click", () => {

    localStorage.setItem("role", "admin");

    adminBtn.innerHTML = "Loading...";

    adminBtn.disabled = true;

    setTimeout(() => {

        window.location.href = "auth.html";

    }, 500);

});