import { Typography } from "@mui/material";

import { useState } from "react";
// import { authenticateLogin } from "../../service/AuthenticationApi";
import { authenticateLogin } from "../../service/AuthenticationApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
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
  const [seen, setseen] = useState(false);
  const [login, setLogin] = useState(loginInitials);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setEmail } = useUserContext();

  const [loginLoading, setLoginLoading] = useState(false);

  const onValueChange = (e) => {
    // console.log("target is ",e.target.value);
    setError("");
    setLogin({ ...login, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    // console.log("login", login, 40);
    // setLoading(true);
    setLoginLoading(true);
    let response = await authenticateLogin(login);
    setLoginLoading(false);
    // setLoading(false);
    // console.log("Login.js,39",response);
    if (!response) {
      alert("something went wrong.Please try again");
    } else {
      const statusCode = response.status;
      if (statusCode === 400) {
        setError("Invalid email or Password");
      } else {
        setError("");
        console.log(response);
        navigate("/problemset");
        setUser(response.data.name);
        setEmail(response.data.email);
        // ReactGA.set({ user_id: response.data.email });
        let user_id = response.data.email.replace("@","#");

        ReactGA.initialize([
          {
            trackingId: "G-D6FF9EF2PV",
            gaOptions: {
              // user_id: "test." + response.data.email,
              user_id: user_id
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
        <div className="login">
          <img src={bg} alt="background" className="login__bg" />

          <form className="login__form">
            <h1 className="login__title">Login</h1>

            <div className="login__inputs">
              <div className="login__box">
                <input
                  type="email"
                  placeholder="Email ID"
                  required
                  name="email"
                  className="login__input"
                  onChange={(e) => onValueChange(e)}
                />
                <i className="ri-mail-fill"></i>
              </div>

              <div className="login__box">
                <input
                  type={seen ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  className="login__input"
                  onChange={(e) => onValueChange(e)}
                />
                <i className="ri-lock-2-fill"></i>
              </div>
            </div>
            <Typography className="error">{error}</Typography>

            <div className="login__check">
              <div className="login__check-box">
                <input
                  type="checkbox"
                  className="login__check-input"
                  id="user-check"
                  onClick={() => {
                    setseen(!seen);
                  }}
                />
                <label className="login__check-label">Show Password</label>
              </div>

              <a href="https://github.com/Pradipram" className="login__forgot">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="login__button"
              onClick={(e) => loginUser(e)}
            >
              Login
            </button>

            <div className="login__register">
              Don't have an account? <a href="/signup">Register</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
