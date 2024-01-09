import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import { toast } from "react-toastify";

import Problem from "./problem";
import "./problemset.css";

import { useEffect, useState } from "react";
import { DeleteProblem, getAllProblems } from "../../service/ProblemApi";

const ProblemSet = ({ setLoading }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rating");
  const [rows, setRow] = useState([]);

  useEffect(() => {
    const getRow = async () => {
      // setLoading(true);
      const res = await getAllProblems();
      console.log(res);
      if (res && res.status === 200) {
        // console.log("problem details is ",res.data);
        setRow(res.data);
      }
      // setLoading(false);
    };
    setLoading(true);
    getRow();
    setLoading(false);
  }, [setLoading]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows =
    order === "desc"
      ? rows.slice().sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
      : rows.slice().sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

  const handleDelete = async (id) => {
    // console.log('delete button is clicked',id);
    setLoading(true);
    const res = await DeleteProblem(id);
    // console.log(res);
    if (!res.status) {
      // setLoading(false);
      toast.error("Internal server error. Please Try after some time");
    } else if (res.status === 200) {
      toast.success(res.data.message);
      const updatedRows = rows.filter((row) => row._id !== id);
      setRow(updatedRows);
      // setLoading(false);
    } else {
      toast.error("Internal Server Error");
      // setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="problemset">
      <h2 style={{ paddingTop: "20px" }}>Your Learning Libararies </h2>
      <div className="table">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#cccdcf" }}>
              <TableCell style={{ width: "15%" }} align="center">
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={order}
                  onClick={() => handleRequestSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: "5%" }} align="center">
                <TableSortLabel
                  active={orderBy === "problemId"}
                  direction={order}
                  onClick={() => handleRequestSort("problemId")}
                >
                  ProblemId
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: "65%" }} align="center">
                <TableSortLabel
                  active={orderBy === "problemName"}
                  direction={order}
                  onClick={() => handleRequestSort("problemName")}
                >
                  Problem Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: "5%" }} align="center">
                <TableSortLabel
                  active={orderBy === "rating"}
                  direction={order}
                  onClick={() => handleRequestSort("rating")}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: "20%" }} align="center">
                Status
              </TableCell>
              <TableCell>{/* Action */}</TableCell>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <Problem
                  row={row}
                  key={row.date}
                  handleDelete={handleDelete}
                  setLoading={setLoading}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProblemSet;
