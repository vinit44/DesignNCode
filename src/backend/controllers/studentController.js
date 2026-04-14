const db = require("../config/db");
const bcrypt = require("bcryptjs");
const sendOtpMail = require("../utils/sendOtpMail");

/* ===== SEND OTP ===== */
const sendStudentOtp = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  db.query("DELETE FROM student_otps WHERE email=?", [email]);

  db.query(
    "INSERT INTO student_otps (email, otp, expires_at) VALUES (?, ?, ?)",
    [email, otp, expiresAt],
    async (err) => {
      if (err) {
        return res.status(500).json({ message: "OTP error" });
      }

      await sendOtpMail(email, otp);
      res.json({ message: "OTP sent to email" });
    }
  );
};

/* ===== VERIFY OTP & REGISTER ===== */
const verifyOtpAndRegisterStudent = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    college,
    course,
    skillLevel,
    github,
    password,
    confirmPassword,
    otp
  } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  db.query(
    "SELECT * FROM student_otps WHERE email=? AND otp=? AND expires_at > NOW()",
    [email, otp],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO students
        (full_name,email,phone,college,course,skill_level,github_link,password)
        VALUES (?,?,?,?,?,?,?,?)`,
        [
          fullName,
          email,
          phone,
          college,
          course,
          skillLevel,
          github,
          hashedPassword
        ],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "Email already registered" });
            }
            return res.status(500).json({ message: "DB error" });
          }

          db.query("DELETE FROM student_otps WHERE email=?", [email]);
          res.json({ message: "Registration successful" });
        }
      );
    }
  );
};
/* ===== LOGIN STUDENT ===== */
const loginStudent = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT * FROM students WHERE email=?",
    [email],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const student = result[0];

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // ✅ SEND SKILL LEVEL
      res.json({
        message: "Login successful",
        skillLevel: student.skill_level,
        studentId: student.id,
        fullName: student.full_name
      });
    }
  );
};

/* ===== EXPORTS (THIS IS CRITICAL) ===== */
module.exports = {
  sendStudentOtp,
  verifyOtpAndRegisterStudent,
  loginStudent
};
