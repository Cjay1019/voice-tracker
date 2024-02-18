const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const AWS = require("@aws-sdk/client-s3");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    require('dotenv').config();
    console.log("env success");
};

// Configure client for use with s3
AWS.config.update({ region: "us-east-2" });

const s3 = new AWS.S3({
    endpoint: "https://s3.us-east-2.amazonaws.com",
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
});

require("./utils/passport");
require("./routes/api.js")(app, s3);
require("./routes/secure-routes.js")(app);
app.get("*", (req, res) => res.sendFile("/index.html"));



//Database
//if deployed, use the deployed database, otherwise use local database
let db = process.env.MONGODB_URI || "mongodb://localhost/voiceTracker";

//connect mongoose to database
mongoose.connect(db, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }, error => {
    if (error) console.error("Error: " + error);
    else console.log("Mongoose connection successful");
});

//Listen to port
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));