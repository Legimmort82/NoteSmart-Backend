import express from "express";
import { GetCurrentUser, UpdateUser } from "../Controllers/UserController";
import { AuthMiddleware } from "../MiddleWares/AuthMiddleware";

const UserRouter = express.Router();

UserRouter.use(AuthMiddleware);

UserRouter.get("/user/:id", GetCurrentUser);
UserRouter.patch("/user/:id", UpdateUser);

export { UserRouter };
