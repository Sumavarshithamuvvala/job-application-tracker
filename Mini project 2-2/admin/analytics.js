import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const placementsCollection = collection(db, "placements");

// ==============================
// HTML Elements
// ==============================

const totalCompanies =
    document.getElementById("totalCompanies");

const studentsPlaced =
    document.getElementById("studentsPlaced");

const averagePackage =
    document.getElementById("averagePackage");

const highestPackage =
    document.getElementById("highestPackage");

const topHiringCompany =
    document.getElementById("topHiringCompany");


// ==============================
// Load Analytics
// ==============================

async function loadAnalytics() {

    try {

        const snapshot =
            await getDocs(placementsCollection);


        // ==============================
        // Students Placed
        // ==============================

        studentsPlaced.innerText =
            snapshot.size;


        // ==============================
        // Company Count
        // ==============================

       const companyCount = {};

snapshot.forEach((doc) => {

    const data = doc.data();

    const company =
        (data.companyName || "Unknown").trim();

    companyCount[company] =
        (companyCount[company] || 0) + 1;

});
        totalCompanies.innerText =
            Object.keys(companyCount).length;


        // ==============================
        // Highest Package
        // ==============================

        let highest = 0;

        snapshot.forEach((doc) => {

            const data = doc.data();

            const pkg =
                parseFloat(data.package);

            if (!isNaN(pkg) && pkg > highest) {

                highest = pkg;

            }

        });

        highestPackage.innerText =
            highest + " LPA";


        // ==============================
        // Average Package
        // ==============================

        let total = 0;
        let count = 0;

        snapshot.forEach((doc) => {

            const data = doc.data();

            const pkg =
                parseFloat(data.package);

            if (!isNaN(pkg)) {

                total += pkg;
                count++;

            }

        });

        if (count > 0) {

            averagePackage.innerText =
                (total / count).toFixed(1) + " LPA";

        } else {

            averagePackage.innerText =
                "0 LPA";

        }


        // ==============================
        // Top Hiring Company
        // ==============================

        let topCompany = "-";
        let maxCount = 0;

        for (const company in companyCount) {

            if (companyCount[company] > maxCount) {

                maxCount =
                    companyCount[company];

                topCompany =
                    company;

            }

        }

        topHiringCompany.innerText =
            topCompany;


        // ==============================
        // Company Chart
        // ==============================

        const companyLabels =
            Object.keys(companyCount);

        const companyValues =
            Object.values(companyCount);

        new Chart(
            document.getElementById("companyChart"),
            {

                type: "bar",

                data: {

                    labels: companyLabels,

                    datasets: [{

                        label: "Students Placed",

                        data: companyValues,

                        backgroundColor: "#2563eb",

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

                            beginAtZero: true,

                            ticks: {

                                stepSize: 1

                            }

                        }

                    }

                }

            }
        );


        // ==============================
        // Branch-wise Placements
        // ==============================

        const branchCount = {};

        snapshot.forEach((doc) => {

            const data = doc.data();

            const branch =
                data.branch || "Unknown";

            branchCount[branch] =
                (branchCount[branch] || 0) + 1;

        });

        const branchLabels =
            Object.keys(branchCount);

        const branchValues =
            Object.values(branchCount);

        new Chart(
            document.getElementById("branchChart"),
            {

                type: "doughnut",

                data: {

                    labels: branchLabels,

                    datasets: [{

                        data: branchValues

                    }]

                },

                options: {

                    responsive: true

                }

            }
        );

    }

    catch (error) {

        console.error(
            "Analytics Error:",
            error
        );

    }

}


// ==============================
// Start
// ==============================

loadAnalytics();