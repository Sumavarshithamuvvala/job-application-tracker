// ==============================
// Company-wise Placements (Bar Chart)
// ==============================

new Chart(document.getElementById("companyChart"), {
    type: "bar",
    data: {
        labels: ["Amazon", "Cisco", "Deloitte", "Infosys", "TCS"],
        datasets: [{
            label: "Students Placed",
            data: [30, 22, 18, 40, 35],
            backgroundColor: [
                "#2563eb",
                "#4f46e5",
                "#60a5fa",
                "#818cf8",
                "#3b82f6"
            ],
            borderRadius: 8
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
});


// ==============================
// Role Distribution (Pie Chart)
// ==============================

new Chart(document.getElementById("roleChart"), {
    type: "pie",
    data: {
        labels: [
            "Software Engineer",
            "Data Analyst",
            "Web Developer",
            "QA Engineer"
        ],
        datasets: [{
            data: [45, 30, 15, 10],
            backgroundColor: [
                "#2563eb",
                "#4f46e5",
                "#60a5fa",
                "#93c5fd"
            ]
        }]
    },
    options: {
        responsive: true
    }
});


// ==============================
// Most Required Skills
// ==============================

new Chart(document.getElementById("skillChart"), {
    type: "bar",
    data: {
        labels: [
            "Java",
            "SQL",
            "Python",
            "DSA",
            "Power BI",
            "Communication"
        ],
        datasets: [{
            label: "Average Skill Proficiency",
            data: [90, 88, 74, 85, 72, 95],
            backgroundColor: "#2563eb",
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                min: 0,
                max: 100
            }
        }
    }
});


// ==============================
// Branch-wise Placements
// ==============================

new Chart(document.getElementById("branchChart"), {
    type: "doughnut",
    data: {
        labels: [
            "CSE",
            "CSBS",
            "AIML",
            "ECE",
            "IT"
        ],
        datasets: [{
            data: [60, 15, 12, 8, 5],
            backgroundColor: [
                "#2563eb",
                "#4f46e5",
                "#60a5fa",
                "#93c5fd",
                "#818cf8"
            ]
        }]
    },
    options: {
        responsive: true
    }
});