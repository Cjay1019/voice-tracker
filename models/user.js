const mongoose = require("mongoose");

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
            id: {
                type: String,
                required: true,
                unique: true
            },
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

const User = mongoose.model("User", userSchema);

module.exports = User;