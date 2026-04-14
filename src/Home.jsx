// Import React
import React from "react";

// Import useNavigate hook
import { useNavigate } from "react-router-dom";

// Import Navbar
import Navbar from "./component/Navbar";

// Import CSS
import "./Home.css";

// Home component
const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <header className="home-header">
        <h1>DesignNCode</h1>
        <p>Learn • Build • Get Industry Ready</p>
      </header>

      {/* ROLE SECTION */}
      <div className="role-section">

        {/* STUDENT */}
        <div className="role-card student">
          <h2>Student</h2>
          <p>Register or login to access learning resources.</p>
          <button onClick={() => navigate("/student/register")}>Student Register</button>
          <button onClick={() => navigate("/student/login")}>Student Login</button>
        </div>

        {/* COMPANY */}
        <div className="role-card company">
          <h2>Company</h2>
          <p>Hire students and manage opportunities.</p>
          <button onClick={() => navigate("/company/register")}>Company Register</button>
          <button onClick={() => navigate("/company/login")}>Company Login</button>
        </div>

        {/* ADMIN */}
        <div className="role-card admin">
          <h2>Admin</h2>
          <p>Manage platform, users, and approvals.</p>
          <button onClick={() => navigate("/admin/login")}>Admin Login</button>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2026 DesignNCode | All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default Home;
