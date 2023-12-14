import express from "express"
import { getuser, logoutUser, signIn, signUp } from "../controller/userController.js";
import { DeleteProblem, UpdateProblem, addproblem, getAllProblems } from "../controller/problemController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',signIn);
router.get('/getuser',getuser);
router.post('/logout',logoutUser);
router.post('/addproblem',requireAuth,addproblem);
router.get('/getallproblems',requireAuth,getAllProblems);
router.put('/updateproblem',UpdateProblem);
router.delete('/deleteproblem/:id',DeleteProblem);

export default router;