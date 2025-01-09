const express = require("express");
const db = require("../db");
const app = express();
const router = express.Router();
app.use(express.json());
router.post("/api/add-flight", (req, res) => {
  const {
    sourceDate,
    sourceTime,
    destDate,
    destTime,
    depCity,
    arrCity,
    dura,
    Bprice,
    Eprice,
    airlineName,
    adminId,
  } = req.body;

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required" });
  }

  const departureDateTime = `${sourceDate} ${sourceTime}`;
  const arrivalDateTime = `${destDate} ${destTime}`;

  // Step 1: Query to get seats from the airline table
  const seatQuery = `SELECT seats FROM airline WHERE name = ?`;

  db.query(seatQuery, [airlineName], (seatErr, seatResult) => {
    if (seatErr) {
      console.error("Error fetching seats:", seatErr);
      return res.status(500).json({ error: "Error fetching airline data" });
    }

    if (seatResult.length === 0) {
      return res.status(404).json({ error: "Airline not found" });
    }

    const seats = seatResult[0].seats; // Get the total seats from the airline

    // Step 2: Query to get bus_seats from the flight table
    const busSeatsQuery = `SELECT bus_seats FROM flight WHERE airline = ? ORDER BY flight_id DESC LIMIT 1`;

    db.query(busSeatsQuery, [airlineName], (busSeatsErr, busSeatsResult) => {
      if (busSeatsErr) {
        console.error("Error fetching bus_seats:", busSeatsErr);
        return res.status(500).json({ error: "Error fetching flight data" });
      }

      // If there are no flights found for this airline
      const bus_seats = busSeatsResult.length > 0 ? busSeatsResult[0].bus_seats : 0;

      // Step 3: Calculate eco_seats
      const eco_seats = seats - bus_seats;

      // Step 4: Insert the new flight data
      const insertFlightQuery = `
        INSERT INTO flight (admin_id, departure, arrivale, source, destination, duration, BusPrice,
      EcoPrice, seats, airline, eco_seats)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertFlightQuery,
        [
          adminId,
          departureDateTime,
          arrivalDateTime,
          depCity,
          arrCity,
          dura,
          Bprice,
          Eprice,
          seats,
          airlineName,
          eco_seats, // Insert calculated eco_seats
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
  });
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

      res.status(200).json({ message: "Flight updated successfully." });
    }
  );
});

router.get("/api/todays-flights", (req, res) => {
  const now = new Date().toISOString(); // Capture the current timestamp for debugging

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
  });
});

// Route to get passenger details by flight ID
router.get("/api/passengers/:id", (req, res) => {
  const { id } = req.params; // Get flight_id from query parameters

  // Validate flight_id
  if (!id) {
    return res.status(400).json({ error: "flight_id parameter is required" });
  }

  const query = `
    SELECT 
      p.passenger_id,
      p.user_id,
      p.mobile,
      p.dob,
      p.f_name,
      p.m_name,
      p.l_name,
      f.flight_id
    FROM 
      passenger_profile p
    JOIN 
      flight f
    ON 
      p.flight_id = f.flight_id
    WHERE 
      f.flight_id = ?; 
  `;

  // Execute the query
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results); // Return the fetched data as JSON
  });
});

router.get("/api/passengers-user/:id", (req, res) => {
  const { id } = req.params; // Get flight_id from query parameters

  // Validate flight_id
  if (!id) {
    return res.status(400).json({ error: "flight_id parameter is required" });
  }

  const query = `
 SELECT 
    p.amount,
    u.username,
    p.user_id 
FROM 
    payment p
JOIN 
    users u
ON 
    p.user_id = u.user_id
WHERE 
    p.flight_id = ?;

  `;

  // Execute the query
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results); // Return the fetched data as JSON
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
  });
});

router.get("/api/user-flights", async (req, res) => {
  try {
    const { userId } = req.query; 
    console.log("Received userId:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const query = `
          SELECT f.flight_id, f.arrivale, f.departure, f.Destination, f.source, f.airline
          FROM flight f
          JOIN passenger_profile p ON f.flight_id = p.flight_id
          WHERE p.user_id = ?;
      `;
    console.log("Executing query:", query, "with params:", [userId]);

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch flight details" });
      }

      console.log("Query results:", results);
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching flight details:", error);
    res.status(500).json({ error: "Failed to fetch flight details" });
  }
});

// Get Tickets Route
router.get("/api/tickets", (req, res) => {
  const { userId } = req.query;
  const query = `
    SELECT 
      t.ticket_id,
      f.flight_id,
      f.departure,
      f.arrivale,
      f.source,
      f.destination,
      f.airline,
      t.seat_no,
      t.class,
      f.GATE,
      p.f_name,
      p.m_name,
      p.l_name
    FROM 
      ticket t
    JOIN 
      flight f ON t.flight_id = f.flight_id
    JOIN 
      passenger_profile p ON t.passenger_id = p.passenger_id
    WHERE 
      t.user_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      return res.status(500).json({ error: "Error fetching tickets" });
    }
    console.log("Tickets fetched successfully:", results);
    res.status(200).json({ tickets: results });
  });
});

router.delete("/api/cancel-ticket/:id", (req, res) => {
  const ticketId = req.params.id;

  // Step 1: Fetch ticket details to determine the seat class and flight ID
  const ticketQuery = `
    SELECT t.flight_id, t.class, p.passenger_id 
    FROM ticket t 
    JOIN passenger_profile p ON t.passenger_id = p.passenger_id 
    WHERE t.ticket_id = ?
  `;

  db.query(ticketQuery, [ticketId], (ticketErr, ticketResult) => {
    if (ticketErr) {
      console.error("Error fetching ticket details:", ticketErr);
      return res.status(500).json({ error: "Failed to fetch ticket details." });
    }

    if (ticketResult.length === 0) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    const { flight_id, class: seatClass, passenger_id } = ticketResult[0];

    // Step 2: Delete the ticket and passenger record
    const deleteTicketQuery = "DELETE FROM ticket WHERE ticket_id = ?";
    const deletePassengerQuery = "DELETE FROM passenger_profile WHERE passenger_id = ?";

    db.query(deleteTicketQuery, [ticketId], (delTicketErr) => {
      if (delTicketErr) {
        console.error("Error deleting ticket:", delTicketErr);
        return res.status(500).json({ error: "Failed to delete the ticket." });
      }

      db.query(deletePassengerQuery, [passenger_id], (delPassengerErr) => {
        if (delPassengerErr) {
          console.error("Error deleting passenger profile:", delPassengerErr);
          return res.status(500).json({ error: "Failed to delete passenger profile." });
        }

        // Step 3: Update the seat count in the flight table
        const seatClassColumn = seatClass === "B" ? "bus_seats" : "eco_seats";
        const seatUpdateQuery = `
          UPDATE flight 
          SET ${seatClassColumn} = ${seatClassColumn} + 1, seats = seats + 1
          WHERE flight_id = ?
        `;

        db.query(seatUpdateQuery, [flight_id], (updateSeatErr) => {
          if (updateSeatErr) {
            console.error("Error updating seat count:", updateSeatErr);
            return res.status(500).json({ error: "Failed to update seat count." });
          }

          res.status(200).json({ message: "Ticket canceled successfully." });
        });
      });
    });
  });
});


module.exports = router;
