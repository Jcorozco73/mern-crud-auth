import express from "express";  
import morgan from "morgan";
import authRoutes  from '../src/routes/auth.routes.js'
import taskRoutes from "../src/routes/task.routes.js"

import mongoose from "mongoose";

import cookieParser from "cookie-parser";


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api',taskRoutes )


const connectDB =  () => {
    
    mongoose.connect("mongodb+srv://jcmartinorozco:16080073@cluster0.hvxvolp.mongodb.net/?retryWrites=true&w=majority")
    console.log('DB is connected')
}

app.listen(5001)
console.log('Server is running on port', 5001)

connectDB()










