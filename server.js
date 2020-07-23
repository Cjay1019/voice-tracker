const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    require('dotenv').config();
    console.log("env success");
};

require("./utils/passport");
require("./routes/api.js")(app);
require("./routes/secure-routes.js")(app);
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));



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