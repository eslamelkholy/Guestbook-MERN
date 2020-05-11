function messageController(messageSchema)
{
    // List Messages
    get = async(request, response) =>{
        try{
            const messages = await messageSchema.find({}).populate({path: "Replies"})
            response.status(201);
            return response.json(messages);
        }catch{
            return response.send(401);
        }
    }
    // Add Message
    post = async(request, response) =>{
        try{
            const message = new messageSchema(request.body);
            await message.save();
            response.status(201);
            return response.json(message);
        }catch{
            response.status(400);
            return response.status("Please Fill Required Fields");
        }
    }

    return {get, post}
}



module.exports = messageController;