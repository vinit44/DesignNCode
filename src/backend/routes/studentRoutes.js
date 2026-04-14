const bcrypt = require("bcryptjs");

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const otpStore = require("../utils/otpStore");
const sendOtpMail = require("../utils/sendOtpMail");
//const bcrypt = require("bcryptjs");


/* =====================================================
   1️⃣ SEND STUDENT OTP (REGISTRATION)
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
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  try {
    await sendOtpMail(email, otp);
    res.json({ message: "OTP sent to student email 📧" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP sending failed" });
  }
});

/* =====================================================
   2️⃣ VERIFY OTP & REGISTER STUDENT
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
    fullName,
    phone,
    college,
    course,
    skillLevel,
    github,
    password
  } = record.formData;
  const hashedPassword = bcrypt.hashSync(password, 10);


  const sql = `
    INSERT INTO students
    (student_name, email, phone, college, course, skill_level, github, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      fullName,
      email,
      phone,
      college,
      course,
      skillLevel,
      github,
      // password
      hashedPassword
    ],
    (err) => {
      delete otpStore[email];

      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Student already registered" });
        }
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Student registered successfully 🎉" });
    }
  );
});
/* =====================================================
   3️⃣ STUDENT LOGIN
===================================================== */
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   db.query(
//     "SELECT * FROM students WHERE email = ?",
//     [email],
//     async (err, result) => {
//       if (err || result.length === 0) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       const student = result[0];

//       // 🔒 SAFETY CHECK (for old plain-text passwords)
//       if (!student.password.startsWith("$2")) {
//         return res.status(400).json({
//           message: "Account created before security update. Please re-register."
//         });
//       }

//       const isMatch = await bcrypt.compare(password, student.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       res.json({
//         message: "Login successful",
//         skillLevel: student.skill_level,
//         studentId: student.id,
//         fullName: student.full_name

//       });
//     }
//   );
// });
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM students WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({ message: "DB error" });
        }

        if (result.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const student = result[0];

        if (!student.password || !student.password.startsWith("$2")) {
          return res.status(400).json({
            message: "Please re-register (old account)"
          });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
          message: "Login successful",
          skillLevel: student.skill_level,
          fullName: student.full_name
        });
      }
    );
  } catch (error) {
    console.error("LOGIN CRASH:", error);
    res.status(500).json({ message: "Server crashed" });
  }
});


/* =====================================================
   3️⃣ ADD STUDENT FOR RATING
===================================================== */
router.post("/add", (req, res) => {
  const { student_name, project_name, status } = req.body;

  const sql = `
    INSERT INTO ratestudents
    (student_name, project_name, status)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [student_name, project_name, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json({
      id: result.insertId,
      student_name,
      project_name,
      status,
      rating: null
    });
  });
});

/* =====================================================
   4️⃣ UPDATE STUDENT RATING
===================================================== */
router.put("/rate/:id", (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE ratestudents
    SET rating = ?
    WHERE id = ?
  `;

  db.query(sql, [rating, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json({ message: "Rating updated successfully ⭐" });
  });
});

/* =====================================================
   5️⃣ GET ALL STUDENTS (RATED / UNRATED)
===================================================== */
router.get("/all", (req, res) => {
  db.query(
    "SELECT * FROM ratestudents ORDER BY created_at DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "DB error" });
      }
      res.json(result);
    }
  );
});

module.exports = router;
