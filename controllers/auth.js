const { response } = require("express");
const mysql = require('mysql2/promise'); // Use mysql2 with promise support
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Create connection pool
    const pool = mysql.createPool(config);

    // Get connection from pool
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if user exists
    if (rows.length > 0) {
      const user = rows[0];
      // Check password
      if (password !== user.password) {
        return res.status(400).json({
          msg: "User / Password are incorrect",
        });
      }

      return res.status(200).json({ user });
    } else {
      // User not found
      return res.status(401).json({ message: "User not found !" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
};