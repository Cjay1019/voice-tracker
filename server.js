const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");


// Define middleware here
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.use(express.static(path.join(__dirname, "/files")));
    require('dotenv').config();
    console.log("env success");
};

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
});

require("./utils/passport");
require("./routes/api.js")(app, s3);
require("./routes/secure-routes.js")(app);
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/build/index.html")));



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