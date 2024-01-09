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

  const signupuser = async () => {
    setLoading(true);
    // if()
    const err = validateSignupData(signup);
    if (isErrorPresent(err)) {
      setError(err);
      setLoading(false);
    } else {
      try {
        let response = await authenticateSignup(signup);
        if (!response || response.status === 400) {
          alert("Something went wrong. Please try again");
          setLoading(false);
        } else {
          setUser(signup.username);
          setEmail(signup.email);
          navigate("/problemset");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    setLoading(false);
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
