import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import './problemset.css'
import { addProblem } from "../../service/ProblemApi";
import { useUserContext } from "../../context/userContext";

const probleminit = {
    id:'',
    name:'',
    rating:'',
    url:'',
    status:'Pending',
}

const errorinit = {
    id:'',
    name:'',
    rating:'',
    url:'',
}

const AddProblem = ()=>{
    // const [status,setStatus] = useState('Pending');
    const [problem,setProblem] = useState(probleminit);
    const {email} = useUserContext();
    const navigate = useNavigate();
    const [error,setError] = useState(errorinit);

    const handleSelectChange = (e) => {
        const newStatus = e.target.value;
        setProblem((prevProblem) => ({
          ...prevProblem,
          status: newStatus,
        }));
        // console.log('new problem status is ', newStatus);
      };
      

    const handleAddProblem = async()=>{
        // console.log('add problem is clicked',problem);
        setError(errorinit);
        let newProblem = {
            ...problem,
            email:email,
        }
        const res = await addProblem(newProblem);
        console.log('res in handleAddProblem ',res);
        if(res && res.status === 200){
            navigate('/problemset')
        }
        else if(res.code === "ERR_BAD_REQUEST"){
            setError(res.response.data);
        }
        else{
            alert('something went wrong');
        }
    }

    const handleInputChange = (e)=>{
        setError(errorinit);
        setProblem({...problem,[e.target.name]:e.target.value});
    }

    return (
        <div className="addProblem">
            <h1 style={{color:'blue'}}>Enter the details of Problem</h1>
            <div>
                <div className="addProblem-form-component">
                    <span>Problem Id</span>
                    <div>
                        <TextField variant="standard" name="id" onChange={handleInputChange} value={problem.id}/>
                        <div className="error">{error.id}</div>
                    </div>
                </div>
                {/* <div>{error.id}</div> */}
                <div className="addProblem-form-component">
                    <span>Problem Name</span>
                    <div>
                        <TextField variant="standard" name="name" onChange={handleInputChange} value={problem.name}/>
                        <div className="error">{error.name}</div>
                    </div>
                </div>
                <div className="addProblem-form-component">
                    <span>Rating</span>
                    <div>
                        <TextField variant="standard" name="rating" onChange={handleInputChange} value={problem.rating}/>
                        <div className="error">{error.rating}</div>
                    </div>
                </div>
                <div className="addProblem-form-component">
                    <span>Problem link</span>
                    <div>
                        <TextField variant="standard" name="url" onChange={handleInputChange} value={problem.url}/>
                        <div className="error">{error.url}</div>
                    </div>
                </div>
                <div className="addProblem-form-component">
                    <span>Status</span>
                    <FormControl size="small">
                        <Select value={problem.status} onChange={handleSelectChange}>
                        {/* <select value='Pending'> */}
                            <MenuItem value = 'Pending'>Pending</MenuItem>
                            <MenuItem value = 'Done'>Done</MenuItem>
                            <MenuItem value = 'Revisit'>Revisit</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Button variant="contained" onClick={handleAddProblem}>Add Problem</Button>
        </div>
    )
}

export default AddProblem;