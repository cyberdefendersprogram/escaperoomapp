const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async function(req, res, next) {
  try {
    const results = await db.query("SELECT * FROM entries");
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const result = await db.query(
      "INSERT INTO entries (team_name,email,event) VALUES ($1,$2,$3) RETURNING *",
      [req.body.name, req.body.type]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const result = await db.query(
      "UPDATE entries SET team_name=$1, email=$2, event=$3 WHERE id=$4 RETURNING *",
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const result = await db.query("DELETE FROM entries WHERE id=$1", [
      req.params.id
    ]);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;