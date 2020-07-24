const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;

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
        if (!user) return done(null, false, { message: "User not found", error: 1000 });
        else {
            user.isValidPassword(password, (err, match) => {
                if (err) return done(error);
                if (!match) return done(null, false, { message: "Incorrect Password", error: 1001 });
                else return done(null, user, { message: "Logged in Successfully" });
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