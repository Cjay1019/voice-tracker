const passport = require("passport");
const User = require('../models/user');

module.exports = function (app) {

    app.get("/verifyToken", (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, token, info) => {
            if (token.iat) {
                User.findOne({_id: token.user._id}, (err, user) => {
                    if (err) console.error(err);
                    res.json({success: true, message: "Token authenticated", user});
                });
            }
            else if (info) res.json({ success: false, message: info.message });
        })(req, res, next);
    });
};