const db = require("../config/db");
const bcrypt = require("bcryptjs");
const sendOtpMail = require("../utils/sendOtpMail");

/* ================= SEND OTP ================= */
exports.sendCompanyOtp = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  db.query("DELETE FROM company_otps WHERE email=?", [email]);

  db.query(
    "INSERT INTO company_otps (email, otp, expires_at) VALUES (?, ?, ?)",
    [email, otp, expiresAt],
    async (err) => {
      if (err) {
        return res.status(500).json({ message: "OTP error" });
      }

      await sendOtpMail(email, otp);
      res.json({ message: "OTP sent to company email" });
    }
  );
};

/* ================= VERIFY OTP & REGISTER ================= */
exports.verifyOtpAndRegisterCompany = async (req, res) => {
  const {
    companyName,
    hrName,
    email,
    phone,
    website,
    location,
    industry,
    password,
    confirmPassword,
    otp
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  db.query(
    "SELECT * FROM company_otps WHERE email=? AND otp=? AND expires_at > NOW()",
    [email, otp],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO companies
        (company_name, hr_name, email, phone, website, location, industry, password)
        VALUES (?,?,?,?,?,?,?,?)`,
        [
          companyName,
          hrName,
          email,
          phone,
          website,
          location,
          industry,
          hashedPassword
        ],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "Company already registered" });
            }
            return res.status(500).json({ message: "DB error" });
          }

          db.query("DELETE FROM company_otps WHERE email=?", [email]);
          res.json({ message: "Company registered successfully 🎉" });
        }
      );
    }
  );
};

/* ================= COMPANY LOGIN ================= */
exports.companyLogin = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM companies WHERE email=?",
    [email],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        message: "Company login successful",
        companyId: result[0].id,
        companyName: result[0].company_name
      });
    }
  );
};
