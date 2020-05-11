module.exports = {

    // Handle { Put } Message Data Before Updating It
    putMessageData: (request) =>{
        request = filterMessageData(request);
        const { message } = request;
        message.message = request.body.message;
        message.date = request.body.date;
        return message;
    },
    // Handle { Patch } Message Specified Data
    patchMessageData: (request) =>{
        request = filterMessageData(request);
        const { message } = request;
        Object.entries(request.body).forEach(item =>{
            const key = item[0];
            const value = item[1];
            message[key] = value;
        });
        return message;
    },
};
// Filter Message Data
filterMessageData = (request) =>{
    if(request.body._id)
        delete request.body._id;
    return request;
}