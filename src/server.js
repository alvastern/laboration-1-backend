const express = require('express');  // Inkluderar express-paketet
const app = express();  // Startar en express-applikation
const port = 3000;  // Definierar porten som servern kommer att lyssna på

// Routing - hanterar get-anrop till URL
app.get("/", (req, res) => {
    res.send("Tjena!");
});

// Starta applikationen - vilken port servern ska lyssna på
app.listen(port, () => {
    console.log("Servern körs i porten " + port);
});