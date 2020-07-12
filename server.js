const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const passport = require("passport");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    require('dotenv').config();
    console.log("env success");
}

require("./routes/api.js")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

passport.use("signup", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await User.create({ email, password });
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
}))

//Database
//if deployed, use the deployed database, otherwise use local database
let db = process.env.MONGODB_URI || "mongodb://localhost/voiceTracker";

//connect mongoose to database
mongoose.connect(db, { useNewUrlParser: true }, error => {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Mongoose connection successful");
    }
});

//Listen to port
app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});