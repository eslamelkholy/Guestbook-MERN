const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    message:{ type: String, required: true},
    date: {type: Date, default: Date.now},
    replies: [{type: Number, ref: "Messages"}]
});

//mapping
module.exports =  mongoose.model("Messages",messageSchema);
