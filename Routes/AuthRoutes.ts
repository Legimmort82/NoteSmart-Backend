import express from "express";
import { Register, Login, Token } from "../Controllers/AuthController";

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.get("/token", Token);

export { AuthRouter };
