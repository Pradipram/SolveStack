import { Typography } from "@mui/material";
import { useState } from "react";
import { authenticateSignup } from "../../service/AuthenticationApi";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import ReactGA from "react-ga4";

// images
import bg from "../../images/img1.jpg";

const signupInitials = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorInitials = {
  username: "",
  email: "",
  password: "",
};

const validateSignupData = (signupData) => {
  const errors = { ...errorInitials };

  // Define fields to validate
  const fieldsToValidate = ["username", "email", "password"];

  // Iterate over fields and check for empty values
  fieldsToValidate.forEach((field) => {
    if (!signupData[field].trim()) {
      errors[field] = `Please enter ${field}`;
    }
  });

  // Check if passwords match
  console.log(
    "SignUP.jsx, 41,password: ",
    signupData.password,
    " confirmPassword: ",
    signupData.confirmPassword
  );
  if (signupData.password !== signupData.confirmPassword) {
    errors.password = "Passwords do not match";
  }

  return errors;
};

const isErrorPresent = (errors) => {
  if (errors.username || errors.email || errors.password) return 1;
  return 0;
};

const SignUp = ({ setLoading }) => {
  const navigate = useNavigate();

  const [seen, setseen] = useState(false);
  const [signup, setsignup] = useState(signupInitials);
  const [error, setError] = useState(errorInitials);
  const { setUser, setEmail } = useUserContext();

  const onValueChange = (e) => {
    setError(errorInitials);
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupuser = async (e) => {
    // if()
    e.preventDefault();
    const err = validateSignupData(signup);
    if (isErrorPresent(err)) {
      setError(err);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        let response = await authenticateSignup(signup);
        setLoading(false);
        if (!response || response.status === 400) {
          alert("Something went wrong. Please try again");
        } else {
          // ReactGA.set({ user_id: signup.email });
          let user_id = signup.email.replace("@","#");
          ReactGA.initialize([
            {
              trackingId: "G-D6FF9EF2PV",
              gaOptions: {
                // user_id: "test."+ signup.email,
                user_id : user_id
              },
            },
          ]);
          setUser(signup.username);
          setEmail(signup.email);
          navigate("/problemset");
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    }
    // setLoading(false);
  };

  return (
    <div className="login">
      <img src={bg} alt="background" className="login__bg" />
      <form className="login__form">
        <h1 className="login__title">Sign Up</h1>
        <div className="login__inputs">
          <div className="login__box">
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="username"
              className="login__input"
              onChange={(e) => onValueChange(e)}
            />
            <i className="fa-solid fa-user" />
          </div>
          <Typography className="error">{error.username}</Typography>
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
          <Typography className="error">{error.email}</Typography>
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
          <Typography className="error">{error.password}</Typography>
          <div className="login__box">
            <input
              type="text"
              placeholder="Password"
              required
              name="confirmPassword"
              className="login__input"
              onChange={(e) => onValueChange(e)}
            />
            <i className="ri-lock-2-fill"></i>
          </div>
          <Typography className="error">{error.password}</Typography>
        </div>
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
        </div>
        <button
          type="submit"
          className="login__button"
          onClick={(e) => signupuser(e)}
        >
          SignUp
        </button>
        <div className="login__register">
          Already have an Account? <a href="/login">Sing In</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
