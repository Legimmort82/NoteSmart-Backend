require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./Database/db");
const AuthRoutes = require("./Routes/AuthRoutes");
const NotesRoutes = require("./Routes/NotesRoutes");

// create app
const app = express();

// Listen Port
const PORT = process.env.PORT;

// connect to db
connectToDB();

app.use(
  cors({
    origin: "https://note-m554xvvm1-mhsalims-projects.vercel.app", // فقط به این origin اجازه دسترسی بده
    methods: ["GET", "POST", "PUT", "DELETE"], // متدهای مجاز
    allowedHeaders: ["Content-Type", "Authorization"], // هدرهای مجاز
  })
);

// express middleware
app.use(express.json());

// app.use((req, res) => {
//   res.status(404).json({ message: 'مسیر یافت نشد' });
// });

// Routes
app.use("/api", AuthRoutes);
app.use("/api", NotesRoutes);

app.listen(PORT, () => {
  console.log(`this is test ${PORT}`);
});
