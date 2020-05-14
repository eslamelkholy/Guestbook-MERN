const myMessageHandler = require("./messageHandler");
function messageController(messageSchema)
{
    // List Messages Using Get
    get = async(request, response) =>{
        try{
            const messages = await messageSchema.find({}).populate({path: "replies user"});
            response.status(201);
            return response.json(messages);
        }catch{
            return response.sendStatus(401);
        }
    }
    // Add Message Using Post
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
    // Update Message Using Put
    put = async(request, response) =>{
        try{
            const message = await myMessageHandler.putMessageData(request);
            await message.save();
            response.status(201)
            return response.json({success: true});
        }catch{
            return response.status(401).json({success: false});
        }
    }
    // Update Message Using Patch
    patch = async(request, response) =>{
        try{
            const message = await myMessageHandler.patchMessageData(request);
            await message.save();
            response.status(201)
            return response.json({success: true});
        }catch{
            return response.status(401).json({success: false});
        }
    }
    // Delete Message
    deleteMsg = async(request, response) =>{
        try{
            await request.message.remove();
            response.status(201); 
            return response.json({success: true});
        }catch{
            return response.status(400).json({success: false});
        }
    }
    return {get, post, put, patch, deleteMsg}
}

module.exports = messageController;