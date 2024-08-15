import express from  "express" ; 
import { createComment, deletecomment, getComment } from "../controllers/comment.controller.js";
const router   = express.Router() ; 

  
router.post("/create",createComment) ; 
router.get("/get",getComment) ; 
router.delete("/delete/:id", deletecomment) ; 

 

export default router  ; 