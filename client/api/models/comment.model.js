import mongoose  from "mongoose"; 
 

const commentSchema = new mongoose.Schema({ 
    degree:{
        type: String,
        required:true ,
    } , 
    branch:{
        type:String,
        required:true ,
    } ,  
    subject:{
        type:String, 
        required:true , 
    } 
    ,  
     section:{
        type:String , 
        required:true, 
     } , 
     id:{
        type:String , 
        required:true, 
     }  , 
     

    names:{
        type:String , 
        required:true , 
    } ,  
      
    email:{
        type:String , 
        required:true, 
    }, 
     
    comment:{
        type:String,  
        required:true
    }
}) 


const Comment  =  mongoose.model("Comment", commentSchema) ; 

export default Comment  ; 
