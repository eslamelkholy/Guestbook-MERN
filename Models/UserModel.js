const mongoose=require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema=new mongoose.Schema({

    username:{ type: String, required: true,unique:true,sparse:true},
    email:{ type : String, require: true, index:true, unique:true,sparse:true},
    password:{type:String, require:true, unique:true},
    messages: [{type: ObjectId, ref: "Messages"}],
    replies: [{type: ObjectId, ref: "Messages"}]
    
});

//mapping
module.exports =  mongoose.model("Users",userSchema);
