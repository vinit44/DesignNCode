const express = require("express");
const router = express.Router();
const db = require("../config/db");
const otpStore = require("../utils/otpStore");
const sendOtpMail = require("../utils/sendOtpMail");

/* ================= SEND OTP ================= */
router.post("/send-otp", async (req, res) => {
  const { email, formData } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    formData,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  try {
    await sendOtpMail(email, otp);
    res.json({ message: "OTP sent to company email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP sending failed" });
  }
});

/* ================= VERIFY OTP & REGISTER ================= */
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const {
    companyName,
    hrName,
    phone,
    website,
    location,
    industry,
    password
  } = record.formData;

  const sql = `
    INSERT INTO companies
    (company_name, hr_name, email, phone, website, location, industry, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      companyName,
      hrName,
      email,
      phone,
      website,
      location,
      industry,
      password
    ],
    (err) => {
      delete otpStore[email];

      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Company already registered" });
        }
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Company registered successfully 🎉" });
    }
  );
});

module.exports = router;
