const express = require('express');
const isAuth = require('../Middleware/isauth');
const upload = require("../Middleware/uploads");
const router = express.Router();
const {
    getAllPosts,
    addPost,
    deletePost,
    getOnePost,
    updatePost,
    getPostByUserId,


} = require("../Controllers/postController");

router.get("/post", getAllPosts, );
router.get("/uniquepost",isAuth,getPostByUserId);
router.post("/post", isAuth,upload.single('SelectedFile'), addPost);
router.delete("/post/:id", deletePost);
router.get("/post/:id", getOnePost);
router.put("/post/:id", updatePost);
module.exports = router;