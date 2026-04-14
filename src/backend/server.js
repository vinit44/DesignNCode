const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const otpStore = require("./utils/otpStore");
const sendOtpMail = require("./utils/sendOtpMail");

const app = express();
app.use(cors());
app.use(express.json());

// SEND OTP
app.post("/api/students/send-otp", async (req, res) => {
  const { email, formData } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    formData,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  await sendOtpMail(email, otp);

  res.json({ message: "OTP sent to email" });
});

// VERIFY OTP & REGISTER
app.post("/api/students/verify-otp", (req, res) => {
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
    fullName, phone, college, course, skillLevel, github, password
  } = record.formData;

  const sql = `
    INSERT INTO students
    (full_name, email, phone, college, course, skill_level, github, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fullName, email, phone, college, course, skillLevel, github, password],
    () => {
      delete otpStore[email];
      res.json({ message: "Registration successful" });
    }
  );
});

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
const companyRoutes = require("./routes/companyRoutes");

app.use("/api/company", companyRoutes);

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

app.use("/api/student", require("./routes/studentRoutes"));
