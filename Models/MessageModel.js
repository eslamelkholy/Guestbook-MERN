const mongoose=require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema=new mongoose.Schema({

    message:{ type: String, required: true},
    date: {type: Date, default: Date.now},
    isMessage: {type:Boolean, default:true},
    replies: [{type: ObjectId, ref: "Messages"}]
    
});

//mapping
module.exports =  mongoose.model("Messages",messageSchema);
