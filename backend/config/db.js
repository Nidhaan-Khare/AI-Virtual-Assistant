import mongoose from "mongoose"
import dotenv from "dotenv"

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    }catch(error){
        // console.log(error);
        console.log("nid");
    }
}

export default connectDb;