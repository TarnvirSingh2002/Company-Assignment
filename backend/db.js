import mongoose from "mongoose"

export const db=()=>{
     mongoose.connect("mongodb://localhost:27017/intershalla")
    .then(()=>console.log('DB connected successfully'))
    .catch((err)=>{
        console.log('DB connection failed')
        console.log(err);
    })
};