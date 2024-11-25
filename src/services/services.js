const User = require("../services/schemas/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const createAccount = async ({ name, email, password }) => {
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Eroare la crearea contului.");
  }
};

const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email sau parolă incorectă!");
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      secret,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const logOutAccount = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Neautorizat!");
    }
    user.token = null;
    await user.save();
    return userId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  checkUserDB,
  logOutAccount,
};
