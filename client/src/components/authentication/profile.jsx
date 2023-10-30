//Libraries
import React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button, Checkbox } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

//Libraries
import "./auth.css";
import { logoutUser } from "../../service/AuthenticationApi";

function UserProfileDrawer({
  open,
  onClose,
  stringAvatar,
  user,
  email,
  setLogin,
}) {
  const navigate = useNavigate();

  const inputString = user; // Replace this with your string
  const words = inputString.split(" ");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const handleLogout = async () => {
    const res = await logoutUser();
    // console.log(res);
    if (res) {
      onClose(false);
      setLogin("");
      navigate("/");
    } else {
      alert("Something unepected happened.Please try again");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="drawer">
        <div className="profile">
          <Avatar {...stringAvatar(user)} />
          <h1>{formattedString}</h1>
          <h4 style={{ color: "#8c95de" }}>{email}</h4>
        </div>
        {/* <button className='profile-button'>Logout</button> */}
        <Button
          variant="contained"
          style={{ marginTop: 20 }}
          href="/addproblem"
        >
          ADD Problem
        </Button>
        <div className="settings">
          <div className="setting-heading">
            <ArrowRightAltIcon />
            <h3>Settings</h3>
          </div>
          <hr />
          <div>
            <Checkbox />
            <span>Hide Solved Problems</span>
          </div>
          <div>
            <Checkbox />
            <span>Hide Unsolved Problems</span>
          </div>
          <div>
            <Checkbox />
            <span>Hide Revisit problems</span>
          </div>
        </div>
        <Button
          variant="outlined"
          endIcon={<LogoutIcon />}
          style={{ marginTop: 20 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Drawer>
  );
}

export default UserProfileDrawer;
