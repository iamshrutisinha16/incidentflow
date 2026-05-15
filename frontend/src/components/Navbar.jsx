import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        
        <Link className="navbar-brand fw-bold" to="/dashboard">
          IncidentFlow
        </Link>

        <div className="ms-auto d-flex gap-2">

          <Link
            to="/dashboard"
            className="btn btn-outline-light btn-sm"
          >
            Dashboard
          </Link>

          <Link
            to="/create-incident"
            className="btn btn-light btn-sm"
          >
            Create Incident
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;