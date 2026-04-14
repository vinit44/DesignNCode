import React, { useState } from "react";
import StatsCard from "./StatsCard";
import PostProject from "./PostProject";
import RateStudents from "./RateStudents";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔹 SAME LOGIC
  const [activeProjects, setActiveProjects] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [studentRating] = useState("Not Rated");

  const handlePostProject = (budget = 0) => {
    setActiveProjects((prev) => prev + 1);
    setTotalBudget((prev) => prev + Number(budget || 0));
  };

  return (
    <div className="dashboard-wrapper">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h3 className="logo">Company</h3>

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Company Dashboard
        </button>

        <button
          className={activeTab === "post" ? "active" : ""}
          onClick={() => setActiveTab("post")}
        >
          Post Project
        </button>

        <button
          className={activeTab === "rate" ? "active" : ""}
          onClick={() => setActiveTab("rate")}
        >
          Rate Students
        </button>
      </aside>

      {/* ===== CONTENT ===== */}
      <main className="dashboard-container">
        {activeTab === "dashboard" && (
          <>
            <h2 className="page-title">Company Dashboard</h2>

            {/* ✅ FIXED: HORIZONTAL 3 BOXES */}
            <div className="stats-grid">
              <StatsCard
                title="Active Projects"
                value={activeProjects}
                subtitle="Total active projects"
              />

              <StatsCard
                title="Total Budget"
                value={`₹${totalBudget}`}
                subtitle="Total budget added"
              />

              <StatsCard
                title="Student Ratings"
                value={studentRating}
                subtitle="Manual"
              />
            </div>
          </>
        )}

        {activeTab === "post" && (
          <PostProject onPostProject={handlePostProject} />
        )}

        {activeTab === "rate" && <RateStudents />}
      </main>
    </div>
  );
};

export default Dashboard;
