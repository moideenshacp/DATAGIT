import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("mongodb connected")
    } catch (error) {
        console.log(error);
        
    }
}

