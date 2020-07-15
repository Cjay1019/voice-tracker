const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use("signup", new localStrategy({
    usernameField: "userInfo[email]",
    passwordField: "userInfo[password]",
    passReqToCallback: true
}, (req, email, password, done) => {
    req.body.userInfo.email = email;
    req.body.userInfo.password = password;
    User.create(req.body, (err, user) => {
        if (err) return done(err);
        return done(null, user)
    });
}));

passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {

    User.findOne({ "userInfo.email": email }, (err, user) => {
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
    // try {
    //     const user = await User.findOne({ "userInfo.email": email });
    //     if (!user) {
    //         return done(null, false, { message: "User not found" });
    //     }

    //     const validate = await user.isValidPassword(password);
    //     if (!validate) {
    //         return done(null, false, { message: "Incorrect Password" });
    //     }
    //     return done(null, user, { message: "Logged in Successfully" });
    // } catch (error) {
    //     return done(error);
    // }
}));

passport.use(new JWTstrategy({
    secretOrKey: "test-secret",
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
}, (err, token, done) => {
    if (err) return done(err);
    return done(null, token.user);
}))