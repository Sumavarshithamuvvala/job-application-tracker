// ===============================
// Chart Variables
// ===============================

// ===============================
// Chart Variables
// ===============================

let topCompaniesChart;
let companyTrendChart;
let hiringProcessChart;

let topicChart;
let skillChart;
let placementCompanyChart;
let placementTrendChart;
let packageChart;
let eligibilityChart;
// ===============================
// Sample Data
// Replace with Firebase later
// ===============================

const analyticsData = {

    "2023":{

        companies:52,
        placed:310,
        placement:84,
        avgPackage:5.8,
        highest:18,

        topCompanies:{
            labels:["TCS","Infosys","Accenture","Capgemini","Wipro"],
            values:[95,74,55,42,36]
        },

        companyTrend:[30,38,41,45,52],

        hiringProcess:{
            labels:["Coding Test","Technical","HR","Group Discussion"],
            values:[40,32,18,10]
        }

    },

    "2024":{

        companies:64,
        placed:356,
        placement:88,
        avgPackage:6.5,
        highest:24,

        topCompanies:{
            labels:["TCS","Infosys","Accenture","Deloitte","Capgemini"],
            values:[110,88,66,40,36]
        },

        companyTrend:[40,48,52,58,64],

        hiringProcess:{
            labels:["Coding Test","Technical","HR","Group Discussion"],
            values:[42,30,18,10]
        }

    },

    "2025":{

        companies:81,
        placed:425,
        placement:91,
        avgPackage:7.4,
        highest:30,

        topCompanies:{
            labels:["TCS","Infosys","Accenture","Deloitte","Amazon"],
            values:[125,102,74,48,20]
        },

        companyTrend:[52,60,67,74,81],

        hiringProcess:{
            labels:["Coding Test","Technical","HR","Group Discussion"],
            values:[45,28,18,9]
        }

    },

    "2026":{

        companies:90,
        placed:470,
        placement:94,
        avgPackage:8.1,
        highest:36,

        topCompanies:{
            labels:["TCS","Infosys","Accenture","Deloitte","Google"],
            values:[135,108,82,55,18]
        },

        companyTrend:[60,68,76,84,90],

        hiringProcess:{
            labels:["Coding Test","Technical","HR","Group Discussion"],
            values:[46,29,17,8]
        },

        interviewTopics:{
            labels:["Arrays","Strings","OOP","SQL","DBMS","OS"],
            values:[85,78,90,70,60,55]
        },

        subjectSkills:{
            labels:["Java","Python","SQL","DSA","Web"],
            values:[90,80,75,88,70]
        },

        placementCompanies:{
            labels:["TCS","Infosys","Accenture","Google","Amazon"],
            values:[135,108,82,18,15]
        },

        placementTrend:{
            labels:["2022","2023","2024","2025","2026"],
            values:[72,84,88,91,94]
        },

        packageDistribution:{
            labels:["3-5 LPA","5-8 LPA","8-12 LPA","12+ LPA"],
            values:[80,180,120,40]
        },

        eligibility:{
            labels:["Eligible","Not Eligible"],
            values:[420,50]
        }

    }

};
// ===============================
// Current Year
// ===============================

let currentYear = "2026";

// ===============================
// Update KPI Cards
// ===============================

function updateCards(year){

    const d = analyticsData[year];

    document.getElementById("companiesCount").innerText=d.companies;

    document.getElementById("studentsPlaced").innerText=d.placed;

    document.getElementById("placementPercent").innerText=
        d.placement+"%";

    document.getElementById("avgPackage").innerText=
        "₹"+d.avgPackage+" LPA";

    document.getElementById("highestPackage").innerText=
        "₹"+d.highest+" LPA";

}

// ===============================
// Top Hiring Companies
// ===============================

function drawTopCompanies(year){

    const d=analyticsData[year];

    if(topCompaniesChart)
        topCompaniesChart.destroy();

    topCompaniesChart=new Chart(

        document.getElementById("topCompaniesChart"),

        {

            type:"bar",

            data:{

                labels:d.topCompanies.labels,

                datasets:[{

                    label:"Students Hired",

                    data:d.topCompanies.values,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    legend:{
                        display:false
                    }

                },

                scales:{
                    y:{
                        beginAtZero:true
                    }
                }

            }

        }

    );

}

// ===============================
// Company Visit Trend
// ===============================

function drawCompanyTrend(year){

    const d=analyticsData[year];

    if(companyTrendChart)
        companyTrendChart.destroy();

    companyTrendChart=new Chart(

        document.getElementById("companyTrendChart"),

        {

            type:"line",

            data:{

                labels:[
                    "Jan",
                    "Mar",
                    "May",
                    "Sep",
                    "Dec"
                ],

                datasets:[{

                    label:"Companies",

                    data:d.companyTrend,

                    tension:.4,

                    fill:false

                }]

            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:false
                    }
                }

            }

        }

    );

}

