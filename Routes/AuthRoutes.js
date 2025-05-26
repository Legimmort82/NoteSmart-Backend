const express = require("express");
const { Register, Login,Validate } = require("../Controllers/AuthController");


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/validate", Validate);

module.exports = router;
