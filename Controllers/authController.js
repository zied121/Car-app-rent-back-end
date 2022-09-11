const User = require('../model/Usermodel');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const {
    sendConfirmationEmail
} = require('../config/nodemailer');

const registerUser = async (req, res) => {
    const user = req.body;
    //  methode to create activition token
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let activitionCodetoken = '';
    for (let i = 0; i < 25; i++) {
        activitionCodetoken += characters[Math.floor(Math.random() * characters.length)];
    };

    try {
        const userFound = await User.findOne({
            email: user.email
        });


        if (userFound) {
            res.status(401).send({
                msg: 'user already exists'
            });

        } else {
            const hashedPasword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
                name: user.name,
                email: user.email,
                password: hashedPasword,
                activitionCode: activitionCodetoken
            });

            await newUser.save();
            console.log(newUser);

            const token = jwt.sign({
                    _id: newUser._id
                },
                "shhhhh",
            );
            res.status(200).json({
                newUser,
                token
            });
            // sned confirmation email
            sendConfirmationEmail(newUser.email, newUser.activitionCode);
        }


    } catch (err) {
        res.status(400).json({
            msg: " server error"
        });

    }
};
const loginUser = async (req, res) => {
    const user = req.body;
    try {
        const userFound = await User.findOne({
            email: user.email
        });
        if (!userFound) {
            res.status(401).json({
                msg: 'user not found'
            });
        }
        const isMatch = await bcrypt.compare(user.password, userFound.password);
        if (!isMatch) {
            res.status(401).json({
                msg: 'password is incorrect'
            });
        } else if (userFound.isActive === false) {
            res.status(401).json({
                msg: 'user is not active'
            });
        } else {
            const token = jwt.sign({
                _id: userFound._id
            }, "shhhhh");
            res.status(200).send({
                userFound,
                token
            });
        }


    } catch (err) {
        res.status(401).json({
            msg: "server error"
        });

    }

}
const isverify = (req, res) => {
    console.log(req.params.activitionCode);
    User.findOne({
        activitionCode: req.params.activitionCode
    }).then((user) => {
        if (!user) {
            res.status(401).json({
                msg: 'user not found'
            });
        } else if (user.isActive === true) {
            res.status(401).json({
                msg: 'user is already active'
            });
        } else {


            user.isActive = true;
            user.save();
        }



    }).catch((err) => {
        console.log(err);
    });


}

module.exports = {
    loginUser,
    registerUser,
    isverify
};