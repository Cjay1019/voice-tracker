const userController = require("../controllers/userController");

module.exports = function (app) {
    // express routes
    app.post("/api/signup",
        passport.authenticate("signup", { session: false }),
        userController.create);

    // app.get("/api/:id", userController.find);

    // app.put("/api/:id", userController.update);
};