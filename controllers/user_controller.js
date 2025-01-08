const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      status_code: 201,
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password Not Match" });
      }

      // payload
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      //   console.log("Generate Token dari Login :" + token);

      return res.status(200).json({
        status: "success | OK",
        message: "Login Success",
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "No Authorization header provided" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided for logout" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!redis.isOpen) {
      await redis.connect();
    }

    await redis.set(`BLACKLIST_TOKEN:${token}`, "blacklist", { EX: 1 * 1 });

    return res.status(200).json({
      status: "success | OK",
      message: "Logout Success",
      success: true,
      token,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token dari logoutuser" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error| Logout" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
