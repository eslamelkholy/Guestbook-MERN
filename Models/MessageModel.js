const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    _id:Number,
    message:{ type: String},
    replies: [{type: Number, ref: "Replies"}]
});

//mapping
module.exports =  mongoose.model("Messages",messageSchema);
