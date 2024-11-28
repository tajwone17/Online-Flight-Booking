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
    seats,
    airlineName,
    adminId,
  } = req.body;

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required" });
  }

  const departureDateTime = `${sourceDate} ${sourceTime}`;
  const arrivalDateTime = `${destDate} ${destTime}`;

  const sql = `
    INSERT INTO flight (admin_id, departure, arrivale, source, destination, duration, price,seats, airline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(
    sql,
    [
      adminId,
      departureDateTime,
      arrivalDateTime,
      depCity,
      arrCity,
      dura,
      price,
      seats,
      airlineName,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding flight:", err);
        return res
          .status(500)
          .json({ error: "Error adding flight to database" });
      }
      res.status(201).json({
        message: "Flight added successfully",
        flightId: result.insertId,
      });
    }
  );
});

// Add Airline Route (New)
router.post("/api/add-airline", (req, res) => {
  const { name, seats } = req.body;

  if (!name || !seats) {
    return res
      .status(400)
      .json({ error: "Airline name and seats are required" });
  }

  // Insert into the airline table
  const sql = "INSERT INTO airline (name, seats) VALUES (?, ?)";
  db.query(sql, [name, seats], (err, result) => {
    if (err) {
      console.error("Error adding airline:", err);
      return res
        .status(500)
        .json({ error: "Error adding airline to database" });
    }
    res.status(201).json({
      message: "Airline added successfully",
      airlineId: result.insertId,
    });
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
//Get passenger Route
router.get("/api/dashboard-counts", (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(passenger_id) FROM PASSENGER_PROFILE) AS totalPassengers,
      (SELECT COUNT(flight_id) FROM FLIGHT) AS totalFlights,
      (SELECT COUNT(airline_id) FROM airline) AS totalAirlines,
      (SELECT SUM(amount) FROM payment) as totalAmount
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Internal server error");
    }
    // Since the query returns a single object with the two counts, we extract them here.
    const counts = result[0]; // result is an array with one object
    // console.log(counts);
    res.status(200).json(counts);
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

router.delete("/api/flights/:id", (req, res) => {
  const flightId = req.params.id;

  const deleteQuery = "DELETE FROM flight WHERE flight_id = ?";

  db.query(deleteQuery, [flightId], (err, result) => {
    if (err) {
      console.error("Error deleting flight:", err);
      return res.status(500).json({ error: "Failed to delete the flight." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Flight not found." });
    }

    res.status(200).json({ message: "Flight deleted successfully." });
  });
});
// Corrected PUT endpoint
router.put("/api/manage-flight/:id", (req, res) => {
  const { sourceDate, sourceTime, destDate, destTime } = req.body;

  const flightId = req.params.id; // Extract the flight ID from the URL

  // Combine date and time for departure and arrival
  const departureDateTime = `${sourceDate} ${sourceTime}`;
  const arrivalDateTime = `${destDate} ${destTime}`;

  const sql =
    "UPDATE flight SET departure = ?, arrivale = ? WHERE flight_id = ?"; // Use the correct table name and column name

  db.query(
    sql,
    [departureDateTime, arrivalDateTime, flightId],
    (err, result) => {
      if (err) {
        console.error("Error updating flight:", err);
        return res
          .status(500)
          .json({ error: "Error updating flight details." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Flight not found." });
      }
      console.log(result);

      res.status(200).json({ message: "Flight updated successfully." });
    }
  );
});

router.get("/api/todays-flights", (req, res) => {
  const now = new Date().toISOString(); // Capture the current timestamp for debugging
  console.log("Current Time (now):", now); // Log current time

  const sql = `
    SELECT flight_id as id, arrivale, departure, destination, source, airline 
    FROM flight 
    WHERE 
      DATE(departure) = CURDATE()  -- Ensure it's today's date
      AND departure > NOW()        -- Departure time is before current time
      AND arrivale > NOW();        -- Arrival time is before current time
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching today's flights:", err);
      return res.status(500).json({ error: "Error fetching today's flights" });
    }

    res.status(200).json({ flights: result });
  });
});

router.get("/api/departed-flights", (req, res) => {
  const sql = `
    SELECT 
      flight_id as id, 
      arrivale, 
      departure, 
      destination, 
      source, 
      airline 
    FROM flight 
    WHERE 
      DATE(departure) = CURDATE()  -- Only consider flights on today's date
      AND departure < NOW()        -- Departure time is before current time
      AND arrivale > NOW();         -- Arrival time is after current time
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching departed flights" });
    }
    res.status(200).json({ flights: result });
    console.log("Query Result:", result);
  });
});

router.get("/api/arrived-flights", (req, res) => {
  const sql = `
    SELECT 
      flight_id as id, 
      arrivale, 
      departure, 
      destination, 
      source, 
      airline 
    FROM flight 
    WHERE 
      DATE(departure) = CURDATE()  -- Only consider flights on today's date
      AND departure < NOW()        -- Departure time is before current time
      AND arrivale < NOW();         -- Arrival time is after current time
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching arrivedflights" });
    }
    res.status(200).json({ flights: result });
    console.log("Query Result:", result);
  });
});
module.exports = router;
