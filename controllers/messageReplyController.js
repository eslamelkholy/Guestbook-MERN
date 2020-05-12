function messageReplyController(messageSchema)
{
    post = async(request, response) =>{
        try{
            const newReplyMessage = new messageSchema(request.body);
            newReplyMessage.isMessage = false;
            await newReplyMessage.save();
            await messageSchema.update({_id : request.body.mainMessageID},{
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
            const mainMessageID = request.body.mainMessageID;
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
    return {post, deleteMessageReply};
}

module.exports = messageReplyController;