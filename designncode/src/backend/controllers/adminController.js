const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email=?",
    [email],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ message: "Admin login successful" });
    }
  );
};
