const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/sql/users", (req, res) => {
  db.query("SELECT * FROM users__mysql", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); 
  });
});

router.get("/sql/users/:id", (req, res) => {
  const userId = req.params.id;

  const query = `
        SELECT m.*, u.name AS user_name
        FROM moments__mysql m
        JOIN users__mysql u ON m.created_by = u.id
        WHERE m.created_by = ?
    `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
