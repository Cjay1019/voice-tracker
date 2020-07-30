const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;

passport.use("signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    User.create(req.body, (err, user) => {
        if (err && err.errors && err.errors.email) {
            return done(null, false, { message: err.errors.email.properties.msg, error: err.errors.email.properties.error });
        } else if (err && err.errors && err.errors.password) {
            return done(null, false, { message: err.errors.password.properties.msg, error: err.errors.password.properties.error });
        } else if (err && err.code === 11000) return done(null, false, { message: "Duplicate email", error: 1007 });
        else return done(null, user);
    });
}));

passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {

    User.findOne({ "email": email }, (err, user) => {
        if (err) return done(error);
        if (!user) return done(null, false, { success: false, message: "User not found", error: 1000 });
        else {
            user.isValidPassword(password, (err, match) => {
                if (err) return done(error);
                if (!match) return done(null, false, { success: false, message: "Incorrect Password", error: 1001 });
                else return done(null, user, { success: true, message: "Logged in Successfully" });
            })
        }
    });
}));


const cookieExtractor = req => {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

passport.use(new JWTstrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor
}, async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        done(error);
    }
}));