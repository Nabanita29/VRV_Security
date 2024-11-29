const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const helmet = require("helmet");
const apiLimiter = require("./middlewares/rateLimitMiddleware");

// Connect to the database
dbConnect();

const app = express();

// Middleware
app.use(helmet()); // Add Helmet for securing HTTP headers
app.use(express.json()); // Allow JSON parsing

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
// Apply rate limiting middleware globally
app.use(apiLimiter);


// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => { //callback
  console.log(`Server is running on port ${PORT}`);
});