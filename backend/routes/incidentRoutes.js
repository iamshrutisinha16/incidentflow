const express = require("express");
const router = express.Router();

const {
  getIncidents,
  createIncident,
} = require("../controllers/incidentController");

const protect = require("../middleware/authMiddleware"); 

router.get("/", protect, getIncidents);
router.post("/", protect, createIncident);

module.exports = router;