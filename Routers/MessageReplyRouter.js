const express = require("express");
const messageReplyController = require("../controllers/messageReplyController");

function routes(messageSchema)
{
    const MessageReplyRouter = express.Router();
    const controller = messageReplyController(messageSchema);

    

    return MessageReplyRouter;
}

module.exports = routes;