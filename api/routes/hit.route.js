import express from "express" ; 
import { stardoclink, starleclinkandpdflink, starnotes, starques } from "../controllers/hit.controller.js";

const router  =  express.Router() ; 
 

router.post("/questionpaper/:id", starques) ;   
router.post("/subjectnotes/:id" , starnotes) ;  
router.post("/lecandpdflink/:id", starleclinkandpdflink) ;  
router.post("/doclink/:id",stardoclink) ; 



export default router ; 