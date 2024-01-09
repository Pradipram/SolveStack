import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Navbar from "./components/navbar/navbar";
import ProblemSet from "./components/problems/problemset";
import AddProblem from "./components/problems/addProblem";
import { useUserContext } from "./context/userContext";
import Loader from "./components/loader/Loader";

const ProtectedRoute = ({ user, children }) => {
  // const { user } = useUserContext()
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    // Check if the user context has been updated
    if (user !== null) {
      setIsUserLoaded(true);
    }
    console.log("currentuser ", user);
  }, [user]);

  if (!isUserLoaded) {
    // You might want to show a loading spinner or something here
    return null;
  }

  return user ? <>{children}</> : <Navigate replace to={"/login"} />;
};

const LoginProtectedRoute = ({ user, children }) => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    if (user !== null) {
      setIsUserLoaded(true);
    }
  }, [user]);
  if (!isUserLoaded) {
    //show spinner or loading
    return null;
  }
  return user ? <Navigate replace to={"/"} /> : <>{children}</>;
};

function App() {
  const { user } = useUserContext();
  // const [user,setUser] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <BrowserRouter>
        {/* <h1>I am getting this {user}</h1> */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login/>} /> */}

              <Route
                path="/login"
                element={
                  <LoginProtectedRoute user={user}>
                    <Login setLoading={setLoading} />
                  </LoginProtectedRoute>
                }
              />

              {/* <Route path="/signup" element={<SignUp/>} /> */}
              <Route
                path="/signup"
                element={
                  <LoginProtectedRoute user={user}>
                    <SignUp setLoading={setLoading} />
                  </LoginProtectedRoute>
                }
              />

              <Route
                path="/problemset"
                element={
                  <ProtectedRoute user={user}>
                    <ProblemSet setLoading={setLoading} />
                    {/* <Route path="/problemset" element={<ProblemSet/>}/> */}
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/addproblem" element={<AddProblem />} /> */}
              <Route
                path="/addproblem"
                element={
                  <ProtectedRoute user={user}>
                    <AddProblem setLoading={setLoading} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        )}
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
