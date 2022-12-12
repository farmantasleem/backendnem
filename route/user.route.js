const express=require("express");
const bcrypt=require("bcryptjs");
const { Usermodel } = require("../model/user.model");
const userRoute=express.Router();
const jwt=require("jsonwebtoken")
//user Signup

userRoute.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    if(email&&password){
        try{
            const hashed_password=await bcrypt.hash(password,12);
            console.log(hashed_password)
            const newUser=await Usermodel({email,password:hashed_password,ip:req.connection.remoteAddress});
            await newUser.save();
            res.status(200).send({"msg":"Account Created successfully"})

        }catch(err){
            res.status(500).send({"msg":err.message})   //internal Server Error
        }
    }
    else{
        res.status(404).send({"msg":"Email & Password required"})
    }
})

//user Login

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(email&&password){
        try{   
            const userData=await Usermodel.findOne({email:email})
            if(userData&& userData.password){
                const isMatch= await bcrypt.compare(password,userData.password)
                if(isMatch){
                    const token=jwt.sign({id:userData._id},process.env.JWT_SECRET)

                    res.status(200).send({"msg":"Login Successfull",token})


                }else{
                    res.status(400).send({"msg":"Wrong Password"})
                }

            }else{
                res.status(404).send({"msg":"No account found "})
            }

        }catch(err){  
              res.status(500).send({"msg":err.message})
        }

    }else{
        res.status(404).send({"msg":"Email or Password didnt found"})
    }
})

module.exports={userRoute}