const express=require("express");
const dotenv=require("dotenv");
const app=express();
app.use(express.json());

app.listen(8001,()=>{
    console.log("Server started on port no 8001")
})