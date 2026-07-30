// ===============================
// Chart Variables
// ===============================

// ===============================
// Chart Variables
// ===============================
import { db } from "./firebase.js";
console.log("Firebase imported successfully");

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
let topCompaniesChart;
let companyTrendChart;
let hiringProcessChart;

let topicChart;
let placementTrendChart;
let packageChart;
// ===============================
// Sample Data
// Replace with Firebase later
// ===============================
// All placement records from Firestore
let allPlacements = [];
// ===============================
// Current Year
// ===============================

let currentYear = "All Years";
async function loadPlacements() {

    try {

        const snapshot = await getDocs(collection(db, "placements"));

        allPlacements = [];

        snapshot.forEach((doc) => {

            allPlacements.push(doc.data());

        });

        console.log("Placements:", allPlacements);
       populateCompanyFilter();
populateBranchFilter();
populateYearFilter();

refreshDashboard();
} catch (error) {

    console.error(error);
}


}

// ===============================
// Update KPI Cards
// ===============================

function updateCards() {

    let filtered = [...allPlacements];

    // Filter by Year
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Filter by Company
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
   p.companyName?.trim().toLowerCase() ===
company.trim().toLowerCase()
);
    }

    // Filter by Branch
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
        filtered = filtered.filter(p =>
           p.branch?.trim().toLowerCase() ===
branch.trim().toLowerCase()
        );
    }

    // KPI Calculations
    const totalCompanies = new Set(
        filtered.map(p => p.companyName).filter(Boolean)
    ).size;

    const studentsPlaced = filtered.length;

    const highestPackage = Math.max(
        0,
        ...filtered.map(p => Number(p.package) || 0)
    );

    const avgPackage = studentsPlaced
        ? (
            filtered.reduce((sum, p) =>
                sum + (Number(p.package) || 0), 0
            ) / studentsPlaced
        ).toFixed(2)
        : 0;

    document.getElementById("companiesCount").innerText = totalCompanies;
    document.getElementById("studentsPlaced").innerText = studentsPlaced;

    // Until student data exists, assume all filtered records are placed
    document.getElementById("placementPercent").innerText = "100%";

    document.getElementById("avgPackage").innerText =
        "₹" + avgPackage + " LPA";

    document.getElementById("highestPackage").innerText =
        "₹" + highestPackage + " LPA";
}
// ===============================
// Top Hiring Companies
// ===============================

function drawTopCompanies() {

    let filtered = [...allPlacements];

    // Graduation Year Filter
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Company Filter
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
       filtered = filtered.filter(p =>
    p.companyName?.trim() === company.trim()
);
    }

    // Branch Filter
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
       filtered = filtered.filter(p =>
    p.branch?.trim().toLowerCase() ===
    branch.trim().toLowerCase()
);
    }

    // Count students per company
    const companyCount = {};

    filtered.forEach(p => {
        const company = p.companyName?.trim();

if (!company) return;

companyCount[company] =
    (companyCount[company] || 0) + 1;
    });

    const labels = Object.keys(companyCount);
    const values = Object.values(companyCount);

    if (topCompaniesChart)
        topCompaniesChart.destroy();

    topCompaniesChart = new Chart(
        document.getElementById("topCompaniesChart"),
        {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Students Hired",
                    data: values,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}

// ===============================
// Company Visit Trend
// ===============================

function drawCompanyTrend() {

    let filtered = [...allPlacements];

    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
            p.companyName?.trim().toLowerCase() ===
company.trim().toLowerCase()
);
    }

    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
filtered = filtered.filter(p =>
    p.branch?.trim().toLowerCase() ===
    branch.trim().toLowerCase()
);;
    }

    const monthCount = {
        Jan:0, Feb:0, Mar:0, Apr:0,
        May:0, Jun:0, Jul:0, Aug:0,
        Sep:0, Oct:0, Nov:0, Dec:0
    };

    filtered.forEach(p => {

        if (!p.placementDate) return;

        const date = new Date(p.placementDate);

        const month = date.toLocaleString("default", {
            month: "short"
        });

        if (monthCount[month] !== undefined)
            monthCount[month]++;
    });

    if(companyTrendChart)
        companyTrendChart.destroy();

    companyTrendChart = new Chart(

        document.getElementById("companyTrendChart"),

        {

            type:"line",

            data:{

                labels:Object.keys(monthCount),

                datasets:[{

                    label:"Placements",

                    data:Object.values(monthCount),

                    tension:0.4,

                    fill:false

                }]

            }

        }

    );

}

// ===============================
// Hiring Process Pie
// ===============================

function drawHiringProcess() {

    let filtered = [...allPlacements];

    // Graduation Year
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Company
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
            p.companyName.trim() === company.trim()
        );
    }

    // Branch
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
        filtered = filtered.filter(p =>
            p.branch === branch
        );
    }

    const jobTypeCount = {};

    filtered.forEach(p => {
        if (!p.jobType) return;
        jobTypeCount[p.jobType] = (jobTypeCount[p.jobType] || 0) + 1;
    });

    if (hiringProcessChart)
        hiringProcessChart.destroy();

    hiringProcessChart = new Chart(
        document.getElementById("hiringProcessChart"),
        {
            type: "pie",
            data: {
                labels: Object.keys(jobTypeCount),
                datasets: [{
                    data: Object.values(jobTypeCount)
                }]
            },
            options: {
                responsive: true
            }
        }
    );
}
// ===============================
// Refresh Dashboard
// ===============================
// ===============================
// Interview Topic Analytics
// ===============================

