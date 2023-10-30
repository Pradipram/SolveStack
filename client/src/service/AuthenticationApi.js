import axios from "axios";

import { url } from "../constants/data";

export const authenticateLogin = async (user) => {
  try {
    const res = await axios.post(`${url}/login`, user, {
      withCredentials: true,
    });
    // console.log("in api authenicateLogin res is ",res);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const authenticateSignup = async (user) => {
  try {
    const res = await axios.post(`${url}/signup`, user, {
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
    const res = await axios.get(`${url}/getuser`, { withCredentials: true });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${url}/logout`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (err) {
    // return err.response;
  }
};
