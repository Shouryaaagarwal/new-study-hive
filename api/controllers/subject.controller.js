

import { errorhandler } from "../Utils/errorhandler.js";
import Subject from "../models/subject.model.js";

export const createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);
    return res.status(200).json(subject);
  } catch (error) {
    next(error);
  }
};

export const getSubjects = async (req, res, next) => {
  const { degree, branch } = req.params;
  try {
    const subjects = await Subject.find({ degree, branch });

    if (!subjects || subjects.length === 0) {
      return next(errorhandler(404, "No subjects found"));
    }

    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
};

export const getSubjectData = async (req, res, next) => {
  const { degree, branch, subject } = req.params;
  try {
    const subjects = await Subject.find({ degree, branch, subject });

    if (!subjects || subjects.length === 0) {
      return next(errorhandler(404, `No data found for subject: ${subject}`));
    }

    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
};

// Update a specific subject by subjectId
export const deletedoclink = async (req, res, next) => {
  try {
    const {id, urlindex} = req.params;
   const subject = await Subject.findById(id); 
   if(!subject)return next(errorhandler(404, "Subject Not found")) ; 
   subject.documentationlink.splice(urlindex , 1) ; 
   await subject.save() ;  
      res.status(200).json({success:true, message:"Link deleated"}) 
  } catch (error) {
    next(error);
  }
}; 

export const deleteleclink = async (req, res, next) => {
  try {
    const { id  , urlindex } = req.params ;
    const subject = await Subject.findById(id);
    if (!subject) return next(errorhandler(404, "Subject Not found"));
    subject.links.splice(urlindex , 1);
    await subject.save();
    res.status(200).json({ success: true, message: "link deleted" });
  } catch (error) {
    next(error); 
  }
}; 

  
 export const deletesubjectnotes = async(req ,res , next)=>{
  try{
    const {subjectid  , urlindex} =  req.params  ; 
    const subject = await Subject.findById(subjectid) ; 
    if(!subject) return next(errorhandler(404 , "Subject Not Found")) ; 
    subject.subjectnotesUrls.splice(urlindex, 1) ;  
    await subject.save() ; 
    res.json({success:true , subject})
  } catch(error){
    next(error) ; 
  }
 }     
   
  export const deletequestionpaperpdf =  async(req, res , next)=>{
    try{
      const {subjectid  , urlindex} =  req.params  ; 
      const subject = await Subject.findById(subjectid) ; 
      if(!subject) return next(errorhandler(404 , "Subject Not Found")) ; 
      subject.questionpaperUrls.splice(urlindex, 1) ;  
      await subject.save() ; 
      res.json({success:true , subject})
    } catch(error){
      next(error) ; 
    }
  }


 export const deletesubjectDoc = async(req, res, next)=>{
  try{
    const{id} = req.params ; 
    const subject = await Subject.findByIdAndDelete(id) ; 
    if(!subject)return next(errorhandler(404 , "Subject Not Found")) ; 
    res.status(200).json({success:true , message:"Subject Deleted"}) ;
  }catch(error){
   next(error) ; 
  }
 }  
  

   
 export const getsubject =async( req ,res , next)=>{   
  try{
    const {id} = req.params ; 
    const subject  =  await  Subject.findById(id) ; 
    if(!subject) return next(errorhandler(404, "Subject Not Found")) ;  
    res.status(200).json(subject) ; 

  }catch(error){
        next(error) ; 
  }

 }
  
 export const update =  async(req , res, next)=>{
  try{
    const {id} = req.params ; 
    const subject = await Subject.findByIdAndUpdate(id, req.body, {new: true}) ; 
    if(!subject) return next(errorhandler(404, "Subject Not Found")) ;  
    res.status(200).json(subject) ;} 
    catch(error){
    next(error) ; 
  }
 }