// const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Character = require('../models/character');
const User = require('../models/user');

module.exports = function (app, s3) {
    app.post("/api/signup", (req, res) => {
        passport.authenticate("signup", { session: false }, (err, user, info) => {
            if (info) res.json({ ...info, success: false });
            else res.json({ success: true, user: req.user });
        })(req, res);
    });

    app.post("/api/createCharacter", (req, res) => {
        const fileUrl = `https://nyc3.digitaloceanspaces.com/${process.env.AWS_BUCKET}/${req.body.user.email}/${req.body.character.name.replace(/ /g, "_")}.mp3`

        const params = {
            ACL: "public-read",
            Body: Buffer.from(Uint8Array.from(req.body.buffer.data)),
            Bucket: process.env.AWS_BUCKET,
            Key: `${req.body.user.email}/${req.body.character.name.replace(/ /g, "_")}.mp3`,
        };

        const newCharacter = {
            name: req.body.character.name,
            description: req.body.character.description,
            userId: req.body.user.userId,
            fileUrl
        };

        s3.putObject(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);

            Character.create(newCharacter, (error, character) => {
                if (error) res.json(error);
                res.json({ success: true, character });
            });
        });
    });

    app.post("/api/updateUser", (req, res) => {
        User.findOneAndUpdate(req.body.filter, req.body.update, (err, user) => {
            if (err) res.json(err);
            res.json(user);
        });
    });

    app.post("/api/deleteCharacter", (req, res) => {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: req.body.character.fileUrl.split(`https://nyc3.digitaloceanspaces.com/${process.env.AWS_BUCKET}/`)[1],
        };

        s3.deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(`Deleted file ${req.body.character.fileUrl}`);
            Character.deleteOne({ _id: req.body.character._id }, (err, user) => {
                if (err) res.json(err);
                console.log(`Deleted character ${req.body.character.name}`)
                res.json(user);
            });
        });
    });

    app.post("/api/signin", (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) return res.json(err);
            if (!user) return next(info.error ? res.json(info) : res.json({ ...info, error: 1002 }));
            req.login(user, { session: false }, error => {
                if (error) return next(res.json(error));
                const body = { _id: user._id, email: user.email }
                jwt.sign({ user: body }, process.env.JWT_SECRET, (err, token) => {
                    if (err) return next(res.json(err));
                    res.cookie("jwt", token, { httpOnly: true, sameSite: true });
                    delete user.password;
                    return res.json({ success: true, token, user });
                });
            });
        })(req, res, next);
    });
};