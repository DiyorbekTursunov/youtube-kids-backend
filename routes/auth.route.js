const express = require("express");
const router = express.Router();

const authLogin = require("../controllers/auth/auth.login.controller");
const authRegister = require("../controllers/auth/auth.register.controller");


router.post('/login', authLogin);
router.post('/register', authRegister);


module.exports = router;