const User = require("../models/user");

module.exports = {
    create: function (req, res) {
        console.log(User)
        User.create(req.body).then(dbResult => {
            res.json(dbResult);
        });
    }
}