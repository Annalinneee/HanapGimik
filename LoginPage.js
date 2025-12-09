const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db"); // imong db.js
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// LOGIN ROUTE
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            console.log("Login Success!");
            res.redirect("/my-events.html"); // dashboard page nimo
        } else {
            res.send("<script>alert('Invalid email or password'); window.history.back();</script>");
        }
    });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
