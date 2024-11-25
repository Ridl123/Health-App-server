const jwt = require("jsonwebtoken");
const User = require("../services/schemas/Users");
require("dotenv").config();

const secret = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Lipsă token. Neautorizat!");
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded._id);

    if (!user || user.token !== token) {
      throw new Error("Neautorizat!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Neautorizat!" });
  }
};

module.exports = authMiddleware;
