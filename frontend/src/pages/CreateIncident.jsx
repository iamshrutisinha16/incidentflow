import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function CreateIncident() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/incidents",
        formData
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body p-5">

              <h2 className="fw-bold mb-4">
                Create New Incident
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Incident Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    name="description"
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Priority
                  </label>

                  <select
                    className="form-select"
                    name="priority"
                    onChange={handleChange}
                  >
                    <option value="LOW">
                      Low
                    </option>

                    <option value="MEDIUM">
                      Medium
                    </option>

                    <option value="HIGH">
                      High
                    </option>

                  </select>

                </div>

                <button className="btn btn-dark">

                  {
                    loading
                      ? "Creating..."
                      : "Create Incident"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateIncident;