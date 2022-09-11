const express = require('express');
const router = express.Router();
const isAuth = require("../Middleware/isauth");

const {

    getOneUser,

    updateUser,

} = require("../Controllers/userController");


router.put("/profile", isAuth, updateUser);
router.get("/profile", isAuth, getOneUser)
module.exports = router;