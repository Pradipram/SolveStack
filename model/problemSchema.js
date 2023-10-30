import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    email : {
        type : String
    },
    date :{
        type : Date,
        default : Date.now()
    },
    id:{
        type:String,
        required : [true,"Please Enter problem id"]
    },
    name :{
        type:String,
        required:[true,"Please enter problem name"]
    },
    rating : {
        type : Number,
        required : [true,'Please enter the rating of problem']
    },
    url:{
        type:String,
        required:[true,'Please enter link of the problem']
    },
    status : {
        type : String,
    }
});

const Problem = mongoose.model('problem',problemSchema);
export default Problem;