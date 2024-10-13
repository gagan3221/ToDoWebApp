import mongoose from "mongoose";

// connect to database
mongoose.connect('mongodb://localhost:27017/note-app').then(()=>{
    console.log("Connected to Database!!")
}).catch((err)=>{
    console.log("DB connection failed",err)
})