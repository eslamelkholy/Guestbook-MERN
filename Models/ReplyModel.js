const mongoose=require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;

const replySchema=new mongoose.Schema({

    replyBody:{ type: String, required: true},
    date: {type: Date, default: Date.now},
    message: {type: ObjectId, ref: "Messages"},
    user: {type: ObjectId, ref: "Users"}
    
});

//mapping
module.exports =  mongoose.model("Replies",replySchema);
