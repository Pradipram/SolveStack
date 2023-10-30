import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true,"Please enter username"]
    },
    email:{
        type : String,
        required : [true,"Please enter username"],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail,"Please enter an valid email"]
    },
    password : {
        type : String,
        required :[true,"Please enter password"]
    }
});

userSchema.pre("save",async function (next) {
    //   console.log("user is going to be created and saved ", this);
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password,salt);
      next();
});

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
      const auth = await bcrypt.compare(password,user.password);
      if(auth){
        return user;
      }
      throw Error("Invalid email or password");
    }
    throw Error("Invalid email or password");
  }

const User = mongoose.model("user",userSchema);
export default User;