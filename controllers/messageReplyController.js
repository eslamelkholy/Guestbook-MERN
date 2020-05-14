function messageReplyController(replySchema, messageSchema)
{
    post = async(request, response) =>{
        try{
            const newReplyMessage = new replySchema(request.body);
            await newReplyMessage.save();
            await messageSchema.update({_id : request.body.message},{
                $push: {replies: newReplyMessage}
            });
            return response.status(201).json(newReplyMessage);
        }catch(err){
            console.log(err);
            return response.status(402).json({update: false});
        }
    }
    deleteMessageReply = async(request, response) =>{
        try{
            const mainMessageID = request.body.message;
            await messageSchema.findOneAndUpdate(mainMessageID,
                {$pull: {replies : request.message._id}},{new: true}
            );
            await request.message.remove();
            response.status(201);
            return response.json({success: true});
        }catch{
            return response.status(400).json({success: false});
        }
    }
    put = async(request, response) =>{
        try{
            const {reply} = {request};
            reply.replyBody = request.body.replyBody;
            await reply.save();
            response.status(201)
            return response.json({success: true});
        }catch{
            return response.status(401).json({success: false});
        }
    }
    return {post, deleteMessageReply, put};
}

module.exports = messageReplyController;