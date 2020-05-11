const mongoose=require("mongoose");
const replySchema=new mongoose.Schema({
    messageReply:{ type: String}
});

//mapping
module.exports =  mongoose.model("Replies",replySchema);
