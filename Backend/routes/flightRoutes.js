// routes/flightRoutes.js
const express = require("express");
const db = require("../db");
const app = express();
const router = express.Router();
app.use(express.json());

// In routes/flightRoutes.js

router.post("/api/add-flight", (req, res) => {
  const {
    sourceDate,
    sourceTime,
    destDate,
    destTime,
    depCity,
    arrCity,
    dura,
    price,
    airlineName,
    adminId,  // Expect adminId from the request body
  } = req.body;

  // Ensure adminId is provided
  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required" });
  }

  // Combine date and time for departure and arrival
  const departureDateTime = `${sourceDate} ${sourceTime}`;
  const arrivalDateTime = `${destDate} ${destTime}`;

  // SQL query to insert the flight data
  const sql = `
    INSERT INTO flight (admin_id, departure, arrivale, source, Destination, duration, Price, airline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  // Execute the query
  db.query(
    sql,
    [adminId, departureDateTime, arrivalDateTime, depCity, arrCity, dura, price, airlineName],
    (err, result) => {
      if (err) {
        console.error("Error adding flight:", err);
        return res.status(500).json({ error: "Error adding flight to database" });
      }
      res.status(201).json({ message: "Flight added successfully", flightId: result.insertId });
    }
  );
});

// Get Cities Route
router.get("/api/cities", (req, res) => {
  const sql = "SELECT city FROM cities";
 
   db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Internal server error");
    }

    const cities = result.map(row => row.city);
    
    res.status(200).json({ cities });
  });
});

// Get Airlines Route
router.get("/api/airlines", (req, res) => {
  const sql = "SELECT  name FROM airline";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching airlines:", err);
      return res.status(500).json({ error: "Error fetching airlines" });
    }
    const airlines = result.map((row) => row.name);
    console.log(airlines)
    res.status(200).json({ airlines });
  });
});

module.exports = router;
