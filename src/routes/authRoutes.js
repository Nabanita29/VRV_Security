const express = require('express');
const { body } = require('express-validator'); // Import express-validator
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Validation for the register route
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"), // Username must not be empty
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"), // Password must be strong
    body("role")
      .isIn(["user", "admin", "moderator"])
      .withMessage("Role must be either 'user', 'admin', or 'moderator'") // Restrict role to specific values
  ],
  register
);

// Validation for the login route
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"), // Username is required
    body("password").notEmpty().withMessage("Password is required") // Password is required
  ],
  login
);

module.exports = router;
