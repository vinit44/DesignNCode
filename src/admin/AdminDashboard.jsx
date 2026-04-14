import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {

  // sidebar state
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">DesignNCode</h2>

        <ul>
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activeSection === "students" ? "active" : ""}
            onClick={() => setActiveSection("students")}
          >
            Students
          </li>

          <li
            className={activeSection === "companies" ? "active" : ""}
            onClick={() => setActiveSection("companies")}
          >
            Companies
          </li>

          <li
            className={activeSection === "interviews" ? "active" : ""}
            onClick={() => setActiveSection("interviews")}
          >
            Interviews
          </li>

          <li className="logout">Logout</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* ================= DASHBOARD ================= */}
        {activeSection === "dashboard" && (
          <>
            <h2>Admin Dashboard</h2>

            <div className="stats">
              <div className="card">
                <h4>Total Students</h4>
                <p>2,450</p>
                <small>Beginner • Intermediate • Advanced</small>
              </div>

              <div className="card">
                <h4>Active Companies</h4>
                <p>156</p>
                <small>42 projects this month</small>
              </div>

              <div className="card">
                <h4>Total Revenue</h4>
                <p>₹45,280</p>
                <small>This month ₹8,450</small>
              </div>
            </div>
          </>
        )}

        {/* ================= STUDENT MANAGEMENT ================= */}
        {activeSection === "students" && (
          <>
            <h3>Student Management</h3>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Points</th>
                  <th>Projects</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="6" className="no-data">
                    No student data available
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* ================= COMPANY MANAGEMENT ================= */}
        {activeSection === "companies" && (
          <>
            <h3>Company Management</h3>

            <table className="table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Projects Posted</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="3" className="no-data">
                    No company data available
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* ================= INTERVIEW MANAGEMENT ================= */}
        {activeSection === "interviews" && (
          <>
            <h3>Interview Management</h3>

            <div className="interview-container">

              <div className="schedule-form">
                <h4>Schedule Interview</h4>

                <label>Student</label>
                <select>
                  <option>Select Student</option>
                </select>

                <label>Company</label>
                <select>
                  <option>Select Company</option>
                </select>

                <label>Date & Time</label>
                <input type="datetime-local" />

                <button className="schedule-btn">
                  Schedule Interview
                </button>
              </div>

              <div className="upcoming">
                <h4>Upcoming Interviews</h4>
                <div className="scroll-box">
                  <p className="no-data">
                    No interviews scheduled
                  </p>
                </div>
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
