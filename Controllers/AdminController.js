const User = require('../model/Usermodel');
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(401).send('No users found');
        } else {
            res.status(200).json({
                users
            });
        }


    } catch (err) {
        res.status(400).json({
            msg: 'something is wrong'
        });


    }
};
const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).send({
                msg: 'No user found'
            });
        } else {
            res.status(200).json({
                user
            });
        }

    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }

};
const addUser = async (req, res) => {
    const user = req.body;

    try {
        const userFound = await User.findOne({
            email: user.email
        });
        if (userFound) {
            return res.status(401).send({
                msg: 'user already exists'
            });
        } else {
            const newUser = new User({
                name: user.name,
                email: user.email,
                password: user.password
            });
            const savedUser = await newUser.save();
            res.status(200).json({
                msg: "user saved successfully",
            });
        }


    } catch (err) {
        res.status(400).json({
            msg: "saving failed"
        });
    }

};
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send({
                msg: 'No user found'
            });
        } else {
            await User.findByIdAndDelete(id);
            res.status(200).json({
                msg: 'user deleted successfully'
            });
        }

    } catch (err) {
        res.status(400).json({
            msg: "delete is failed"
        });
    }

};
const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const userFound = await User.findById(id);
        if (!userFound) {
            return res.status(401).send({
                msg: 'No user found'
            });
        } else {
            await User.findByIdAndUpdate(id, user);
            res.status(200).json({
                msg: 'user updated successfully'
            });
        }

    } catch (err) {
        res.status(400).json({
            msg: "update is failed"
        });
    }

};


module.exports = {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser

};