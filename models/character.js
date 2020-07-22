const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let characterSchema = new Schema({
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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;