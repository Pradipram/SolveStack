import { useState } from "react";
// import { authenticateLogin } from "../../service/AuthenticationApi";
import { authenticateLogin } from "../../service/AuthenticationApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import {toast} from 'react-toastify';

import Login2 from "react-signin-page";

import "../../assets/css/authentication.css";
import "./auth.css";

//images
import bg from "../../images/img1.jpg";
import Loader from "../loader/Loader";

import ReactGA from "react-ga4";

const loginInitials = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitials);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setEmail } = useUserContext();

  const [loginLoading, setLoginLoading] = useState(false);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginDetails = (login) => {
    if(login.email === ""){
      toast.warn("email can't be empty");
      return false;
    }
    else if(login.password === ""){
      toast.warn("password can't be empty");
      return false;
    }
    else if(!isValidEmail(login.email)){
      toast.warn("Please enter a valid email ID")
      return false;
    }
    return true;
  }

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(login) 
    const isValid = validateLoginDetails(login);
    if(!isValid){
      return ;
    }
    setLoginLoading(true);
    let response = await authenticateLogin(login);
    setLoginLoading(false);
    if (!response) {
      toast.error("something went wrong. Please try again");
    } else {
      const statusCode = response.status;
      if (statusCode === 400) {
        toast.error("Invalid username or Password");
      } else {
        navigate("/problemset");
        setUser(response.data.name);
        setEmail(response.data.email);
        toast.success("You have logged in successfully");
        // ReactGA.set({ user_id: response.data.email });
        let user_id = response.data.email.replace("@", "#");
        const ga4 = response.data.ga4;
        ReactGA.initialize([
          {
            trackingId: ga4,
            gaOptions: {
              // user_id: "test." + response.data.email,
              user_id: user_id,
            },
          },
        ]);
      }
    }
  };

  return (
    <>
      {/* {loginLoading && <Loader/>} */}
      {loginLoading ? (
        <Loader />
      ) : (
        <Login2
          useState={useState}
          bg={bg}
          onValueChange={onValueChange}
          handleSubmit={loginUser}
        />
      )}
    </>
  );
};

export default Login;
