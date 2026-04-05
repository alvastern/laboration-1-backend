const express = require('express');  // Inkluderar express-paketet
const app = express();  // Startar en express-applikation
const port = 3000;  // Definierar porten som servern kommer att lyssna på
app.use(express.static('public'));  // Gör att servern kan hantera statiska filer i mappen "public"
app.set('view engine', 'ejs');

// Routing - hanterar get-anrop till URL
app.get("/", (req, res) => {
    res.render("index");
});

// Starta applikationen - vilken port servern ska lyssna på
app.listen(port, () => {
    console.log("Servern körs i porten " + port);
});