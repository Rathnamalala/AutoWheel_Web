import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'; 
import authRouter from './routes/authRoute.js';

import cookieParser from 'cookie-parser';






dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
console.log('DB connection successful!');
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3001, () => {
  console.log('Server is running on port 3001!!!');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);







app.use((err,req,res,next)=> {  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
});  