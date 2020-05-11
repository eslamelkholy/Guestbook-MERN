const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    _id:Number,
    messageReply:{ type: String}
});

//mapping
module.exports =  mongoose.model("Replies",replySchema);
