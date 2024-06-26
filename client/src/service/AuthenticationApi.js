import axios from "axios";

export const authenticateLogin = async (user) => {
  try {
    const res = await axios.post('/login', user, {
      withCredentials: true,
      headers:{
        "Accept":"application/json"
      }
    });
    console.log("in api authenicateLogin res is ",res);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const authenticateSignup = async (user) => {
  try {
    console.log("comming in controller")
    // const res = await axios.post(`${url}/signup`, user, {
    const res = await axios.post('/signup', user, {

      withCredentials: true,
    });
    // console.log("in api.authenticateSignup res is ",res);
    return res;
  } catch (err) {
    // console.log('Error while calling Signup API: ', error);
    return err.response;
  }
};

export const getUser = async () => {
  try {
    // const res = await axios.get(`${url}/getuser`, { withCredentials: true });
    const res = await axios.get('/getuser', { withCredentials: true });

    return res;
  } catch (err) {
    return err.response;
  }
};

export const logoutUser = async () => {
  try {
    // const res = await axios.post(`${url}/logout`,{},{ withCredentials: true });
    const res = await axios.post('/logout',{},{ withCredentials: true });

    return res;
  } catch (err) {
    // return err.response;
  }
};
