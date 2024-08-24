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
  const [date, setDate] = useState("");
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
    const dateString = row.date;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    // console.log(formattedDate);
    setDate(formattedDate);
  }, [row.date]);

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
      <TableCell align="center">{date}</TableCell>
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
