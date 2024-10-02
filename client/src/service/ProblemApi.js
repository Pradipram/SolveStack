import axios from "axios";

// export const addProblem = async (problem) => {
//   // console.log('problem',problem);
//   try {
//     const res = await axios.post(`/addproblem`, problem, {
//       withCredentials: true,
//     });
//     // console.log(res);
//     return res;
//   } catch (err) {
//     // console.log("error in addProblem", err);
//     // return err;
//     if(err.response.status === 409){
//       toast.warning("Problem already saved");
//     }
//   }
// };

export const getAllProblems = async () => {
  try {
    const res = await axios.get(`/getallproblems`, {
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
    const res = await axios.put(`/updateproblem`,newProblem);
    return res;
  }
  catch(err){
    return err;
  }
}

export const DeleteProblem = async (id) =>{
  try{
    // console.log("id is ",id);
    const res = await axios.delete(`/deleteproblem/${id}`);
    return res;
  }
  catch(err){
    return err;
  }
}