import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";

import Problem from "./problem";
import "./problemset.css";
// import { rows } from "./handleProblem";
import { useEffect, useState } from "react";
import { getAllProblems } from "../../service/ProblemApi";
import {useUserContext} from '../../context/userContext';

const ProblemSet = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rating");
  const [rows,setRow] = useState([]);

  useEffect(()=>{
    const getRow = async()=>{
      const res = await getAllProblems();
      // console.log(res);
      if(res && res.status === 200){
        setRow(res.data);
      }
    }
    getRow();
  },[])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }; 

  const sortedRows =  
    order === "desc"
      ? rows.slice().sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
      : rows.slice().sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

  return (
    <div className="problemset">
      <h2 style={{ paddingTop: "20px" }}>Your Learning Libararies </h2>
      <div className="table">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#cccdcf" }}>
              <TableCell style={{ width: "15%" }} align="center">
                <TableSortLabel active = {orderBy === 'date'} direction={order} onClick={()=>handleRequestSort('date')}>
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
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <Problem row={row} key={row.date} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProblemSet;
