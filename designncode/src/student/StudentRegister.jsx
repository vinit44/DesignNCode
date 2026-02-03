import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Navbar from "../component/Navbar";

const StudentRegister = () => {

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

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SEND OTP
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          formData
        })
      });

      setOtpSent(true);
      setLoading(false);

    } catch (error) {
      alert("Failed to send OTP");
      setLoading(false);
    }
  };

  // VERIFY OTP
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
        window.location.href = "/student/login";
      }

      setLoading(false);

    } catch (error) {
      alert("OTP verification failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
          pt: "100px"
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={8} sx={{ padding: 4, borderRadius: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Student Registration
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="College" name="college" value={formData.college} onChange={handleChange} margin="normal" />

              <TextField fullWidth select label="Course" name="course" value={formData.course} onChange={handleChange} margin="normal">
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BSc CS">BSc Computer Science</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="BTech">BTech</MenuItem>
              </TextField>

              <TextField fullWidth select label="Skill Level" name="skillLevel" value={formData.skillLevel} onChange={handleChange} margin="normal">
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
              </TextField>

              <TextField fullWidth label="GitHub Profile" name="github" value={formData.github} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} margin="normal" />

              {!otpSent && (
                <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
                  {loading ? "Sending OTP..." : "Register"}
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* 🔐 OTP POPUP */}
      <Dialog open={otpSent} maxWidth="xs" fullWidth>
        <DialogTitle align="center">OTP Verification</DialogTitle>

        <DialogContent>
          <Typography align="center" sx={{ mb: 2 }}>
            Enter the OTP sent to your email
          </Typography>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            Verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentRegister;
