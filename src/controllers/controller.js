const {
  createAccount,
  checkUserDB,
  logOutAccount,
} = require("../services/services");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createAccount({ name, email, password });
    res.status(201).json({
      message: "Cont creat cu succes!",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkUserDB({ email, password });
    res.status(200).json({
      message: "Autentificare reușită!",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        token: user.token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await logOutAccount(userId);
    res.status(200).json({ message: "Deconectare reușită!" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
