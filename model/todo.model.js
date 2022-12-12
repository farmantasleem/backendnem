const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    taskname:{type:String,required:true},
    status:{type:String,default:"pending"},
    tag:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,required:true,ref:'user'}
})

const Todomodel=mongoose.model("todo",todoSchema);

module.exports={Todomodel}