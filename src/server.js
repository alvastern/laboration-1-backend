"use strict";

const express = require('express');  // Inkluderar express-paketet
const app = express();  // Startar en express-applikation
const port = 3000;  // Definierar porten som servern kommer att lyssna på
app.use(express.static('public'));  // Gör att servern kan hantera statiska filer i mappen "public"
app.set('view engine', 'ejs');

// Routing - hanterar get-anrop till URL
app.get("/addCourse", (req, res) => {
    res.render("addCourse");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/", (req, res) => {
    database.query("SELECT * FROM coursesDB", (err, results) => {
        if (err) {
            console.error('Fel vid hämtning av kurser: ' + err.stack);
            return res.status(500).send("Ett fel uppstod när kurserna skulle hämtas.");
        }
        
        res.render("index", { courses: results });
    });
});

// Starta applikationen - vilken port servern ska lyssna på
app.listen(port, () => {
    console.log("Servern körs i porten " + port);
});

// Databasanslutning
const mysql = require('mysql2');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kattenfindus1!',
    database: 'coursesDB'
});

database.connect((err) => {
    if (err) {
        console.error('Fel vid anslutning till databasen: ' + err.stack);
        return;
    } else {
        console.log('Ansluten till databasen');
    }
});

// Hanterar den data som skickas från formuläret i addCourse.ejs
app.use(express.urlencoded({ extended: true }));

// Hanterar anropet när en kurs läggs till via formuläret i databasen
app.post("/addCourse", (req, res) => {
    const { courseName, courseCode, prog, syll } = req.body;

    // Valdering för att kontrollera så att alla fält är ifyllda
    if (!courseName || !courseCode || !prog || !syll) {
        return res.status(400).send("Alla fält måste fyllas i.");
    }

    // Validering för att kontrollera så att progression är antingen A, B eller C
    if (!["A", "B", "C"].includes(prog.toUpperCase())) {
        return res.status(400).send("Progression måste vara A, B eller C.");
    }

    // Lägger till den nya kursen i databasen
    database.query(
        "INSERT INTO coursesDB (course_name, course_code, progression, syllabus) VALUES (?, ?, ?, ?)",
        [courseName, courseCode, prog, syll],
        (err, results) => {
            if (err) {
                console.error('Fel vid tillägg av kurs: ' + err.stack);
                return res.status(500).send("Ett fel uppstod när kursen skulle läggas till.");
            }
            res.redirect("/");
        }
    );
});

// Tar bort en kurs från databasen när en användare klickar på ta-bort knappen
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;

    database.query("DELETE FROM coursesDB WHERE id = ?",
        [id],
        (err) => {
            if (err) {
                console.error("Något gick fel", err);
                return res.status(500).send("Kunde inte ta bort kurs");
            }

            res.redirect("/");
        }
    );
});