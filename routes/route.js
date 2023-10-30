import express from "express"
import { getuser, logoutUser, signIn, signUp } from "../controller/userController.js";
import { addproblem, getAllProblems } from "../controller/problemController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',signIn);
router.get('/getuser',getuser);
router.post('/logout',logoutUser);
router.post('/addproblem',requireAuth,addproblem);
router.get('/getallproblems',requireAuth,getAllProblems);

export default router;