import jwt from "jsonwebtoken";

export const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    // console.log("token : ",token);
    const secreteKey = process.env.SECRET_KEY;
    if(token){
        jwt.verify(token,secreteKey,(err,decodedToken)=>{
            if(err){
                console.log("Error in require authentication middleware",err);
                res.status(401).json({message:"not authenicated"});
                // res.redirect("/");
            }
            else{
                req.userId = decodedToken.id;
                next();
            }
        })
    }
    else{
        res.status(401).json({message:"not authenticated"});    
    }
};