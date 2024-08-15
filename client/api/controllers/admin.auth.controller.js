

import Admin from "../models/Admin.model.js"; 
import jwt from "jsonwebtoken" ; 
import bcryptjs from "bcryptjs" ; 
import { errorhandler } from "../Utils/errorhandler.js";
 

export const signIn = async(req , res , next)=>{ 
    const {adminname,  adminemail,adminpassword , isAdmin } = req.body ;  
 

    try{   
        const admin = await Admin.findOne({adminemail}) ;  
        
        if(!admin) return next(errorhandler(400, "You are not Authorized as admin")) ;
        if(admin.adminname!==adminname) next(errorhandler(400 ,"Invalid Admin name")) ; 
                 
                const token = jwt.sign({adminemail}, process.env.SECRET_KEY) ; 

                const {adminpassword:pass, ...rest}  = admin._doc ;
                res.cookie("admin_token", token,{httpOnly:true}). 
                status(200).json(rest) ;  
        
            } catch(error){
                next(error); 
        
            
    } 
}  


export const signOut =(req , res , next)=>{
    try{
            res.clearCookie("admin_token").status(200).json("Admin Logged Out") ; 
    } catch(error){  
        next(error);
    }
}    
