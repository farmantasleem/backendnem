const express=require("express");
const { authentication } = require("../middleware/authentication");
const { Todomodel } = require("../model/todo.model");

const todoRoute=express.Router();


//Create new todo;

todoRoute.post("/",authentication,async(req,res)=>{
    const userID=req.body.userid;
    try{
        const newTodo=await Todomodel({...req.body,user:userID})
        await newTodo.save();

        res.status(200).send(newTodo)

    }catch(err){
        res.status(500).send({msg:err.message})
    }

})

//Filter based on query

todoRoute.get("/",authentication,async(req,res)=>{
    const status=req.query?.staus;
    const userId=req.body.userid
    const tag=req.query?.tag

    try{
        const allTodo=await Todomodel.find({user:userId,tag,status})
        res.status(200).send(allTodo)
    }catch(err){
        res.status(404).send({"msg":err.message})
    }

})

//todo based on id;

todoRoute.get("/:todoid",authentication,async(req,res)=>{
    const todoid=req.params.todoid;
    const userid=req.body.userid
    try{
        const todo=await Todomodel.findOne({user:userid,_id:todoid});
        if(todo?.status){
            res.status(200).send(todo)
        }else{
            res.status(400).send({"msg":"Not found"})
        }
    }catch(err){
        res.status(400).send({msg:err.message})
    }
})

//delete todo

todoRoute.delete("/:todoid",authentication,async(req,res)=>{
    const userid=req.body.userid;
    const todoid=req.params.todoid;
    try{
        
        const noteOne=await Todomodel.findOne({_id:todoid,user:userid});
        if(noteOne?.status){
            await Todomodel.findOneAndDelete({_id:todoid})
            res.status(200).send({msg:"Deleted Successfully"})
        }else{
            res.status(404).send({"msg":"Not authenticate to delete"})
        }

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// update

todoRoute.put("/:todoid",authentication,async(req,res)=>{
    const userid=req.body.userid;
    const todoid=req.params.todoid;

    try{
        const find_task=await Todomodel.findOne({_id:todoid,user:userid});

        if(find_task?.status){
            await Todomodel.findOneAndUpdate({_id:todoid},{...req.body})
            res.status(200).semd({"msg":"updated successfully"})
        }else{
            res.status(404).send({"msg":"Not Found your todo with this id"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//update status

todoRoute.put("/status/:todoid",authentication,async(req,res)=>{
    const userid=req.body.userid;
    const todoid=req.params.todoid;

    try{
        const find_task=await Todomodel.findOne({_id:todoid,user:userid});

        if(find_task?.status){
            await Todomodel.findOneAndUpdate({_id:todoid},{status:find_task.status=="pending"?"Done":"pending"})
            res.status(200).semd({"msg":"updated successfully"})
        }else{
            res.status(404).send({"msg":"Not Found your todo with this id"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={todoRoute}

//get all the todos for specific user

// todoRoute.get("/",authentication,async(req,res)=>{
//     const userid=req.body.userid;
//     try{
//         const alltodos=await Todomodel.find({user:userid});
//         if(alltodos.length>0){
//             res.status(200).send(alltodos) //sending all the data
//         }else{
//             res.status(404).send({"msg":"no data found"})
//         }
//     }catch(err){
//         res.status(500).send({"msg":err.message})
//     }
// })

