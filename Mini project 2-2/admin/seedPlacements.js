import { db } from "../firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const placementCollection = collection(db, "placements");

const placements = [

{
studentName:"Sangeetha",
graduationYear:"2028",
branch:"CSE",
companyName:"TCS",
companyType:"Service Based",
roleOffered:"System Engineer",
jobType:"Full Time",
workMode:"Hybrid",
location:"Hyderabad",
package:"7.2",
placementDate:"2026-04-08",

cgpa:"8.95",
cgpaCutoff:"7",
activeBacklogs:"No",

minimumCGPA:"7",
eligibleBranches:"CSE,IT,ECE",
onlineAssessment:"Yes",
oaMandatory:"Yes",
interviewRounds:"2",
additionalCriteria:"No Backlogs",
eligibleInitially:"Yes",
eligibilityImprovement:"",

technicalSkills:["Java","SQL","HTML","CSS","Git"],

codingPlatform:"CodeChef",
problemsSolved:"150 - 300",
practiceFrequency:"Weekly",

projectCount:"2",
projectName:"Online Banking Portal",
projectDomain:"Web Development",
projectTechnologies:"HTML,CSS,JavaScript,Firebase",
projectDescription:"Developed an online banking management portal.",
projectDiscussed:"Yes",
githubLink:"https://github.com/aishwaryanair/banking-portal",

interviewDifficulty:"2 - Easy",
codingDifficulty:"Easy",
interviewExperience:"OA followed by technical and HR interview.",
preparationStrategy:"Revised aptitude and core Java.",
mistakesMade:"Ignored DBMS initially.",

roundsFaced:[
"Online Assessment",
"Technical + HR Interview"
],

preparationDuration:"6 Months",

resourcesUsed:[
"GeeksforGeeks",
"CodeChef",
"YouTube"
],

wishStartedEarlier:"Started aptitude preparation earlier.",
roadmap:"Aptitude -> Java -> SQL -> Projects",

programmingTopics:["Java"],
dsaTopics:["Arrays","Strings"],
sqlTopics:["Joins"],
dbmsTopics:["Normalization"],
osTopics:["Scheduling"],
cnTopics:["HTTP"],
hrTopics:["Self Introduction"],

linkedin:"https://www.linkedin.com/in/aishwaryanair",
email:"aishwarya.nair@gmail.com"
},

{
studentName:"Bhavya",
graduationYear:"2028",
branch:"CSE",
companyName:"TCS",
companyType:"Service Based",
roleOffered:"Digital Software Engineer",
jobType:"Full Time",
workMode:"Onsite",
location:"Chennai",
package:"9",
placementDate:"2026-09-11",

cgpa:"9.12",
cgpaCutoff:"7.5",
activeBacklogs:"No",

minimumCGPA:"7.5",
eligibleBranches:"CSE,IT",
onlineAssessment:"Yes",
oaMandatory:"Yes",
interviewRounds:"3",
additionalCriteria:"No Backlogs",
eligibleInitially:"Yes",
eligibilityImprovement:"",

technicalSkills:["Java","Spring Boot","SQL","Git"],

codingPlatform:"LeetCode",
problemsSolved:"300 - 500",
practiceFrequency:"Daily",

projectCount:"3",
projectName:"Hospital Management System",
projectDomain:"Web Development",
projectTechnologies:"Java,Spring Boot,MySQL",
projectDescription:"Hospital management application.",
projectDiscussed:"Yes",
githubLink:"https://github.com/keerthanarao/hospital-system",

interviewDifficulty:"3 - Moderate",
codingDifficulty:"Medium",
interviewExperience:"Coding round followed by technical and managerial interviews.",
preparationStrategy:"Focused on Java and DSA.",
mistakesMade:"Needed stronger OS concepts.",

roundsFaced:[
"Online Assessment",
"Technical Interview",
"Managerial Interview"
],

preparationDuration:"8 Months",

resourcesUsed:[
"LeetCode",
"Striver",
"ChatGPT"
],

wishStartedEarlier:"Solved more coding problems.",
roadmap:"DSA -> Java -> Projects",

programmingTopics:["Java"],
dsaTopics:["Arrays","Trees","Binary Search"],
sqlTopics:["Joins","Indexes"],
dbmsTopics:["Transactions"],
osTopics:["Deadlock"],
cnTopics:["TCP/IP"],
hrTopics:["Leadership"],

linkedin:"https://www.linkedin.com/in/keerthanarao",
email:"keerthana.rao@gmail.com"
},

{
studentName:"Bindu",
graduationYear:"2028",
branch:"CSE",
companyName:"Microsoft",
companyType:"Product Based",
roleOffered:"Software Engineer",
jobType:"Full Time",
workMode:"Hybrid",
location:"Hyderabad",
package:"42",
placementDate:"2026-04-22",

cgpa:"9.48",
cgpaCutoff:"8.5",
activeBacklogs:"No",

minimumCGPA:"8.5",
eligibleBranches:"CSE,IT,AIML",
onlineAssessment:"Yes",
oaMandatory:"Yes",
interviewRounds:"4",
additionalCriteria:"No Backlogs",
eligibleInitially:"Yes",
eligibilityImprovement:"",

technicalSkills:["C++","DSA","SQL","Azure","Git"],

codingPlatform:"LeetCode",
problemsSolved:"600+",
practiceFrequency:"Daily",

projectCount:"4",
projectName:"AI Interview Assistant",
projectDomain:"AI",
projectTechnologies:"Python,React,Azure",
projectDescription:"AI-powered interview preparation platform.",
projectDiscussed:"Yes",
githubLink:"https://github.com/divyasharma/ai-interview",

interviewDifficulty:"5 - Very Hard",
codingDifficulty:"Hard",
interviewExperience:"Three coding interviews and one behavioral interview.",
preparationStrategy:"Solved LeetCode and studied system design.",
mistakesMade:"Needed more LLD practice.",

roundsFaced:[
"Online Assessment",
"Technical Interview 1",
"Technical Interview 2",
"HR Interview"
],

preparationDuration:"1 Year",

resourcesUsed:[
"LeetCode",
"Striver",
"GeeksforGeeks"
],

wishStartedEarlier:"Practiced contests earlier.",
roadmap:"DSA -> LLD -> Projects",

programmingTopics:["C++"],
dsaTopics:["Graphs","DP","Trees"],
sqlTopics:["Joins","Views"],
dbmsTopics:["Normalization"],
osTopics:["Memory Management"],
cnTopics:["TCP/IP"],
hrTopics:["Leadership"],

linkedin:"https://www.linkedin.com/in/divyasharma",
email:"divya.sharma@gmail.com"
},

{
studentName:"Varshitha",
graduationYear:"2028",
branch:"CSE",
companyName:"Microsoft",
companyType:"Product Based",
roleOffered:"Cloud Solution Engineer",
jobType:"Full Time",
workMode:"Hybrid",
location:"Bangalore",
package:"38",
placementDate:"2026-09-18",

cgpa:"9.31",
cgpaCutoff:"8.5",
activeBacklogs:"No",

minimumCGPA:"8.5",
eligibleBranches:"CSE,IT",
onlineAssessment:"Yes",
oaMandatory:"Yes",
interviewRounds:"4",
additionalCriteria:"No Backlogs",
eligibleInitially:"Yes",
eligibilityImprovement:"",

technicalSkills:["Azure","Python","SQL","Docker","Git"],

codingPlatform:"LeetCode",
problemsSolved:"400 - 500",
practiceFrequency:"Daily",

projectCount:"3",
projectName:"Cloud Resource Manager",
projectDomain:"Cloud Computing",
projectTechnologies:"Azure,Python,Docker",
projectDescription:"Cloud resource monitoring and deployment system.",
projectDiscussed:"Yes",
githubLink:"https://github.com/ritikaverma/cloud-manager",

interviewDifficulty:"4 - Hard",
codingDifficulty:"Hard",
interviewExperience:"Focused on cloud services and coding.",
preparationStrategy:"Prepared Azure services and DSA.",
mistakesMade:"Needed stronger networking concepts.",

roundsFaced:[
"Online Assessment",
"Technical Interview 1",
"Technical Interview 2",
"HR Interview"
],

preparationDuration:"10 Months",

resourcesUsed:[
"Microsoft Learn",
"LeetCode",
"ChatGPT"
],

wishStartedEarlier:"Started cloud learning earlier.",
roadmap:"Azure -> DSA -> Projects -> Mock Interviews",

programmingTopics:["Python"],
dsaTopics:["Graphs","Hashing"],
sqlTopics:["Joins","Indexes"],
dbmsTopics:["Transactions"],
osTopics:["Scheduling"],
cnTopics:["DNS","TCP/IP"],
hrTopics:["Communication"],

linkedin:"https://www.linkedin.com/in/ritikaverma",
email:"ritika.verma@gmail.com"
}

];

async function uploadData() {
  try {
    for (const placement of placements) {
      await addDoc(placementCollection, {
        ...placement,
        createdAt: serverTimestamp()
      });

      console.log("Uploaded:", placement.studentName);
    }

    alert("All placements uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert(error.message);
  }
}

uploadData();