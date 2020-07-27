const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let userSchema = new Schema({
    darkModeOn: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    staySignedIn: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    })
})

userSchema.methods.isValidPassword = function (password, next) {
    const user = this;
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return err;
        next(null, result);
    });
}

const User = mongoose.model("User", userSchema);

module.exports = User;