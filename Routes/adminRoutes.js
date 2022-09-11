const express = require('express');
const router = express.Router();
const isAuth = require("../Middleware/isauth");
const isAdmin = require("../Middleware/isAdmin");
const {
    getAllUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser
} = require("../Controllers/AdminController");

router.get("/user",isAuth, isAdmin, getAllUsers);
router.post("/user",isAuth, isAdmin, addUser);
router.delete("/user/:id",isAuth, isAdmin, deleteUser);
router.get("/user/:id", isAuth, isAdmin,getOneUser);
router.put("/user/:id",isAuth, isAdmin, updateUser);
module.exports = router;