const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const Register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const checkUserRegistered = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "This user already exist try with a different one please ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyUser = new User({
      username,
      password: hashedPassword,
      email,
      role: role || "user",
    });

    await newlyUser.save();

    if (newlyUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to register user! please try again.",
      });
    }
  } catch (error) {
    console.log(error);
     return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "6h",
        }
      );

      return res.status(200).json({
        success:true,
        message : "Logged in successfully",
        accessToken : accessToken
      })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {Register,Login};