function drawInterviewTopics() {

    let filtered = [...allPlacements];

    // Year Filter
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Company Filter
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
            p.companyName?.trim().toLowerCase() ===
company.trim().toLowerCase()
            
        );
    }

    // Branch Filter
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
        filtered = filtered.filter(p =>
            p.branch?.trim().toLowerCase() ===
branch.trim().toLowerCase()
        );
    }

    // Subject selected
    const subject = document.getElementById("subjectFilter").value;

    const topicCount = {};

    filtered.forEach(p => {

        const topics = p[subject];

        if (!topics) return;

        topics.forEach(topic => {
            topicCount[topic] = (topicCount[topic] || 0) + 1;
        });

    });

    if (topicChart)
        topicChart.destroy();

    topicChart = new Chart(
        document.getElementById("topicChart"),
        {
            type: "bar",
            data: {
                labels: Object.keys(topicCount),
                datasets: [{
                    label: "Frequency",
                    data: Object.values(topicCount),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}


// ===============================
// Subject Skill Analytics
// ===============================



// ===============================
// Placement Trend
// ===============================

function drawPlacementTrend() {

    let filtered = [...allPlacements];

    // Year Filter
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Company Filter
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
           p.companyName?.trim().toLowerCase() ===
company.trim().toLowerCase()
        );
    }

    // Branch Filter
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
        filtered = filtered.filter(p =>
        p.branch?.trim().toLowerCase() ===
branch.trim().toLowerCase()
        );
    }

    // Count placements by graduation year
    const yearCount = {};

    filtered.forEach(p => {
        const year = p.graduationYear;
        if (!year) return;

        yearCount[year] = (yearCount[year] || 0) + 1;
    });

    if (placementTrendChart)
        placementTrendChart.destroy();

    placementTrendChart = new Chart(
        document.getElementById("placementTrendChart"),
        {
            type: "line",
            data: {
                labels: Object.keys(yearCount),
                datasets: [{
                    label: "Placed Students",
                    data: Object.values(yearCount),
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 5
            }
        }
    }
}
        }
    );
}



// ===============================
// Package Distribution
// ===============================
function drawPackageChart() {

    let filtered = [...allPlacements];

    // Year Filter
    if (currentYear !== "All Years") {
        filtered = filtered.filter(p =>
            String(p.graduationYear) === String(currentYear)
        );
    }

    // Company Filter
    const company = document.getElementById("companyFilter").value;
    if (company !== "All Companies") {
        filtered = filtered.filter(p =>
           p.companyName?.trim().toLowerCase() ===
company.trim().toLowerCase()
        );
    }

    // Branch Filter
    const branch = document.getElementById("branchFilter").value;
    if (branch !== "All Branches") {
        filtered = filtered.filter(p =>
          p.branch?.trim().toLowerCase() ===
branch.trim().toLowerCase()
        );
    }

    // Package Ranges
    let range1 = 0; // <10
    let range2 = 0; // 10-20
    let range3 = 0; // 20-30
    let range4 = 0; // >30

    filtered.forEach(p => {

        const pkg = Number(p.package);

        if (pkg < 10)
            range1++;
        else if (pkg < 20)
            range2++;
        else if (pkg < 30)
            range3++;
        else
            range4++;

    });

    if (packageChart)
        packageChart.destroy();

    packageChart = new Chart(
        document.getElementById("packageChart"),
        {
            type: "doughnut",
            data: {
                labels: [
                    "< 10 LPA",
                    "10 - 20 LPA",
                    "20 - 30 LPA",
                    "> 30 LPA"
                ],
                datasets: [{
                    data: [
                        range1,
                        range2,
                        range3,
                        range4
                    ]
                }]
            },
            options: {
                responsive: true
            }
        }
    );
}

// ===============================
// Eligibility Chart
// ===============================


// ===============================
// Refresh Dashboard
// ===============================

function refreshDashboard() {

    updateCards();

    drawTopCompanies();
   drawCompanyTrend();

    drawHiringProcess();

    drawInterviewTopics();

    drawPlacementTrend();

    drawPackageChart();
}
// ===============================
// Year Filter
// ===============================

// ===============================
// Initial Dashboard Load
// ===============================

// Initial Dashboard Load
loadPlacements();
function populateCompanyFilter() {

    const companyFilter = document.getElementById("companyFilter");

    // Remove old options except "All Companies"
    companyFilter.innerHTML = '<option>All Companies</option>';

    const companies = [...new Set(
        allPlacements
            .map(p => p.companyName?.trim())
            .filter(Boolean)
    )].sort();

    companies.forEach(company => {

        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;

        companyFilter.appendChild(option);

    });

}

document.getElementById("yearFilter").addEventListener("change", () => {
    currentYear = document.getElementById("yearFilter").value;
    refreshDashboard();
});

document.getElementById("companyFilter").addEventListener("change", () => {
    refreshDashboard();
});

document.getElementById("branchFilter").addEventListener("change", () => {
    refreshDashboard();
});

document.getElementById("subjectFilter")
.addEventListener("change", refreshDashboard);


function populateBranchFilter() {

    const branchFilter = document.getElementById("branchFilter");

    branchFilter.innerHTML =
        '<option>All Branches</option>';

    const branches = [...new Set(
        allPlacements
            .map(p => p.branch?.trim())
            .filter(Boolean)
    )].sort();

    branches.forEach(branch => {

        const option = document.createElement("option");

        option.value = branch;

        option.textContent = branch;

        branchFilter.appendChild(option);

    });

}
function populateYearFilter() {

    const yearFilter = document.getElementById("yearFilter");

    yearFilter.innerHTML =
        '<option>All Years</option>';

    const years = [...new Set(
        allPlacements
            .map(p => p.graduationYear?.toString())
            .filter(Boolean)
    )]
    .sort()
    .reverse();

    years.forEach(year => {

        const option = document.createElement("option");

        option.value = year;

        option.textContent = year;

        yearFilter.appendChild(option);

    });

}