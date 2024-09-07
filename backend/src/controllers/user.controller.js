const db = require('../models');
const helper = require('../helpers/helper');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = db.userModel;

// Setup nodemailer transporter using environment variables for security
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'rini.asmitac@gmail.com',
        pass: process.env.SMTP_PASS || '4TkwaVXSJbE10ZqD',  // Store credentials in environment variables
    },
});

// Test API route
exports.testApi = (req, res) => {
    res.status(200).json({ error: false, message: "Working...." });
};

// User registration
exports.register = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    if (!name  || !email  || !role) {
        res.status(200).send({
            error: true,
            message: "Fullname  / Email / Role can not be empty!"
        });
        return;
    }

    User.findOne({
        where: {
            u_email: email
        }, attributes: {}
    })
        .then(user => {
            if (user) {
                res.status(200).json({ error: true, message: "Profile with the phone and email is already registered" });
            } else {
                const profile = User.create({
                    u_name: name,
                    u_email: email,
                    u_role: role,
                }).then(result => {
                    res.status(200).json({ error: false, message: "Profile created successfully", data: result });
                }).catch(error => {
                    res.status(500).send({
                        error: true,
                        message: error.message || "Some error occurred while saving the information"
                    });
                });
            }
        })
        .catch(error => {
            res.status(200).send({
                error: true,
                message: error.message || "Some error occurred while retrieving the information"
            });
        });
}


// User login (send OTP)
exports.login = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: true, message: "Email cannot be empty!" });
    }

    User.findOne({ where: { u_email: email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: true, message: "Profile not found" });
            }

            const otp = helper.getRandomCode();  // Generate OTP
            user.u_otp = otp;
            return user.save().then(() => {
                // Email OTP
                const mailOptions = {
                    from: process.env.SMTP_USER || 'rini.asmitac@gmail.com',
                    to: email,
                    subject: 'Your Veridion Security Code for Login',
                    text: `Your Veridion Security Code for login is: ${otp}`,
                };
                return transporter.sendMail(mailOptions);
            });
        })
        .then(() => {
            res.status(200).json({ error: false, message: "Security Code sent to your registered email address" });
        })
        .catch(error => {
            res.status(500).json({
                error: true,
                message: error.message || "An error occurred while retrieving the information"
            });
        });
};

// OTP validation
exports.validateOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send({ error: true, message: "Email / OTP cannot be empty!" });
    }

    User.findOne({ where: { u_email: email, u_otp: otp } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: true, message: "Email / Security Code does not match" });
            }

            const token = helper.generateToken();  // Generate token
            const expire_on = helper.getCurrentDateTime();  // Token expiration time

            user.u_token = token;
            user.u_token_expired_at = expire_on;
            return user.save();
        })
        .then(user => {
            res.status(200).json({ error: false, message: "Authenticated", user });
        })
        .catch(error => {
            res.status(500).json({
                error: true,
                message: error.message || "An error occurred while retrieving the information"
            });
        });
};
