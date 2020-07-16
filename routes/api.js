// const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
    // express routes
    app.post("/api/signup",
        passport.authenticate("signup", { session: false }), (req, res) => {
            console.log(req.user)
            res.json({
                message: 'Signup successful',
                user: req.user
            });
        });

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err || !user) return next(new Error("An error occurred"));
            req.login(user, { session: false }, (error) => {
                if (error) return next(error);
                const body = { _id: user._id, email: user.userInfo.email }
                jwt.sign({ user: body }, process.env.JWT_SECRET, (err, token) => {
                    if (err) return next(err);
                    return res.json({ token });
                });
            });
        })(req, res, next);
    });

    // app.post("/api/create", userController.create);

    // app.put("/api/:id", userController.update);
};