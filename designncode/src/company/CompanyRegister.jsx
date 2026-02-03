import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Navbar from "../component/Navbar";

const CompanyRegister = () => {

  const [formData, setFormData] = useState({
    companyName: "",
    hrName: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    industry: "",
    password: "",
    confirmPassword: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SEND OTP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { companyName, hrName, email, password, confirmPassword } = formData;

    if (!companyName || !hrName || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:5000/api/company/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, formData })
      });

      setOtpSent(true);
      setLoading(false);
    } catch {
      alert("Failed to send OTP");
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/company/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = "/company/login";
      }

      setLoading(false);
    } catch {
      alert("OTP verification failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#eef2ff,#f8fafc)", pt: "100px" }}>
        <Container maxWidth="sm">
          <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Company Registration
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Company Name" name="companyName" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="HR Name" name="hrName" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email" name="email" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Phone" name="phone" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Website" name="website" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Location" name="location" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Industry" name="industry" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} margin="normal" />

              {!otpSent && (
                <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
                  {loading ? "Sending OTP..." : "Register"}
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* OTP POPUP */}
      <Dialog open={otpSent} maxWidth="xs" fullWidth>
        <DialogTitle align="center">Email Verification</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button fullWidth variant="contained" onClick={verifyOtp} disabled={loading}>
            Verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyRegister;
