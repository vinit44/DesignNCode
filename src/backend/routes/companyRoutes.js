const express = require("express");
const router = express.Router();
const db = require("../config/db");
const otpStore = require("../utils/otpStore");
const sendOtpMail = require("../utils/sendOtpMail");

/* =====================================================
   1️⃣ SEND OTP (Company Registration)
===================================================== */
router.post("/send-otp", async (req, res) => {
  const { email, formData } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    formData,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
  };

  try {
    await sendOtpMail(email, otp);
    res.json({ message: "OTP sent to company email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP sending failed" });
  }
});

/* =====================================================
   2️⃣ VERIFY OTP & REGISTER COMPANY
===================================================== */
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

/* =====================================================
   3️⃣ COMPANY LOGIN
===================================================== */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM companies WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Company login successful",
      company: {
        id: result[0].id,
        companyName: result[0].company_name,
        email: result[0].email
      }
    });
  });
});

/* =====================================================
   4️⃣ ADD PROJECT (Company Dashboard)
===================================================== */
router.post("/add-project", (req, res) => {
  const {
    companyId,
    title,
    description,
    skillsrequired,
    totalBudget,
    skilllevelrequired
  } = req.body;

  const sql = `
    INSERT INTO projects
    (company_id, title, description, skills, budget, skill_level)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      companyId,
      title,
      description,
      skillsrequired,
      totalBudget,
      skilllevelrequired
    ],
    (err) => {
      if (err) {
        console.error("Project DB error:", err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json({ message: "Project added successfully" });
    }
  );
});

/* =====================================================
   5️⃣ COMPANY DASHBOARD STATS
===================================================== */
router.get("/dashboard/:companyId", (req, res) => {
  const { companyId } = req.params;

  const sql = `
    SELECT
      COUNT(*) AS activeProjects,
      IFNULL(SUM(budget),0) AS totalBudget
    FROM projects
    WHERE company_id=? AND status='active'
  `;

  db.query(sql, [companyId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    res.json(result[0]);
  });
});

module.exports = router;
