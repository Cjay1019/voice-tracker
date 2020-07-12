const User = require("../models/user");

module.exports = {
    create: function (req, res) {
        User.create(req.body).then(dbResult => {
            res.json({ message: "Signup successful", user: req.user });
        });
    }
}