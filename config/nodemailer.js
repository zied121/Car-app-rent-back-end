const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "ziedbensalah10@gmail.com",
        pass: "lchyusmmdsmeelbl"
    }
});


module.exports.sendConfirmationEmail = (email, activitionCode) => {
    
    try {
        transporter.sendMail({
            from: "ziedbensalah10@gmail.com",
            to: email,
            subject: "Confirmation Email",
            html: `<h1>Confirmation Email</h1>
            <p>Click on the link to confirm your account</p>
            <a href="http://localhost:3000/verify/${activitionCode}">Confirm</a>`
        });
    } catch (err) {
        console.log(err);
    }

};