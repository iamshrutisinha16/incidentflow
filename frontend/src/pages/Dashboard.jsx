import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchIncidents = async () => {

    try {

      const response = await API.get("/incidents");

      console.log("Incidents Response:", response.data);

      // Handles both array and object response

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.incidents || [];

      setIncidents(data);

    } catch (error) {

      console.log(error);

      setIncidents([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchIncidents();

  }, []);

  // Safe filter

  const filteredIncidents = Array.isArray(incidents)
    ? incidents.filter((incident) =>
        incident.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (

    <div className="container-fluid py-4 px-md-4 bg-light min-vh-100">

      {/* Header */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">

        <div>

          <h2 className="fw-bold mb-1">
            Incident Dashboard
          </h2>

          <p className="text-muted mb-0">
            Manage incidents across organization
          </p>

        </div>

        <Link
          to="/create-incident"
          className="btn btn-dark px-4"
        >
          + Create Incident
        </Link>

      </div>

      {/* Stats Cards */}

      <div className="row g-4 mb-4">

        {/* Total */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow rounded-4 text-white h-100"
            style={{
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
            }}
          >

            <div className="card-body">

              <h6>Total Incidents</h6>

              <h2 className="fw-bold">
                {incidents.length}
              </h2>

            </div>

          </div>

        </div>

        {/* Open */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow rounded-4 text-white h-100"
            style={{
              background:
                "linear-gradient(135deg,#f7971e,#ffd200)",
            }}
          >

            <div className="card-body">

              <h6>Open Incidents</h6>

              <h2 className="fw-bold">

                {
                  incidents.filter(
                    (i) => i.status === "OPEN"
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

        {/* Resolved */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow rounded-4 text-white h-100"
            style={{
              background:
                "linear-gradient(135deg,#11998e,#38ef7d)",
            }}
          >

            <div className="card-body">

              <h6>Resolved Incidents</h6>

              <h2 className="fw-bold">

                {
                  incidents.filter(
                    (i) => i.status === "RESOLVED"
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Incident Table */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">

            <h5 className="fw-bold mb-0">
              Incidents
            </h5>

            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "300px" }}
              placeholder="Search incident..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Loading */}

          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-dark"
                role="status"
              ></div>

              <p className="mt-3">
                Loading incidents...
              </p>

            </div>

          ) : filteredIncidents.length === 0 ? (

            /* Empty State */

            <div className="text-center py-5">

              <h5 className="text-muted">
                No incidents found
              </h5>

            </div>

          ) : (

            /* Table */

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>

                    <th>Title</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Created</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredIncidents.map((incident) => (

                    <tr key={incident._id}>

                      <td className="fw-semibold">
                        {incident.title}
                      </td>

                      <td>

                        <span
                          className={
                            incident.status === "OPEN"
                              ? "badge bg-warning text-dark"
                              : incident.status === "IN_PROGRESS"
                              ? "badge bg-primary"
                              : "badge bg-success"
                          }
                        >
                          {incident.status}
                        </span>

                      </td>

                      <td>

                        <span
                          className={
                            incident.priority === "HIGH"
                              ? "badge bg-danger"
                              : incident.priority === "MEDIUM"
                              ? "badge bg-warning text-dark"
                              : "badge bg-secondary"
                          }
                        >
                          {incident.priority}
                        </span>

                      </td>

                      <td>

                        {
                          new Date(
                            incident.createdAt
                          ).toLocaleDateString()
                        }

                      </td>

                      <td>

                        <Link
                          to={`/incidents/${incident._id}`}
                          className="btn btn-sm btn-dark"
                        >
                          View
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;