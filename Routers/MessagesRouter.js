const express = require("express");
const messageController = require("../controllers/messageControllers");

function routes(messageSchema)
{
    const MessageRouter = express.Router();
    const controller = messageController(messageSchema);

    MessageRouter.route("").get(controller.get);
    MessageRouter.route("").post(controller.post);

    return MessageRouter;
}

module.exports = routes;