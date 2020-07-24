const passport = require("passport");
const User = require('../models/user');
const Character = require('../models/character');

module.exports = function (app) {

    app.get("/verifyToken", (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, token, info) => {
            if (token.iat) {
                User.findOne({ _id: token.user._id }, (err, user) => {
                    if (err) console.error(err);
                    delete user.password;
                    res.json({ success: true, message: "Token authenticated", user });
                });
            } else if (info) res.json({ success: false, message: info.message });
        })(req, res, next);
    });

    app.post("/api/getCharacters", (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, token, info) => {
            console.log(token)
            if (token.iat) {
                Character.find(req.body, (err, characters) => {
                    if (err) res.json(err);
                    res.json(characters);
                });
            } else if (info) res.json({ success: false, message: info.message });
        })(req, res, next);
    });
};