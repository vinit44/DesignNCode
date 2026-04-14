import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Interview.css";

function Interview() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [applications, setApplications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role || !date) {
      alert("Fill all fields");
      return;
    }

    const newApplication = {
      id: Date.now(),
      role,
      date,
      decision: "Pending",
    };

    setApplications([...applications, newApplication]);
    setRole("");
    setDate("");
    setShowModal(false);
  };

  return (
    <div className="interview-container">
      {/* HEADER */}
      <div className="interview-header">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back
          </button>
          <h1>Interviews</h1>
        </div>

        <button className="apply-btn" onClick={() => setShowModal(true)}>
          Apply
        </button>
      </div>

      {/* TABLE */}
      <table className="interview-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Available Date</th>
            <th>Decision</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty">
                No applications yet
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.role}</td>
                <td>{app.date}</td>
                <td>{app.decision}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Apply for Interview</h2>

            <form onSubmit={handleSubmit}>
              <label>Role</label>
              <input
                type="text"
                placeholder="Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <label>Available Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;
