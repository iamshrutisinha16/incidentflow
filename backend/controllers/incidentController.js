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

module.exports = { getIncidents,

};