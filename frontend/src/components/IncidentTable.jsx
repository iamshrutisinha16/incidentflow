import { Link } from "react-router-dom";

function IncidentTable({ incidents }) {

  return (
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

          {incidents.map((incident) => (

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
  );
}

export default IncidentTable;