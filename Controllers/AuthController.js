const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
  try {
    const { password,  email } = req.body;
    const checkUserRegistered = await User.findOne({email});
    if (checkUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "This user already exist try with a different one please ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyUser = new User({
      password: hashedPassword,
      email,
    });

    await newlyUser.save();

    const token = jwt.sign(
      { userId: newlyUser._id, email: email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '6h' }
    );

    if (newlyUser) {
      return res.status(201).json({
        token,
        userId: newlyUser._id,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
        {
          userId: user._id,
          email: user.email
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "6h",
        }
      );

      return res.status(200).json({
        success:true,
        message : "Logged in successfully",
        token : accessToken,
        userId : user._id
      })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const Validate = async(req,res) =>{
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false });
    }

    // بررسی اعتبار توکن
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // دریافت اطلاعات کاربر از دیتابیس
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ valid: false });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
}

module.exports = {Register,Login,Validate};
