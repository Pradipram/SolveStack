import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  id: {
    type: String,
    required: [true, "Please Enter problem id"],
  },
  name: {
    type: String,
    required: [true, "Please enter problem name"],
  },
  plateform: {
    type: String,
    required: [true, "Please Enter Plateform"],
  },
  rating: {
    type: Number,
  },
  level: {
    type: String,
  },
  url: {
    type: String,
    required: [true, "Please enter link of the problem"],
  },
  status: {
    type: String,
  },
});

const Problem = mongoose.model("problem", problemSchema);
export default Problem;
