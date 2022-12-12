const express=require("express");
require("dotenv").config();

const cors=require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./route/user.route");
const { todoRoute } = require("./route/todos.route");
const app=express();
app.use(cors());
app.use(express.json());

app.use("/user",userRoute)
app.use("/todos",todoRoute)
app.listen(8001,async()=>{
    console.log("Listening on Port no 8001")
    try{
       await connection
       console.log("db connected")
    }catch(err){
        console.log("err db",err.message)
    }
})