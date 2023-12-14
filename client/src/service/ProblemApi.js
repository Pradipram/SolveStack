import axios from "axios";
import { url } from "../constants/data";

export const addProblem = async (problem) => {
  // console.log('problem',problem);
  try {
    const res = await axios.post(`${url}/addproblem`, problem, {
      withCredentials: true,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log("error in addProblem", err);
    return err;
  }
};

export const getAllProblems = async () => {
  try {
    const res = await axios.get(`${url}/getallproblems`, {
      withCredentials: true,
    });
    // console.log(res);
    return res;
  } catch (err) {
    // console.log("error in getAllProblem", err);
    return err;
  }
};

export const UpdateProblem = async (newProblem) =>{
  try{
    const res = await axios.put(`${url}/updateproblem`,newProblem);
    return res;
  }
  catch(err){
    return err;
  }
}

export const DeleteProblem = async (id) =>{
  try{
    // console.log("id is ",id);
    const res = await axios.delete(`${url}/deleteproblem/${id}`);
    return res;
  }
  catch(err){
    return err;
  }
}