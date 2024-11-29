const User = require("../models/userModel");

// Add a new role to a user
const addRole = async (req, res) => {
  try {
    const { username, role } = req.body;

    // Update the user's role
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { role } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Role '${role}' added to user '${username}'`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add role", error });
  }
};

// Remove a role from a user
const deleteRole = async (req, res) => {
  try {
    const { username } = req.body;

    // Revert to default role (e.g., "user")
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { role: "user" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Role removed from user '${username}'. Default role 'user' assigned.`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete role", error });
  }
};

module.exports = { addRole, deleteRole };
