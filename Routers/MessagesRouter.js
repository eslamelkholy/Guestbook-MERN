const express = require("express");
const messageController = require("../controllers/messageControllers");

function routes(messageSchema)
{
    const MessageRouter = express.Router();
    const controller = messageController(messageSchema);
    MessageRouter.route("").get(controller.get);
    MessageRouter.route("").post(controller.post);
    // Message Middleware
    MessageRouter.use("/:id", async(request, response, next) =>{
        try{
            const message = await messageSchema.findOne({_id: request.params.id, isMessage: true}).populate({path: "replies user"});
            if(message){
                request.message = message;
                return next();
            }
            throw Error();
        }catch{
            return response.sendStatus(404)
        }
    });
    MessageRouter.route("/:id")
    .get((request, response) => response.json(request.message))
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteMsg);

    return MessageRouter;
}

module.exports = routes;