const bcrypt = require("bcrypt");
const User = require("./models/User");
const { findLastKey } = require("lodash");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generating jwt after verification done
    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: findLastKey,
      sameSite: "1ax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ message: "Logout successful" });
};
