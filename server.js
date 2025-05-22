require("dotenv").config();
const express = require("express");
const connectToDB = require('./Database/db')
const AuthRoutes = require('./Routes/AuthRoutes')

// create app
const app = express();

// Listen Port
const PORT = process.env.PORT 

// connect to db
connectToDB()

// express middleware
app.use(express.json());

// Routes
app.use('/api',AuthRoutes)


app.listen(PORT, () => {
  console.log(`this is test ${PORT}`);
});
