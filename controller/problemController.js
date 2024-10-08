import Problem from "../model/problemSchema.js";
import User from "../model/userSchema.js";

const handleError = (err) => {
    let errors = { id: '', name: '', rating: '', url: '',other:'' };
    try{
    
        if (err.message && err.message.includes('problem validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                if(properties){
                    errors[properties.path] = properties.message;
                }
                else{
                    errors.other = err.message;
                }
                // console.log(properties);
            });
            // console.log(err.errors);
        }
        return errors;
    }
    catch(err){
        errors.other = 'Something Unexpected happened';
    }
};



export const addproblem = async(req,res)=>{
    // console.log(req.body);
    try{
        let problem = req.body;
        let url = problem.url;
        let email = problem.email;
        let isProblemAlreadySaved = await Problem.findOne({email:email,url:url});
        if(isProblemAlreadySaved){
            return res.status(409).json("This problem already saved");
        }
        else{
            let created_at = Date.now();
            let updated_at = Date.now();
            problem.created_at = created_at;
            problem.updated_at = updated_at;
            const newProblem = await new Problem(problem);
            // console.log('newProblem',newProblem);
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

export const UpdateProblem = async(req,res) =>{
    try{
        // console.log("coming in UpdateProblem");
        // console.log(req.body);
        // const res = Problem.findOneAndUpdate(req.body._d,{status:req.body.status});
        const updatedProblem = await Problem.findByIdAndUpdate(req.body._id,{status:req.body.status,updated_at: Date.now()},{new:true}).exec();
        res.status(200).json(updatedProblem);
    }catch(err){
        // console.log(err);
        res.status(400).json({error : err});
    }
}

export const DeleteProblem = async(req,res) =>{
    try{
        // console.log('coming in function');
        // console.log(req.params.id);
        await Problem.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true,message:"Your Problem deleted Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal Server Error',error:err});
    }
}