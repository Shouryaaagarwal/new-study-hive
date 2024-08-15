
 
import express from "express";
import { getSubjects, getSubjectData ,  deletedoclink, deleteleclink, deletesubjectnotes, deletesubjectDoc  , deletequestionpaperpdf, getsubject, update} from "../controllers/subject.controller.js";
import { verifyAdminToken } from "../Utils/verifyToken.js";

const router = express.Router();

router.get("/:degree/:branch/subjects", getSubjects);
router.get("/:degree/:branch/subjects/:subject/data", getSubjectData);   
router.get("/getsubject/:id", getsubject) ; 
router.post("/doclink/:id/:urlindex",deletedoclink) ;  
router.post("/leclink/:id/:urlindex",deleteleclink) ;  
router.post("/subjectnotespdf/:subjectid/:urlindex", deletesubjectnotes) ;   
router.post("/questionpaperspdf/:subjectid/:urlindex",deletequestionpaperpdf) ;  
 
router.post("/subjects/:id",update ) ; 


router.delete("/subjectDoc/:id", deletesubjectDoc) ;      




router.post("")

export default router;




 