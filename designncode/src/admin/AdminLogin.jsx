import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import Navbar from "../Navbar";

const AdminLogin = () => {
  return (
    <>
      {/* NAVBAR (FULL WIDTH, FIXED) */}
      <Navbar />

      {/* PAGE WRAPPER */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f8fafc",
          pt: "100px",              // 👈 space below navbar
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
            >
              Admin Login
            </Typography>

            <Box component="form">
              <TextField
                fullWidth
                label="Admin Email"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
              />

              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
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

export default AdminLogin;
