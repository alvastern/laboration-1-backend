"use strict";

// Fetch-anrop med try/catch för att hämta alla kurser
let courseList = [];

async function fetchCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/ramschema");
        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error("Någonting gick fel", error);
        return [];
    }
}

// Anropar fetchCourses och lagrar resultatet i variabeln courseList
fetchCourses().then(courses => {
    courseList = courses;
});

// Hämtar element från DOM
let courseName = document.getElementById("courseName");
let couseCode = document.getElementById("courseCode");
let prog = document.getElementById("progression");
let coursePlan = document.getElementById("coursePlan");
let submitBtn = document.getElementById("submitBtn");
let courseListContainer = document.getElementById("yourCourses");
let form = document.getElementById("courseForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    courseListContainer = {
        courseName: courseName.value,
        courseCode: couseCode.value,
        progression: prog.value,
        coursePlan: coursePlan.value
    };
});