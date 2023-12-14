import { Button, FormControl, MenuItem, Select, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

import "./problemset.css"
import { UpdateProblem } from "../../service/ProblemApi";

const Problem = ({row}) =>{
    const [date,setDate] = useState('');
    let backgroundColor = "";
    if(row.status === 'Pending'){
        backgroundColor = '#f59d9d'
    }
    else if(row.status === 'Done'){
        backgroundColor = 'green'
    }
    else{
        backgroundColor = 'yellow'
    }

    useEffect(()=>{
        const dateString = row.date;
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        // console.log(formattedDate);
        setDate(formattedDate)
    },[row.date])

    const UpdateProblemStatus = (e) =>{
        const updatedProblem = {
            _id : row._id,
            status : e.target.value
        }
        const res = UpdateProblem(updatedProblem);
        console.log("res we are getting from UpdateProblemStatus is ",res);
    }

    return (    
            <TableRow sx={{backgroundColor}}>
                <TableCell align="center">{date}</TableCell>    
                <TableCell align="center">
                    <a href={row.url} target="_blank" rel="noreferrer">{row.id}</a>
                </TableCell>
                <TableCell align="center">
                    <a href={row.url} target="_blank" rel="noreferrer">{row.name}</a>
                </TableCell>
                <TableCell align="center">{row.rating}</TableCell>
                <TableCell align="center">
                    <FormControl size="small">
                        <Select value={row.status} onChange={UpdateProblemStatus}>
                            <MenuItem value = 'Pending'>Pending</MenuItem>
                            <MenuItem value = 'Done'>Done</MenuItem>
                            <MenuItem value = 'Revisit'>Revisit</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <Button>
                        <DeleteIcon sx={{color:"black"}}/>
                    </Button>
                </TableCell>
            </TableRow>
    )
}

export default Problem;