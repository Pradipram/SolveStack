import { FormControl, MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

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
    })

    return (    
            <TableRow sx={{backgroundColor}}>
                <TableCell align="center">{date}</TableCell>    
                <TableCell align="center">
                    <a href={row.url} target="_blank">{row.id}</a>
                </TableCell>
                <TableCell align="center">
                    <a href={row.url} target="_blank">{row.name}</a>
                </TableCell>
                <TableCell align="center">{row.rating}</TableCell>
                <TableCell align="center">
                    <FormControl size="small">
                        <Select value={row.status}>
                            <MenuItem value = 'Pending'>Pending</MenuItem>
                            <MenuItem value = 'Done'>Done</MenuItem>
                            <MenuItem value = 'Revisit'>Revisit</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
    )
}

export default Problem;