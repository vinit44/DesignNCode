// Import React
import React from "react";

// Import React Router components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./Home";

// Student Pages
import StudentLogin from "./student/StudentLogin";
import StudentRegister from "./student/StudentRegister";

// Company Pages
import CompanyLogin from "./company/CompanyLogin";
import CompanyRegister from "./company/CompanyRegister";

// Admin Page
import AdminLogin from "./admin/AdminLogin";

// App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />

        {/* Admin Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
