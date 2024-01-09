import { Button, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./auth.css";
import { useState } from "react";
import { authenticateLogin } from "../../service/AuthenticationApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const loginInitials = {
  email: "",
  password: "",
};

const Login = ({setLoading}) => {
  const [seen, setseen] = useState(false);
  const [login, setLogin] = useState(loginInitials);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser,setEmail } = useUserContext();

  const onValueChange = (e) => {
    // console.log("target is ",e.target.value);
    setError("");
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setError("");
    setLoading(true);
    let response = await authenticateLogin(login);
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
    setLoading(false);
  };

  return (
    <div className="auth">
      <div className="signup">
        <h1>Login</h1>
        <form>
          <div className="form-input">
            <EmailIcon />
            <TextField
              placeholder="Enter Your email"
              variant="standard"
              name="email"
              onChange={(e) => onValueChange(e)}
            />
          </div>
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
          <Typography className="error">{error}</Typography>
          <Button
            style={{ margin: 10, width: "40%" }}
            variant="contained"
            onClick={loginUser}
          >
            Login
          </Button>

          <Typography>Or</Typography>
          <Button
            href="/signup"
            style={{ backgroundColor: "white", color: "blue", width: "80%" }}
            variant="contained"
          >
            Don't have Account?SignUp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
