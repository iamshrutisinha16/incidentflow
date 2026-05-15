import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateIncident from "./pages/CreateIncident";
import IncidentDetails from "./pages/IncidentDetails";

function Layout() {

  const location = useLocation();

  return (
    <>

      {
        location.pathname !== "/" &&
        <Navbar />
      }

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-incident"
          element={<CreateIncident />}
        />

        <Route
          path="/incidents/:id"
          element={<IncidentDetails />}
        />

      </Routes>

    </>
  );
}

function App() {

  return (
    <BrowserRouter>

      <Layout />

    </BrowserRouter>
  );
}

export default App;
