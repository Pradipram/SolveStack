import { Typography } from "@mui/material";

import "./auth.css";
import { useState } from "react";
// import { authenticateLogin } from "../../service/AuthenticationApi";
import { authenticateLogin } from "../../service/AuthenticationApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "../../assets/css/authentication.css";

//images
import bg from "../../images/img1.jpg";

const loginInitials = {
  email: "",
  password: "",
};

const Login = ({ setLoading }) => {
  const [seen, setseen] = useState(false);
  const [login, setLogin] = useState(loginInitials);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setEmail } = useUserContext();

  const onValueChange = (e) => {
    // console.log("target is ",e.target.value);
    setError("");
    setLogin({ ...login, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    // setLoading(true);
    console.log("login", login, 40);
    let response = await authenticateLogin(login);
    console.log("Login.js,39",response);
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
      }
    }
    // setLoading(false);
  };

  return (
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

        <button type="submit" className="login__button" onClick={(e) => loginUser(e)}>
          Login
        </button>

        <div className="login__register">
          Don't have an account? <a href="/signup">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
