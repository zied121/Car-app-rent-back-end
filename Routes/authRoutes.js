 const express = require('express');
 const router = express.Router();

 const {
     loginUser,
     registerUser,
     isverify


 } = require("../Controllers/authController");

 router.post('/login', loginUser);
 router.post('/register', registerUser);
 router.post('/verify/:activitionCode', isverify);

 module.exports = router;