const express = require("express");
const messageController = require("../controllers/messageControllers");

function routes(messageSchema)
{
    const MessageRouter = express.Router();
    const controller = messageController(messageSchema);
}

module.exports = routes;