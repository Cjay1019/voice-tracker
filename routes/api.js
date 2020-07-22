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
    })

    app.post("/api/pop", (req, res) => {
        User.findOne({ "email": req.body.email })
            .populate("characters").exec((err, characters) => {
                res.json(characters)
            })
    })

    app.post("/api/signin", (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) return res.json(err);
            if (!user) return next(res.json(info));
            req.login(user, { session: false }, (error) => {
                if (error) return next(res.json(error));
                const body = { _id: user._id, email: user.email }
                jwt.sign({ user: body }, process.env.JWT_SECRET, (err, token) => {
                    if (err) return next(res.json(err));
                    return res.json({ success: true, token, darkModeOn: user.darkModeOn, email: user.email, _id: user._id });
                });
            });
        })(req, res, next);
    });
};