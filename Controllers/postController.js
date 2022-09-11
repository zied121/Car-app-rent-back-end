const Post = require('../model/Postmodel');
const addPost = async (req, res) => {
    const post = req.body;
    const userId = req.user
     console.log(userId)

    try {

        const newPost = new Post({
            titel: post.titel,
            price: post.price,
            content: post.content,
            startDate: post.startDate,
            endDate: post.endDate,
            userID: userId,
            datecreated: Date.now()
        });

        await newPost.save();
        res.status(200).json({
            newPost
        });
    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};
const getAllPosts = async (req, res) => {
    try {
        const posts = await post.find();
        res.status(200).json({
            posts
        });
    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};

const getPostByUserId = async (req, res) => {
    try {
        const posts = await Post.find({
            userID: req.user.id
        });
        res.status(200).json({
            posts
        });

    } catch (err) {
        res.status(400).json({
            msg: "server failed"
        });
    }
}

const getOnePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await post.findById(id);
        if (!post) {
            return res.status(401).send({
                msg: 'No post found'
            });
        } else {
            res.status(200).json({
                post
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};
const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = req.body;
    try {
        const postFound = await post.findById(id);
        if (!postFound) {
            return res.status(401).send({
                msg: 'No post found'
            });
        } else {
            const updatedPost = await post.findByIdAndUpdate(id, post, {
                new: true
            });
            res.status(200).json({
                updatedPost
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};
const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const postFound = await post.findById(id);
        if (!postFound) {
            return res.status(401).json({
                msg: 'No post found'
            });
        } else {
            const deletedPost = await post.findByIdAndDelete(id);
            res.status(200).json({
                deletedPost
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};

module.exports = {
    addPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost,
    getPostByUserId
};