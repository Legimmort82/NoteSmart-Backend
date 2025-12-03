import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
interface CustomRequest extends Request {
  user: { userId: string; email: string };
}

interface MyJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "لطفاً برای دسترسی وارد شوید",
    });
  }
const customReq = req as CustomRequest
  try {
    const decodedTokenInfo = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as MyJwtPayload;
    customReq.user = {
      userId: decodedTokenInfo.userId,
      email: decodedTokenInfo.email,
    };

    next();
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: "توکن منقضی شده است" });
    }
    res.status(401).json({ message: "توکن نامعتبر است" });
  }
};

export {AuthMiddleware};
