const passport = require("passport");

module.exports = function (app) {
    const test = app.get("/test", (req, res) => {
        res.json({
            message: "Secure route",
            user: req.user,
            token: req.query.secret_token
        })
    });

    app.get("/user", passport.authenticate("jwt", { session: false }), test);
};