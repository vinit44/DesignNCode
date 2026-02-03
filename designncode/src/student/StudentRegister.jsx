import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem
} from "@mui/material";
import Navbar from "../component/Navbar";

const StudentRegister = () => {

  // ================= STATE =================
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    skillLevel: "",
    github: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔐 OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SEND OTP =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:5000/api/students/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          formData
        })
      });

      alert("OTP sent to your email 📧");
      setOtpSent(true);
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/students/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otp
          })
        }
      );

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = "/login";
      }

      setLoading(false);

    } catch (error) {
      alert("OTP verification failed");
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <>
      <Navbar />

      <Box sx={{ minHeight: "100vh", background: "#f8fafc", pt: "100px" }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Student Registration
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="College"
                name="college"
                value={formData.college}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                select
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BSc CS">BSc Computer Science</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="BTech">BTech</MenuItem>
              </TextField>

              <TextField
                fullWidth
                select
                label="Skill Level"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="GitHub Profile"
                name="github"
                value={formData.github}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
              />

              {/* 🔐 OTP INPUT */}
              {otpSent && (
                <>
                  <TextField
                    fullWidth
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    margin="normal"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    Verify OTP
                  </Button>
                </>
              )}

              {/* REGISTER BUTTON */}
              {!otpSent && (
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Register"}
                </Button>
              )}

            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentRegister;
