const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Endpoint pentru înregistrare
router.post("/register", registerUser);

// Endpoint pentru autentificare
router.post("/login", loginUser);

// Endpoint pentru deconectare
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
