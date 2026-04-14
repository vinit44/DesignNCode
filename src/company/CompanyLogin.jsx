import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import Navbar from "../component/Navbar";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/company/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 🔥 THIS IS THE CRITICAL LINE (YOU WERE MISSING THIS)
      localStorage.setItem("companyId", data.company.id);

      // (optional but useful)
      localStorage.setItem("companyName", data.company.companyName);

      alert("Login successful ✅");

      // redirect AFTER saving companyId
      window.location.href = "/company/dashboard";

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ minHeight: "100vh", background: "#f8fafc", pt: "100px" }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Company Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Company Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CompanyLogin;
