import { Button, Avatar } from "@mui/material";

import "../../App.css";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";
import { getUser } from "../../service/AuthenticationApi";
import UserProfileDrawer from "../authentication/profile";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

import ReactGA from "react-ga4"

const Navbar = () => {
  // const [login,setLogin] = useState("");
  // const user = "Pradip Ram";
  const { user, setUser } = useUserContext();
  // const [email,setEmail] = useState("");
  const { email, setEmail } = useUserContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()}`,
    };
  }

  useEffect(() => {
    const userdetail = async () => {
      const response = await getUser();
      // console.log(response);
      if (response && response.status === 200) {
        setUser(response.data.username);
        setEmail(response.data.email);
        const ga4 = response.data.ga4;
        let user_id = response.data.email.replace("@","#");
        ReactGA.initialize([
          {
            trackingId: ga4,
            gaOptions: {
              // user_id: "test."+ signup.email,
              user_id : user_id
            },
          },
        ]);
      } else {
        setUser("");
        setEmail("");
      }
    };
    userdetail();
  }, [setUser,setEmail]);

  const handleAvatarClick = () => {
    // console.log("avatar is clicked")
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="Navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="logo">
          <img src={logo} alt="not found" />
          <span style={{ margin: "10px", fontSize: "1.2rem" }}>SolveStack</span>
        </div>
      </Link>
      <div>
        {user ? (
          <div>
            <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
              <Avatar {...stringAvatar(user)} />
            </div>
            <UserProfileDrawer
              open={drawerOpen}
              onClose={handleCloseDrawer}
              stringAvatar={stringAvatar}
              user={user}
              email={email}
              setLogin={setUser}
            />
          </div>
        ) : (
          <div>
            <Button
              href="/login"
              style={{ margin: "10px" }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              href="/signup"
              style={{ margin: "10px" }}
              variant="contained"
              color="secondary"
            >
              SignUp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
