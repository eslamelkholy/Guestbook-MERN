const express = require("express");
const messageReplyController = require("../controllers/messageReplyController");
const messageController = require("../controllers/messageControllers");

function routes(messageSchema)
{
    const MessageReplyRouter = express.Router();
    const myMessageReplyController = messageReplyController(messageSchema);
    const myMessageController = messageController(messageSchema);

    // { Add } New Reply
    MessageReplyRouter.post("", myMessageReplyController.post);
    // Reply Middleware
    MessageReplyRouter.use("/:id", async(request, response, next) =>{
        try{
            const message = await messageSchema.findOne({_id: request.params.id, isMessage: false});
            console.log(message);
            if(message){
                request.message = message;
                return next();
            }
            throw Error();
        }catch{
            return response.sendStatus(404)
        }
    });
    // { Update } & { Delete } Message Reply
    MessageReplyRouter.route("/:id").
    put(myMessageController.put)
    .delete(myMessageReplyController.deleteMessageReply);

    return MessageReplyRouter;
}

module.exports = routes;