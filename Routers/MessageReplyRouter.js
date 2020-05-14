const express = require("express");
const messageReplyController = require("../controllers/messageReplyController");
const messageController = require("../controllers/messageControllers");

function routes(replySchema, messageSchema)
{
    const MessageReplyRouter = express.Router();
    const myMessageReplyController = messageReplyController(replySchema, messageSchema);

    // { Add } New Reply
    MessageReplyRouter.post("", myMessageReplyController.post);
    // Reply Middleware
    MessageReplyRouter.use("/:id", async(request, response, next) =>{
        try{
            const reply = await replySchema.findOne({_id: request.params.id});
            console.log(Reply);
            if(reply){
                request.reply = reply;
                return next();
            }
            throw Error();
        }catch{
            return response.sendStatus(404)
        }
    });
    // { Update } & { Delete } Message Reply
    MessageReplyRouter.route("/:id").
    put(myMessageReplyController.put)
    .delete(myMessageReplyController.deleteMessageReply);

    return MessageReplyRouter;
}

module.exports = routes;