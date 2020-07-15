const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let userSchema = new Schema({
    darkModeOn: {
        type: Boolean,
        default: false
    },
    userInfo: {
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
        }
    },
    characters: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
                default: ""
            },
            fileUrl: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.userInfo.password, 10, (err, hash) => {
        if (err) return next(err);
        user.userInfo.password = hash;
        next();
    })
})

userSchema.methods.isValidPassword = function (password, next) {
    const user = this;
    bcrypt.compare(password, user.userInfo.password, (err, result) => {
        if (err) return err;
        next(null, result);
    });
}

const User = mongoose.model("User", userSchema);

module.exports = User;