import express from "express";
import { signIn, signOut} from "../controllers/admin.auth.controller.js";
import { verifyAdminToken, verifyToken } from "../Utils/verifyToken.js";
import { createSubject } from "../controllers/subject.controller.js";

const router = express.Router();

router.post("/auth/signin", signIn);
router.post("/auth/signout", signOut); 
router.post("/create/subject", createSubject) ; 
router.post("/comment")

export default router;


