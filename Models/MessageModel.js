const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    message:{ type: String, required: true},
    replies: [{type: Number, ref: "Replies"}]
});

//mapping
module.exports =  mongoose.model("Messages",messageSchema);
