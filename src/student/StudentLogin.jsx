import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(
      "http://localhost:5000/api/students/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // ✅ store login info
    localStorage.setItem("student", JSON.stringify(data));

    // ✅ redirect based on skill level
    if (data.skillLevel === "Beginner") {
      navigate("/beginner");
    } else if (data.skillLevel === "Intermediate") {
      navigate("/intermediate");
    } else {
      navigate("/dashboard");
    }

    setLoading(false);

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error");
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />

      <Box sx={{ minHeight: "100vh", pt: "100px", background: "#f8fafc" }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Student Login
            </Typography>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentLogin;
