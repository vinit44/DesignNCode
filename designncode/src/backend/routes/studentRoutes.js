const express = require("express");
const router = express.Router();

const {
  sendStudentOtp,
  verifyOtpAndRegisterStudent
} = require("../controllers/studentController");

/* 🔴 DEBUG — MUST PRINT FUNCTIONS */
console.log("sendStudentOtp:", sendStudentOtp);
console.log("verifyOtpAndRegisterStudent:", verifyOtpAndRegisterStudent);

router.post("/send-otp", sendStudentOtp);
router.post("/verify-otp", verifyOtpAndRegisterStudent);

module.exports = router;
