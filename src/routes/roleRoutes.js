const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const RoleController = require("../controllers/roleController");

const router = express.Router();

// Routes for role management (admin-only access)
router.post(
  "/add-role",
  verifyToken,
  authorizeRoles("admin"),
  RoleController.addRole
);

router.delete(
  "/delete-role",
  verifyToken,
  authorizeRoles("admin"),
  RoleController.deleteRole
);

module.exports = router;
