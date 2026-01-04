import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Divider,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Desktop hover
  const [loginAnchor, setLoginAnchor] = useState(null);
  const [registerAnchor, setRegisterAnchor] = useState(null);

  // Mobile menu
  const [mobileAnchor, setMobileAnchor] = useState(null);

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{ background: "linear-gradient(90deg,#0f172a,#1e293b)" }}
    >
      <Toolbar>

        {/* LOGO */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}
        >
          DesignNCode
        </Typography>

        {/* ================= DESKTOP ================= */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" ,  gap: 3, }}>

          {/* LOGIN */}
          <Button
            color="inherit"
             onMouseEnter={(e) => {
    setRegisterAnchor(null);      // 👈 CLOSE REGISTER
    setLoginAnchor(e.currentTarget);
  }}
          >
            Login
          </Button>
          <Menu
            anchorEl={loginAnchor}
            open={Boolean(loginAnchor)}
            onClose={() => setLoginAnchor(null)}
            MenuListProps={{ onMouseLeave: () => setLoginAnchor(null) }}
          >
            <MenuItem component={Link} to="/student/login">Student Login</MenuItem>
            <MenuItem component={Link} to="/company/login">Company Login</MenuItem>
            <MenuItem component={Link} to="/admin/login">Admin Login</MenuItem>
          </Menu>

          {/* REGISTER */}
          <Button
            color="inherit"
            
            onMouseEnter={(e) => {
    setLoginAnchor(null);         // 👈 CLOSE LOGIN
    setRegisterAnchor(e.currentTarget);
  }}
          >
            Register
          </Button>
          <Menu
            anchorEl={registerAnchor}
            open={Boolean(registerAnchor)}
            onClose={() => setRegisterAnchor(null)}
            MenuListProps={{ onMouseLeave: () => setRegisterAnchor(null) }}
          >
            <MenuItem component={Link} to="/student/register">Student Register</MenuItem>
            <MenuItem component={Link} to="/company/register">Company Register</MenuItem>
          </Menu>
        </Box>

        {/* ================= MOBILE ================= */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={(e) => setMobileAnchor(e.currentTarget)}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileAnchor}
            open={Boolean(mobileAnchor)}
            onClose={() => setMobileAnchor(null)}
            PaperProps={{
              sx: {
                width: 260,
                borderRadius: 2,
                mt: 1
              }
            }}
          >
            {/* LOGIN SECTION */}
            <Typography sx={{ px: 2, py: 1, fontSize: 13, fontWeight: 600, color: "text.secondary" }}>
              LOGIN
            </Typography>
            <MenuItem component={Link} to="/student/login">
              <ListItemText primary="Student Login" />
            </MenuItem>
            <MenuItem component={Link} to="/company/login">
              <ListItemText primary="Company Login" />
            </MenuItem>
            <MenuItem component={Link} to="/admin/login">
              <ListItemText primary="Admin Login" />
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            {/* REGISTER SECTION */}
            <Typography sx={{ px: 2, py: 1, fontSize: 13, fontWeight: 600, color: "text.secondary" }}>
              REGISTER
            </Typography>
            <MenuItem component={Link} to="/student/register">
              <ListItemText primary="Student Register" />
            </MenuItem>
            <MenuItem component={Link} to="/company/register">
              <ListItemText primary="Company Register" />
            </MenuItem>

          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
