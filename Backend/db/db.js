const mongoose = require("mongoose");


const connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with database");
  }catch(error){
    console.log(error);
    console.error("Database connection failed");
  }
}

module.exports = connectDb;