const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP Server
const server = http.createServer(app);

// Middleware
app.use(cors()); // Allows frontend to access backend
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (HTML, CSS, JS)

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

// Serve index.html when visiting "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Route to Fetch Customers
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("/customers results:", results);
        res.json(results); // Send data to frontend
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`)
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const sql = "SELECT * FROM customers WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
            // User found
            res.json({ message: "Login successful", user: results[0] });
        } else {
            // No user found
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

// Attach WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("New WebSocket connection");

    ws.on("message", message => {
        console.log("Received:", message);
        ws.send("Message received!");
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});