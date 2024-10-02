import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./problemset.css";
import { useUserContext } from "../../context/userContext";

const probleminit = {
  id: "",
  name: "",
  plateform: "Select",
  rating: "",
  level: "Select",
  url: "",
  status: "Pending",
};

const errorinit = {
  id: "",
  name: "",
  plateform: "",
  rating: "",
  level: "",
  url: "",
};

const validateProblem = (problem) => {
  const errors = { ...errorinit };
  const fields = ["id", "name", "plateform", "url"];

  fields.forEach((element) => {
    if (!problem[element].trim()) {
      errors[element] = `Please enter ${element}`;
    }
  });

  if (problem.plateform === "Select") {
    errors["plateform"] = "Please choose a valid plateform";
  } else if (problem.plateform === "codeforces") {
    const rating = +problem.rating;
    if (isNaN(rating)) {
      errors["rating"] = "Rating must be an integer";
    }
  } else if (problem.level === "Select") {
    errors["level"] = "Level can't be 'Select'";
  }

  return errors;
};

const isError = (errors) => {
  if (
    errors.id ||
    errors.name ||
    errors.rating ||
    errors.url ||
    errors.plateform ||
    errors.level
  ) {
    return true;
  }
  return false;
};

const AddProblem = ({ setLoading }) => {
  const [problem, setProblem] = useState(probleminit);
  const { email } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState(errorinit);

  const handleSelectChange = (e) => {
    setError(errorinit);
    const key = e.target.name;
    const value = e.target.value;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [key]: value,
    }));
  };

  const handleAddProblem = async () => {
    try{
      const err = validateProblem(problem);
      if (isError(err)) {
        setError(err);
      } else {
        let newProblem = {
          ...problem,
          email: email,
        };
        setLoading(true);
        // const res = await addProblem(newProblem);
        const res = await axios.post('/addproblem',newProblem,{
          withCredentials: true
        })
        // console.log('res in handleAddProblem ',res);
        setLoading(false);
        if (res && res.status === 200) {
          toast("Problem added successfully");
          navigate("/problemset");
        }else {
          toast("Something went wrong");
        }
      }
    }
    catch(err){
      setLoading(false);
      if(err.response.status === 409){
        toast.error("Problem already saved");
      }
      else{
        toast.error("Internal server error! Report this problme");
      }
      // console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setError(errorinit);
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  return (
    <div className="addProblem">
      <h1 style={{ color: "blue" }}>Enter the details of Problem</h1>
      <div>
        <div className="addProblem-form-component">
          <span>Problem Id</span>
          <div>
            <TextField
              variant="standard"
              name="id"
              onChange={handleInputChange}
              value={problem.id}
            />
            <div className="error">{error.id}</div>
          </div>
        </div>
        {/* <div>{error.id}</div> */}
        <div className="addProblem-form-component">
          <span>Problem Name</span>
          <div>
            <TextField
              variant="standard"
              name="name"
              onChange={handleInputChange}
              value={problem.name}
            />
            <div className="error">{error.name}</div>
          </div>
        </div>
        <div className="addProblem-form-component">
          <span>Plateform</span>
          <FormControl size="small">
            <Select
              value={problem.plateform}
              onChange={handleSelectChange}
              name="plateform"
            >
              <MenuItem value="Select">Select</MenuItem>
              <MenuItem value="codeforces">codeforces</MenuItem>
              <MenuItem value="Leetcode">Leetcode</MenuItem>
              <MenuItem value="GeekForGeeks">GeekForGeeks</MenuItem>
              <MenuItem value="CodeStudio">CodeStudio</MenuItem>
              <MenuItem value="TakeUForward">TakeUForward</MenuItem>
            </Select>
            <div className="error">{error.plateform}</div>
          </FormControl>
        </div>
        <div className="addProblem-form-component">
          {problem.plateform === "codeforces" ? (
            <>
              <span>Rating</span>
              <div>
                <TextField
                  variant="standard"
                  name="rating"
                  onChange={handleInputChange}
                  value={problem.rating}
                />
                <div className="error">{error.rating}</div>
              </div>
            </>
          ) : (
            <>
              <span>Level</span>
              <FormControl size="small">
                <Select
                  value={problem.level}
                  onChange={handleSelectChange}
                  name="level"
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
                <div className="error">{error.level}</div>
              </FormControl>
            </>
          )}
        </div>
        <div className="addProblem-form-component">
          <span>Problem link</span>
          <div>
            <TextField
              variant="standard"
              name="url"
              onChange={handleInputChange}
              value={problem.url}
            />
            <div className="error">{error.url}</div>
          </div>
        </div>
        <div className="addProblem-form-component">
          <span>Status</span>
          <FormControl size="small">
            <Select
              value={problem.status}
              onChange={handleSelectChange}
              name="status"
            >
              {/* <select value='Pending'> */}
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="Revisit">Revisit</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button variant="contained" onClick={handleAddProblem}>
        Add Problem
      </Button>
    </div>
  );
};

export default AddProblem;
