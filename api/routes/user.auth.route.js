import express from  "express"  
import {  signIn, signUp, signout, google, updateUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../Utils/verifyToken.js";
 
 

const router = express.Router() ; 


router.post("/signIn", signIn) ;  
router.post("/signup", signUp) ; 
router.post("/signout", signout) ;  
router.post("/google", google) ;  
router.post("/updateuser/:id", verifyToken,updateUser)
 


export default router ;  






