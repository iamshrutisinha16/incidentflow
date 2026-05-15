const express = require("express");

const router = express.Router();

const {
  getIncidents,
  createIncident,
} = require("../controllers/incidentController");

router.get("/", getIncidents);
router.post("/", protect, createIncident);
router.post("/", createIncident);

module.exports = router;