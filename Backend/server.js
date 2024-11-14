// app.js (Main Server File)
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use("/auth", authRoutes);  // All authentication routes (signup, login)
app.use("/", flightRoutes);    // All flight-related routes (add-flight, cities, airlines)

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
