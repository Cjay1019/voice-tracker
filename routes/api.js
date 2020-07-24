// const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Character = require('../models/character');
const User = require('../models/user');


module.exports = function (app) {
    app.post("/api/signup",
        passport.authenticate("signup", { session: false }), (req, res) => {
            console.log(req.user)
            res.json({
                message: 'Signup successful',
                user: req.user
            });
        });

    app.post("/api/createCharacter", (req, res) => {
        Character.create(req.body, (err, user) => {
            if (err) res.json(err);
            res.json(user);
        });
    });

    app.post("/api/updateUser", (req, res) => {
        User.findOneAndUpdate(req.body.filter, req.body.update, (err, user) => {
            if (err) res.json(err);
            res.json(user);
        });
    });

    app.post("/api/deleteCharacter", (req, res) => {
        Character.deleteOne(req.body, (err, user) => {
            if (err) res.json(err);
            res.json(user);
        });
    });

    app.post("/api/getCharacters", (req, res) => {
        Character.find(req.body, (err, characters) => {
            if (err) res.json(err);
            res.json(characters);
        });
    });

    app.post("/api/signin", (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) return res.json(err);
            if (!user) return next(info.error ? res.json(info) : res.json({ ...info, error: 1002 }));
            req.login(user, { session: false }, error => {
                if (error) return next(res.json(error));
                const body = { _id: user._id, email: user.email }
                jwt.sign({ user: body }, process.env.JWT_SECRET, (err, token) => {
                    if (err) return next(res.json(err));
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        sameSite: true,
                        signed: true,
                        secure: true
                    });
                    return res.json({ success: true, token, darkModeOn: user.darkModeOn, email: user.email, _id: user._id });
                });
            });
        })(req, res, next);
    });
};