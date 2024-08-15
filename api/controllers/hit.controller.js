import Subject from "../models/subject.model.js";  
import {errorhandler}  from  "../Utils/errorhandler.js"

 
 export const  starques =  async(req ,res, next)=>{  
  try{

    const {id} =  req.params  ; 
    const subject =  await Subject.findByIdAndUpdate(id) ; 
    if(!subject) return next(errorhandler(404 , "Subject not found")) ;    

    if(subject.starquestionotes===false){

      subject. starquestionotes = true;   
    }else{
      subject.starquestionotes = false  ; 
    }
    await subject.save() ;          
    res.status(200).json(subject) ;
  }catch(error){
    next(error) ; 
  }
 }     


 export const starnotes =  async (req , res , next)=>{ 
  try{   
    const {id} =  req.params    
    const subject =  await Subject.findByIdAndUpdate(id) ; 
    if(!subject) return next(errorhandler(404 , "Subject not found")) ; 
    if(subject.starsubjectnotes === false ){
      subject.starsubjectnotes = true  ; 
    } else {
      subject.starsubjectnotes =  false  ; 
    }   
    await subject.save() ; 

    res.status(200).json(subject) ;

  }catch(error){
    next(error) ; 
  }
 }   

 export const starleclinkandpdflink   = async(req , res , next)=>{
  try{  
    const {id}=  req.params ; 
    const subject =  await Subject.findByIdAndUpdate(id) ; 
    if(!subject) return next(errorhandler(404 , "Subject not found ")) ; 
    if(subject.starlecandpdflink === false){
      subject.starlecandpdflink = true  ; 
    }else{
      subject.starlecandpdflink = false  ; 
    }  

    await subject.save() ;
    res.status(200).json(subject) ;

  }catch(error){
    next(error) ; 
  }
 }  


 export const stardoclink  = async(req  , res , next)=>{  
  try{   
    const {id} =  req.params ; 
    const subject =  await Subject.findByIdAndUpdate(id) ; 

    if(!subject) return next(errorhandler(404 , "Subject not found")) ; 
    if(subject.stardoclink === false){
      subject.stardoclink = true  ; 
    }else{
      subject.stardoclink = false  ; 
    }  
    await subject.save() ; 
    res.status(200).json(subject) ;
  }catch(error){
    next(error) ; 
  }
 }