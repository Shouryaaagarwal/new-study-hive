import express from "express";

import mongoose from "mongoose";
import userRoute from "./routes/user.auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";  
import adminRoute from "./routes/admin.route.js" 
import subjectRoute from "./routes/subject.route.js"  
import commentRoute  from "./routes/comment.route.js" 
import hitRoute from  "./routes/hit.route.js"
import cors from "cors" ;
import { verifyAdminToken, verifyToken } from "./Utils/verifyToken.js";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to the database");
}); 

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: `${process.env.PORT}`, 
  credentials: true,
})); 

app.use("/api/user/auth", userRoute) ;
app.use("/api/admin", adminRoute) ;  
app.use("/api/update", subjectRoute)  
app.use("/api/get",subjectRoute) ; 
app.use("/api/delete", subjectRoute) ; 
app.use("/api/comment",commentRoute) ;   
app.use("/api/hit", hitRoute) ;  
app.use("/api/star", hitRoute) ; 


 





app.use((err, req, res, next) => {
  if (err) {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Issue";
    return res.status(statuscode).json({
      success:false,
      message,
      statuscode,
    });
  }
});

 app.listen(3000, () => {
  console.log(`Sever is running`);
});

