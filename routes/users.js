const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

//Get Validations
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require("../validations/login");

// Get User Model
const User = require("../models/user");


router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json({ ...errors, success: false });
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists", success: false });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(() => res.json({ msg: "Login Successfully.", success: true }))
                        .catch(err => console.log(err));
                });
            });
        }
    });
})


router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check login validations
    if (!isValid) {
        return res.status(400).json({ ...errors, success: false });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists in database
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found", success: false });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            msg: "Successfully Login",
                            token,
                        });
                    }
                );

            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect", success: false });
            }
        });
    });
});


const client = new OAuth2Client("132671983651-pm6kl9817bpgbrfg8t0kqd3lshuoauuq.apps.googleusercontent.com")

router.post('/google-auth', (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: "132671983651-pm6kl9817bpgbrfg8t0kqd3lshuoauuq.apps.googleusercontent.com" }).then((data) => {

        const { email, name } = data.payload;

        User.findOne({ email }).then(user => {

            if (user) {
                const payload = {
                    id: user.id,
                    name: user.name,
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {

                        if (err) {
                            res.json({
                                success: false,
                                msg: "Login Failed",
                            });
                        }

                        res.json({
                            success: true,
                            msg: "Successfully Login",
                            token,
                        });
                    }
                );

            } else {
                const newUser = new User({
                    name,
                    email,
                });
                newUser
                    .save()
                    .then((data) => {

                        const payload = {
                            id: data.id,
                            name: data.name,
                        };

                        jwt.sign(
                            payload,
                            process.env.SECRET_KEY,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: "Login Failed",
                                    });
                                }

                                res.json({
                                    success: true,
                                    msg: "Successfully Login",
                                    token,
                                });
                            }
                        );
                    })
                    .catch(err => console.log(err));

            }
        });

    }).catch((error) => {
        console.log(error)
    })
})

module.exports = router;