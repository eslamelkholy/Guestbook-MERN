function messageReplyController(messageSchema)
{
    post = async(request, response) =>{
        try{
            const newReplyMessage = new messageSchema(request.body);
            await newReplyMessage.save();
            const mainMessageUpdate = await messageSchema.update({_id : request.body.mainMessageID},{
                $push: {replies: newReplyMessage}
            });
            return response.status(201).json(newReplyMessage);
        }catch(err){
            console.log(err);
            return response.status(402).json({update: false});
        }
    }
    return {post};
}

module.exports = messageReplyController;