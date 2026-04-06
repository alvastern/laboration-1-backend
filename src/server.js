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

app.use(express.urlencoded({ extended: true }));

app.post("/addCourse", (req, res) => {
    const { courseName, courseCode, prog, syll } = req.body;

    if (!courseName || !courseCode || !prog || !syll) {
        return res.status(400).send("Alla fält måste fyllas i.");
    }

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