const mongoose=require("mongoose");

const connection=mongoose.connect(process.env.DB_URL);

module.exports={connection}