import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Navbar from "./components/navbar/navbar";
import ProblemSet from "./components/problems/problemset";
import AddProblem from "./components/problems/addProblem";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/problemset" element={<ProblemSet/>}/>
        <Route path="/addproblem" element={<AddProblem/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
