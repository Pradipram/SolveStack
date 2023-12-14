import { Button, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./auth.css";
import { useState } from "react";
import { authenticateSignup } from "../../service/AuthenticationApi";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

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

const SignUp = () => {
  const navigate = useNavigate();

  const [seen, setseen] = useState(false);
  const [signup, setsignup] = useState(signupInitials);
  const [error, setError] = useState(errorInitials);
  const { setUser,setEmail } = useUserContext();

  const onValueChange = (e) => {
    setError(errorInitials);
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupuser = async () => {
    setError(errorInitials);
    if (signup.password !== signup.confirmPassword) {
      setError({ ...errorInitials, password: "Password do not match" });
    } else {
      const signupData = {
        username: signup.username,
        email: signup.email,
        password: signup.password,
      };
      try {
        let response = await authenticateSignup(signupData);
        if (!response) {
          alert("Something went wrong.Plese try again");
        }
        const statusCode = response.status;
        if (statusCode === 400) {
          let finalError = {
            username: response.data.errors.username,
            email: response.data.errors.email,
            password: response.data.errors.password,
          };
          setError(finalError);
        } else {
          // console.log(response);
          setUser(signup.username);
          setEmail(signup.email);
          navigate("/problemset");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="auth">
      <div className="signup">
        <h1>Sign Up</h1>
        <form>
          <div className="form-input">
            <AccountCircleIcon />
            <TextField
              placeholder="Enter your name"
              variant="standard"
              name="username"
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <Typography className="error">{error.username}</Typography>
          <div className="form-input">
            <EmailIcon />
            <TextField
              placeholder="Enter Your email"
              variant="standard"
              name="email"
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <Typography className="error">{error.email}</Typography>
          <div className="form-input">
            <KeyIcon />
            <TextField
              type={seen ? "text" : "password"}
              placeholder="Enter Your Password"
              variant="standard"
              name="password"
              onChange={(e) => onValueChange(e)}
            />
            <div
              onClick={() => {
                setseen(!seen);
              }}
            >
              {seen ? (
                <VisibilityOffIcon style={{ opacity: "0.4" }} />
              ) : (
                <VisibilityIcon style={{ opacity: "0.4" }} />
              )}
            </div>
          </div>
          <Typography className="error">{error.password}</Typography>
          <div className="form-input">
            <KeyIcon />
            <TextField
              placeholder="confirm Password"
              variant="standard"
              name="confirmPassword"
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <Typography className="error">{error.password}</Typography>
          <Button
            style={{ margin: 10, width: "40%" }}
            variant="contained"
            onClick={signupuser}
          >
            SignUp
          </Button>

          <Typography>Or</Typography>
          <Button
            href="/login"
            style={{ backgroundColor: "white", color: "blue", width: "80%" }}
            variant="contained"
          >
            Have Account?Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
