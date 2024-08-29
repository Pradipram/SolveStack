import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

import "./problemset.css";
import { UpdateProblem } from "../../service/ProblemApi";

const Problem = ({ row, handleDelete, setLoading }) => {
  const [createdDate,setCreatedDate] = useState('');
  const [updatedDate,setUpdatedDate] = useState('');
  const [status, setStatus] = useState("Done");
  let backgroundColor = "";
  if (status === "Pending") {
    backgroundColor = "#f59d9d";
  } else if (status === "Done") {
    backgroundColor = "green";
  } else {
    backgroundColor = "yellow";
  }

  useEffect(() => {
    const created_at_string = row.created_at;
    const created_at = new Date(created_at_string);
    const options = { year: "numeric", month: "short", day: "numeric",hour: "numeric", minute: "numeric" };
    const formattedDate = created_at.toLocaleDateString(undefined, options);
    // console.log(formattedDate);
    setCreatedDate(formattedDate)
    // setCreatedDate(created_at)
  }, [row.created_at]);

  useEffect(() => {
    const updated_at_string = row.updated_at;
    const updated_at = new Date(updated_at_string);
    const options = { year: "numeric", month: "short", day: "numeric",hour: "numeric", minute: "numeric" };
    const formattedDate = updated_at.toLocaleDateString(undefined, options);
    // console.log(formattedDate);
    setUpdatedDate(formattedDate)
  }, [row.updated_at]);

  useEffect(() => {
    setStatus(row.status);
  }, [row.status]);

  const UpdateProblemStatus = async (e) => {
    setLoading(true);
    const updatedProblem = {
      _id: row._id,
      status: e.target.value,
    };
    const res = await UpdateProblem(updatedProblem);
    // console.log("res we are getting from UpdateProblemStatus is ",res);
    setStatus(res.data.status);
    setLoading(false);
  };

  return (
    <TableRow sx={{ backgroundColor }}>
      <TableCell align="center">{createdDate}</TableCell>
      <TableCell align="center">{updatedDate}</TableCell>
      <TableCell align="center">
        <a href={row.url} target="_blank" rel="noreferrer">
          {row.id}
        </a>
      </TableCell>
      <TableCell align="center">
        <a href={row.url} target="_blank" rel="noreferrer">
          {row.name}
        </a>
      </TableCell>
      <TableCell align="center">{row.plateform}</TableCell>
      <TableCell align="center">
        {row.rating ? row.rating : row.level}
      </TableCell>
      <TableCell align="center">
        <FormControl size="small">
          <Select value={status} onChange={UpdateProblemStatus}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Revisit">Revisit</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <Button onClick={() => handleDelete(row._id)}>
          <DeleteIcon sx={{ color: "black" }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Problem;
