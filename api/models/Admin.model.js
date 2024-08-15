import mongoose  from "mongoose"; 
 
 const Adminschema = new mongoose.Schema({
        adminname:{
            type:String , 
            required:true  
        } , 
        adminemail:{ 
            type:String , 
            required:true ,
            unique:true 
        }, 
       
        isAdmin: {
            type:Boolean ,
         
        }    
        
 }) 


 const Admin = mongoose.model("Admin" ,Adminschema);

 export default  Admin ; 