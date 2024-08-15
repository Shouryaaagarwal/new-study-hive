import Comment from "../models/comment.model.js";
import { errorhandler } from "../Utils/errorhandler.js";

 
 export const createComment = async(req  , res , next)=>{
    try{ 
         
        const comment = await Comment.create(req.body);
        return res.status(200).json(comment); 

    } catch(error){
        next(error) ; 
    }
 } 
  
  
  export const getComment  =  async(req , res, next)=>{
    try{
            // const {id} = req.params; 
         
            const comment  = await Comment.find() ;   
            if(!comment) return next(errorhandler(404 , "No Comment Found ")) ; 

            res.status(200).json(comment) ; 
    } catch(error){
    next(error) ; 
    } 

  }    
   
  export const deletecomment =  async(req, res , next)=>{
    try{            
                    const {id} = req.params ; 
                    const comment  =  await Comment.findByIdAndDelete(id) ; 
                    if(!comment) return next(errorhandler(404 , "No Comment Found ")) ; 
                    res.status(200).json({success:true , message:"The Comment has been delete"}) ;
    }catch(error){
        next(error) ; 
    }
  }