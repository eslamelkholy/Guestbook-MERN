const myMessageHandler = require("./messageHandler");
function messageController(messageSchema)
{
    // List Messages Using Get
    get = async(request, response) =>{
        try{
            const messages = await messageSchema.find({}).populate({path: "Replies"})
            response.status(201);
            return response.json(messages);
        }catch{
            return response.send(401);
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
            return response.status(201).json({success: true});
        }catch{
            return response.status(401).json({success: false});
        }
    }
    // Update Message Using Patch
    patch = async(request, response) =>{
        try{
            const message = await myMessageHandler.patchMessageData(request);
            await message.save();
            return response.status(201).json({success: true});
        }catch{
            return response.status(401).json({success: false});
        }
    }


    return {get, post, put, patch}
}
// Handle { Put } Message Data Before Updating It
// putMessageData =(request) =>{
//     request = filterMessageData(request);
//     const { message } = request;
//     message.message = request.body.message;
//     message.date = request.body.date;
//     return message;
// }
// // Handle { Patch } Message Specified Data
// patchMessageData = (request) =>{
//     request = filterMessageData(request);
//     const { message } = request;
//     Object.entries(request.body).forEach(item =>{
//         const key = item[0];
//         const value = item[1];
//         message[key] = value;
//     });
//     return message;
// }
// // Filter Message Data
// filterMessageData = (request) =>{
//     if(request.body._id)
//         delete request.body._id;
//     return request;
// }


module.exports = messageController;