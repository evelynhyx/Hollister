const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL connection
const db = mysql.createConnection({
    host: "localhost",      // Change if using a remote DB
    user: "evelyn",  // Replace with your MySQL username
    password: "68wth568",  // Replace with your MySQL password
    database: "sys",  // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Route to fetch customers
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});