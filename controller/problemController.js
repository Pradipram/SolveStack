import Problem from "../model/problemSchema.js";
import User from "../model/userSchema.js";

const handleError = (err) =>{
    // console.log(err.message,err.code);
    let errors = {id: '',name: '',rating:'',url:''};
    if(err.message.includes('problem validation failed')){ 
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

export const addproblem = async(req,res)=>{
    // console.log(req.body);
    try{
        const problem = req.body;
        let url = problem.url;
        let email = problem.email;
        let isProblemAlreadySaved = await Problem.findOne({email:email,url:url});
        if(isProblemAlreadySaved){
            return res.status(409).json("This problem already saved");
        }
        else{
            const newProblem = await new Problem(problem);
            console.log('newProblem',newProblem);
            await newProblem.save();
            res.status(200).json(newProblem);
        }
    }
    catch(err){
        const error = handleError(err);
        // console.log('error in add problem',err);
        console.log('error in add problem',error);
        res.status(400).json(error);
        // res.status(500).json({msg:'internal server error',err:err});
    }
}

export const getAllProblems = async(req,res)=>{
    try{
        let userId = req.userId;
        // console.log('userId',userId);
        let user = await User.findById(userId);
        
        // console.log('user',user);
        let email = user.email;
        // console.log(req.params.email);
        // console.log('email',email);
        let problems = await Problem.find({email:email});
        // let problems = await Problem.findById(userId);
        // console.log('problems',problems);
        res.status(200).json(problems);
        // res.status(200).json({msg:'testing getAllProblems'});
    }
    catch(err){
        res.status(400).json({msg:'internal server error ',errors: err});
    }
}