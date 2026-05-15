import { Link } from "react-router-dom";

function IncidentCard({ incident }) {

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-start">

          <div>

            <h5 className="fw-bold">
              {incident.title}
            </h5>

            <p className="text-muted mb-3">
              {incident.description}
            </p>

          </div>

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

        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <div className="d-flex gap-2">

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

            <span className="badge bg-light text-dark border">
              {
                new Date(
                  incident.createdAt
                ).toLocaleDateString()
              }
            </span>

          </div>

          <Link
            to={`/incidents/${incident._id}`}
            className="btn btn-dark btn-sm"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default IncidentCard;