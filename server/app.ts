import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './src/config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './src/routes/userRoute'

dotenv.config()
connectDb()
const app = express()

app.use(cookieParser()); 

app.use(
    cors({
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST","PUT","PATCH"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    })
  );
app.use(express.json())
app.use('/api',userRoute)


const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
    
})