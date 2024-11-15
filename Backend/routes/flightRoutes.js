const express = require("express");
const db = require("../db");
const app = express();
const router = express.Router();
app.use(express.json());

// Add Flight Route (Already implemented)
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
    adminId,
  } = req.body;

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required" });
  }

  const departureDateTime = `${sourceDate} ${sourceTime}`;
  const arrivalDateTime = `${destDate} ${destTime}`;

  const sql = `
    INSERT INTO flight (admin_id, departure, arrivale, source, destination, duration, price, airline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

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

// Add Airline Route (New)
router.post("/api/add-airline", (req, res) => {
  const { name, seats } = req.body;

  if (!name || !seats) {
    return res.status(400).json({ error: "Airline name and seats are required" });
  }

  // Insert into the airline table
  const sql = "INSERT INTO airline (name, seats) VALUES (?, ?)";
  db.query(sql, [name, seats], (err, result) => {
    if (err) {
      console.error("Error adding airline:", err);
      return res.status(500).json({ error: "Error adding airline to database" });
    }
    res.status(201).json({ message: "Airline added successfully", airlineId: result.insertId });
  });
});

// Get Cities Route (Already implemented)
router.get("/api/cities", (req, res) => {
  const sql = "SELECT city FROM cities";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Internal server error");
    }
    const cities = result.map((row) => row.city);
    res.status(200).json({ cities });
  });
});


// Get Airlines Route
router.get("/api/airlines", (req, res) => {
  const sql = "SELECT * FROM airline"; // Get all airlines from the airline table
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching airlines:", err);
      return res.status(500).json({ error: "Error fetching airlines" });
    }
    res.status(200).json({ airlines: result }); // Send the airlines data as a response
  });
});

// Delete Airline Route

router.delete("/api/airlines/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM airline WHERE airline_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting airline:", err);
      return res.status(500).json({ error: "Error deleting airline" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Airline not found" });
    }
    res.status(200).json({ message: "Airline deleted successfully" });
  });
});

router.get("/api/flights", (req, res) => {
  const sql = "SELECT * FROM flight"; // Get all airlines from the airline table
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching airlines:", err);
      return res.status(500).json({ error: "Error fetching airlines" });
    }
    res.status(200).json({ flights: result }); // Send the airlines data as a response
  });
});
router.delete('/api/flights/:id', (req, res) => {
  const flightId = req.params.id;

  const deleteQuery = 'DELETE FROM flight WHERE flight_id = ?';

  db.query(deleteQuery, [flightId], (err, result) => {
    if (err) {
      console.error('Error deleting flight:', err);
      return res.status(500).json({ error: 'Failed to delete the flight.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flight not found.' });
    }

    res.status(200).json({ message: 'Flight deleted successfully.' });
  });
});

module.exports = router;