// ===============================
// Hiring Process Pie
// ===============================

function drawHiringProcess(year){

    const d=analyticsData[year];

    if(hiringProcessChart)
        hiringProcessChart.destroy();

    hiringProcessChart=new Chart(

        document.getElementById("hiringProcessChart"),

        {

            type:"pie",

            data:{

                labels:d.hiringProcess.labels,

                datasets:[{

                    data:d.hiringProcess.values

                }]

            },

            options:{

                responsive:true

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

function drawInterviewTopics(year){

    const d = analyticsData[year];

    if(!d.interviewTopics) return;

    if(topicChart)
        topicChart.destroy();

    topicChart = new Chart(
        document.getElementById("topicChart"),
        {

            type:"bar",

            data:{

                labels:d.interviewTopics.labels,

                datasets:[{

                    label:"Questions Asked",

                    data:d.interviewTopics.values,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:false
                    }
                },

                scales:{
                    y:{
                        beginAtZero:true
                    }
                }

            }

        }

    );

}



// ===============================
// Subject Skill Analytics
// ===============================

function drawSkillAnalytics(year){

    const d = analyticsData[year];

    if(!d.subjectSkills) return;

    if(skillChart)
        skillChart.destroy();

    skillChart = new Chart(

        document.getElementById("skillChart"),

        {

            type:"radar",

            data:{

                labels:d.subjectSkills.labels,

                datasets:[{

                    label:"Skill Percentage",

                    data:d.subjectSkills.values

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}



// ===============================
// Company Wise Placement
// ===============================

function drawPlacementCompany(year){

    const d = analyticsData[year];

    if(!d.placementCompanies) return;

    if(placementCompanyChart)
        placementCompanyChart.destroy();

    placementCompanyChart=new Chart(

        document.getElementById("placementCompanyChart"),

        {

            type:"bar",

            data:{

                labels:d.placementCompanies.labels,

                datasets:[{

                    label:"Students",

                    data:d.placementCompanies.values

                }]

            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:false
                    }
                }

            }

        }

    );

}



// ===============================
// Placement Trend
// ===============================

function drawPlacementTrend(year){

    const d=analyticsData[year];

    if(!d.placementTrend) return;

    if(placementTrendChart)
        placementTrendChart.destroy();

    placementTrendChart=new Chart(

        document.getElementById("placementTrendChart"),

        {

            type:"line",

            data:{

                labels:d.placementTrend.labels,

                datasets:[{

                    label:"Placement %",

                    data:d.placementTrend.values,

                    tension:0.4,

                    fill:false

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}



// ===============================
// Package Distribution
// ===============================

function drawPackageChart(year){

    const d=analyticsData[year];

    if(!d.packageDistribution) return;

    if(packageChart)
        packageChart.destroy();

    packageChart=new Chart(

        document.getElementById("packageChart"),

        {

            type:"doughnut",

            data:{

                labels:d.packageDistribution.labels,

                datasets:[{

                    data:d.packageDistribution.values

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}



// ===============================
// Eligibility Chart
// ===============================

function drawEligibilityChart(year){

    const d=analyticsData[year];

    if(!d.eligibility) return;

    if(eligibilityChart)
        eligibilityChart.destroy();

    eligibilityChart=new Chart(

        document.getElementById("eligibilityChart"),

        {

            type:"pie",

            data:{

                labels:d.eligibility.labels,

                datasets:[{

                    data:d.eligibility.values

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}

// ===============================
// Refresh Dashboard
// ===============================

function refreshDashboard(year){

    updateCards(year);

    drawTopCompanies(year);

    drawCompanyTrend(year);

    drawHiringProcess(year);

    drawInterviewTopics(year);

    drawSkillAnalytics(year);

    drawPlacementCompany(year);

    drawPlacementTrend(year);

    drawPackageChart(year);

    drawEligibilityChart(year);

}
// ===============================
// Year Filter
// ===============================

document.getElementById("yearFilter").addEventListener("change", function () {

    if (this.value === "All Years") {
        currentYear = "2026";
    } else {
        currentYear = this.value;
    }

    refreshDashboard(currentYear);

});


// ===============================
// Initial Dashboard Load
// ===============================

refreshDashboard(currentYear);