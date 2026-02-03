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

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        // later redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      }

      setLoading(false);
    } catch (error) {
      alert("Login failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#fee2e2,#f8fafc)",
          pt: "100px"
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Admin Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Admin Email"
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
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AdminLogin;
