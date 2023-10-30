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
