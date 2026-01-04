import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import Navbar from "../component/Navbar";

const StudentLogin = () => {
  return (
    <>
      {/* NAVBAR (FULL WIDTH) */}
      <Navbar />

      {/* PAGE WRAPPER */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f8fafc",
          pt: "100px",          // 👈 space below fixed navbar
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
              Student Login
            </Typography>

            <Box component="form">
              <TextField
                fullWidth
                label="Email"
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

export default StudentLogin;
