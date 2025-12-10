import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser } from "../Models/User";
import { Response, Request } from "express";

const Register = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const checkUserRegistered: IUser[] | null = await User.findOne({ email });
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
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "14d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

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
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const Login = async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "14d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const Token = (req: Request, res: Response) => {
  const token = req.cookies?.token;
  
  if (!token) return res.status(401).json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    res.status(200).json({ user: decoded });
  } catch {
    res.status(401).json({ user: null });
  }
};

export { Register, Login, Token };
