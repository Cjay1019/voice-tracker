const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use("signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    req.body.email = email;
    req.body.password = password;
    User.create(req.body, (err, user) => {
        if (err) return done(err);
        return done(null, user)
    });
}));

passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {

    User.findOne({ "email": email }, (err, user) => {
        if (err) return done(error);
        if (!user) return done(null, false, { message: "User not found" });
        else {
            user.isValidPassword(password, (err, match) => {
                if (err) return done(error);
                if (!match) return done(null, false, { message: "Incorrect Password" });
                else return done(null, user, { message: "Logged in Successfully" });
            })
        }
    });
}));

passport.use(new JWTstrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
}, async (token, done) => {
    console.log("hit jwt")
    try {
        return done(null, token);
    } catch (error) {
        console.log("err")
        done(error);
    }
}));