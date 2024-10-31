const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ofbs",
});

// Example API endpoint
app.get("/", (req, res) => {
  return res.json("return from backend");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/api/tickets", (req, res) => {
  
    const t =  "SELECT * FROM ticket ";
    db.query(t, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
