const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
app.use(
  cors({
    origin: "https://incidentflow-eta.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

app.use(errorMiddleware);

module.exports = app;