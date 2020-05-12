const express = require("express");
const messageReplyController = require("../controllers/messageReplyController");

function routes(messageSchema)
{
    const MessageReplyRouter = express.Router();
    const controller = messageReplyController(messageSchema);

    MessageReplyRouter.post("", controller.post)

    return MessageReplyRouter;
}

module.exports = routes;