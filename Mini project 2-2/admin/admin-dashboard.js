document.getElementById("placementBtn").onclick = () => {
    window.location.href = "placements.html";
};
document.querySelector(".logout-btn").addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {

        localStorage.setItem("role", "admin");

        window.location.href = "../auth.html";

    }

});