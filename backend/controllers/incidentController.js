const getIncidents = (req, res) => {
  res.json({
    success: true,
    message: "Get incidents working",
  });
};

const createIncident = (req, res) => {
  res.json({
    success: true,
    message: "Create incident working",
  });
};

module.exports = {
  getIncidents,
  createIncident,
};