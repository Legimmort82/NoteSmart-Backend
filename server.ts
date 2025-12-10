require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./Database/db";
import { AuthRouter } from "./Routes/AuthRoutes";
import { NoteRouter } from "./Routes/NotesRoutes";
import { UserRouter } from "./Routes/UserRoutes";

// create app
const app = express();

// Listen Port
const PORT = process.env.PORT;

// connect to db
connectToDB();

app.use(
  cors({
    origin: "http://localhost:3001", // فقط به این origin اجازه دسترسی بده
    methods: ["GET", "POST", "PUT", "DELETE",'PATCH'], // متدهای مجاز
    allowedHeaders: ["Content-Type", "Authorization"], // هدرهای مجاز
    credentials:true
  })
);

// express middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("", AuthRouter);
app.use("", NoteRouter);
app.use("", UserRouter);

app.listen(PORT, () => {
  console.log(`this is test ${PORT}`);
});
