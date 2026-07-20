// ======================================
// SEARCH
// ======================================

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".profile-card");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const name = card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(value)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

});

// ======================================
// MODAL
// ======================================

const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {

    card.addEventListener("click", () => {

        // Firebase integration later
        modal.style.display = "flex";

    });

});

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// ======================================
// FILTERS
// (Firebase integration later)
// ======================================

document.getElementById("companyFilter").addEventListener("change", () => {

    // TODO: Filter by company after Firebase

});

document.getElementById("roleFilter").addEventListener("change", () => {

    // TODO: Filter by role after Firebase

});

document.getElementById("branchFilter").addEventListener("change", () => {

    // TODO: Filter by branch after Firebase

});

document.getElementById("batchFilter").addEventListener("change", () => {

    // TODO: Filter by batch after Firebase

});

document.getElementById("sortFilter").addEventListener("change", () => {

    // TODO: Sort profiles after Firebase

});

// ======================================
// RESET FILTERS
// ======================================

document.getElementById("resetFilters").addEventListener("click", () => {

    searchInput.value = "";

    document.getElementById("companyFilter").selectedIndex = 0;
    document.getElementById("roleFilter").selectedIndex = 0;
    document.getElementById("branchFilter").selectedIndex = 0;
    document.getElementById("batchFilter").selectedIndex = 0;
    document.getElementById("sortFilter").selectedIndex = 0;

    cards.forEach(card => {

        card.style.display = "flex";

    });

});