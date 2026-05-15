import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchIncidents = async () => {

    try {

      const { data } = await API.get("/incidents");

      setIncidents(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchIncidents();

  }, []);

  const filteredIncidents = incidents.filter((incident) =>
    incident.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Incident Dashboard
          </h2>

          <p className="text-muted mb-0">
            Manage incidents across organization
          </p>

        </div>

        <Link
          to="/create-incident"
          className="btn btn-dark"
        >
          + Create Incident
        </Link>

      </div>

      {/* Stats Cards */}

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body">

              <h6>Total Incidents</h6>

              <h3>{incidents.length}</h3>

            </div>

          </div>

        </div>

        <div className="col-md-4 mt-3 mt-md-0">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body">

              <h6>Open Incidents</h6>

              <h3>
                {
                  incidents.filter(
                    (i) => i.status === "OPEN"
                  ).length
                }
              </h3>

            </div>

          </div>

        </div>

        <div className="col-md-4 mt-3 mt-md-0">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body">

              <h6>Resolved</h6>

              <h3>
                {
                  incidents.filter(
                    (i) => i.status === "RESOLVED"
                  ).length
                }
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Incident Table */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body">

          <div className="d-flex justify-content-between mb-3">

            <h5 className="fw-bold">
              Incidents
            </h5>

            <input
              type="text"
              className="form-control w-25"
              placeholder="Search incident"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {loading ? (

            <div className="text-center py-5">
              <h5>Loading...</h5>
            </div>

          ) : filteredIncidents.length === 0 ? (

            <div className="text-center py-5 text-muted">
              No incidents found
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredIncidents.map((incident) => (

                    <tr key={incident._id}>

                      <td>

                        <Link
                          to={`/incidents/${incident._id}`}
                          className="text-decoration-none fw-semibold"
                        >
                          {incident.title}
                        </Link>

                      </td>

                      <td>

                        <span className="badge bg-primary">
                          {incident.status}
                        </span>

                      </td>

                      <td>

                        <span className="badge bg-danger">
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