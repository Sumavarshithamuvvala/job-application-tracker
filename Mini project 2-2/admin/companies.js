// ================================
// Elements
// ================================

const openModal = document.getElementById("openModal");
const modal = document.getElementById("companyModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".cancel");
const form = document.querySelector("form");

// ================================
// Open Modal
// ================================

openModal.addEventListener("click", () => {

    modal.style.display = "block";

    document.body.style.overflow = "hidden";

});
// ================================
// Close Modal Function
// ================================

function closeCompanyModal() {

    modal.style.display = "none";

    document.body.style.overflow = "auto";

    form.reset();

}

// ================================
// Close Button (X)
// ================================

closeBtn.addEventListener("click", closeCompanyModal);

// ================================
// Cancel Button
// ================================

cancelBtn.addEventListener("click", closeCompanyModal);

// ================================
// Close When Clicking Outside
// ================================

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeCompanyModal();

    }

});

// ================================
// Save Company (Frontend Only)
// ================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Temporary success notification
    showToast("Company added successfully!");

    // Future Firebase code will go here

    closeCompanyModal();

});

// ================================
// Toast Notification
// ================================

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

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);

}