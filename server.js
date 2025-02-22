const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allows frontend to access backend
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "evelyn",  // Replace with your MySQL username
    password: "68wth568",  // Replace with your MySQL password
    database: "sys",  // Replace with your actual database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Route to Fetch Customers
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('/customers results:', results);
        res.json(results); // Send data to frontend
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});