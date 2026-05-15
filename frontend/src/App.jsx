import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateIncident from "./pages/CreateIncident";
import IncidentDetails from "./pages/IncidentDetails";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-incident" element={<CreateIncident />} />
          <Route path="/incidents/:id" element={<IncidentDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
