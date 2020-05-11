const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{ type: String, required: true},
    email:{ type : String, require: true, index:true, unique:true,sparse:true},
    password:{type:String, require:true},
    messages: [{type: Number, ref: "Messages"}],
    replies: [{type: Number, ref: "Replies"}]
});

//mapping
module.exports =  mongoose.model("Users",userSchema);
