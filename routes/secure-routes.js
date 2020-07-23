const passport = require("passport");

module.exports = function (app) {


    app.get("/verifyToken", (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, token, info) => {
            if (token.iat) res.json({success: true, message: "Token authenticated"})
            else if (info) res.json({ success: false, message: info.message })
        })(req, res, next);
    });
};