const Incident = require("../models/Incident");

const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      tenantId: req.user.tenantId,
    }).sort({ createdAt: -1 });

    res.status(200).json(incidents);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
    });
  }
};

const createIncident = async (req, res) => {
  try {
    const incident = await Incident.create({
      ...req.body,
      tenantId: req.user.tenantId,
    });

    res.status(201).json(incident);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create incident",
    });
  }
};

module.exports = {
  getIncidents,
  createIncident,
};