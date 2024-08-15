
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      
    },
    branch: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    pdfdescription: {
      type: String,
    },
    links: {
      type: [String],

    },
    linkdescription: {
      type: String,
    },
    documentationlink: {
      type: [String],
      
    },
    documentationlinkdesc: {
      type: String,
    },
    questionpaperdec: {
      type: String,
    },
    subjectnotesUrls: {
      type: [String],
    },
    questionpaperUrls: {
      type: [String],
    },    
    starsubjectnotes:{
      type:Boolean ,  
      default:false
    }  ,    
  
    starquestionotes:{
      type:Boolean  ,  
      default:false 
    }  ,   
    starlecandpdflink:{
      type:Boolean , 
      default:false 
    }  ,  
    stardoclink:{
      type:Boolean, 
      default:false 
    }  ,  
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;