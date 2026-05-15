import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

function IncidentDetails() {

  const { id } = useParams();

  const [incident, setIncident] = useState(null);

  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  const fetchIncident = async () => {

    try {

      const { data } = await API.get("/incidents");

      const foundIncident = data.find(
        (item) => item._id === id
      );

      setIncident(foundIncident);

      setStatus(foundIncident?.status || "");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchIncident();

  }, []);

  const updateStatus = async () => {

    try {

      await API.put(
        `/incidents/${id}`,
        {
          status,
        }
      );

      alert("Status updated");

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (!incident) {

    return (
      <div className="text-center mt-5">
        <h4>Incident not found</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card border-0 shadow-lg rounded-4">

        <div className="card-body p-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold">
              {incident.title}
            </h2>

            <span className="badge bg-danger fs-6">
              {incident.priority}
            </span>

          </div>

          <p className="text-muted">
            {incident.description}
          </p>

          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card bg-light border-0 rounded-4">

                <div className="card-body">

                  <h6>Status</h6>

                  <select
                    className="form-select mt-2"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  >

                    <option value="OPEN">
                      OPEN
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="RESOLVED">
                      RESOLVED
                    </option>

                  </select>

                  <button
                    className="btn btn-dark mt-3"
                    onClick={updateStatus}
                  >
                    Update Status
                  </button>

                </div>

              </div>

            </div>

            <div className="col-md-6 mt-4 mt-md-0">

              <div className="card bg-light border-0 rounded-4">

                <div className="card-body">

                  <h6>Activity Timeline</h6>

                  <ul className="list-group list-group-flush mt-3">

                    <li className="list-group-item bg-light">
                      Incident Created
                    </li>

                    <li className="list-group-item bg-light">
                      Status Updated
                    </li>

                    <li className="list-group-item bg-light">
                      Investigation Started
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default IncidentDetails;