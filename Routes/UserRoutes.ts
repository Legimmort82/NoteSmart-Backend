import express from "express";
import { GetCurrentUser, UpdateUser } from "../Controllers/UserController";
const UserRouter = express.Router();

UserRouter.get("/user/:id", GetCurrentUser);
UserRouter.patch("/user/:id", UpdateUser);

export { UserRouter };
