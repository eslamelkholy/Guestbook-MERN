require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
const db = mongoose.connect("mongodb://localhost:27017/Guestbook");
const auth = require("./controllers/middleware");

var port = process.env.PORT || 8000;
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Models
const userSchema = require("./Models/UserModel");
const messageSchema = require("./Models/MessageModel");

// Routers & Injected Models Into it
const MessageRouter = require("./Routers/MessagesRouter")(messageSchema);
const MessageReplyRouter = require("./Routers/MessageReplyRouter")(messageSchema); 
const UserRouter = require("./Routers/UsersRouter")(userSchema);

app.use("", UserRouter);
app.use("/message", auth, MessageRouter);
app.use("/messagereply", auth, MessageReplyRouter);

app.server = app.listen(port, () => {
    console.log("Listening on Port 8000...");
})

module.exports = app;