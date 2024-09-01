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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook

import Problem from "./problem";
import "./problemset.css";
import { DeleteProblem, getAllProblems } from "../../service/ProblemApi";
import EmptyProblem from "../EmptyProblem/EmptyProblem";

const ProblemSet = ({ setLoading }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rating");
  const [rows, setRow] = useState([]);
  const location = useLocation(); // Get the current URL

  useEffect(() => {
    const getRow = async () => {
      const res = await getAllProblems();
      if (res && res.status === 200) {
        let filteredProblems = res.data;
        if (location.pathname === "/practice") {
          const now = new Date();
          filteredProblems = res.data.filter((row) => {
            const updated_at = new Date(row.updated_at);
            if(isNaN(updated_at)){
              return true;
            }
            const diffInMinutes = (now - updated_at) / 1000 / 60 / 60 / 24 /30; // Diffirence in months
            // const diffInMinutes = now-updated_at;
            return diffInMinutes >= 2;
          });
        }

        setRow(filteredProblems);
      }
    };

    setLoading(true);
    getRow();
    setLoading(false);
  }, [location.pathname, setLoading]);

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
    setLoading(true);
    const res = await DeleteProblem(id);
    if (!res.status) {
      toast.error("Internal server error. Please Try after some time");
    } else if (res.status === 200) {
      toast.success(res.data.message);
      const updatedRows = rows.filter((row) => row._id !== id);
      setRow(updatedRows);
    } else {
      toast.error("Internal Server Error");
    }
    setLoading(false);
  };

  return (
    <>
      {rows && rows.length === 0 ? (
        <EmptyProblem />
      ) : (
        <>
          <div className="problemset">
            <h2 style={{ paddingTop: "20px",color: "white" }}>Your Learning Libraries </h2>
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
                        Created_at
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ width: "15%" }} align="center">
                      <TableSortLabel
                        active={orderBy === "date"}
                        direction={order}
                        onClick={() => handleRequestSort("date")}
                      >
                        Updated_at
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
                    <TableCell style={{ width: "20%" }} align="center">
                      Platform
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
                    <TableCell>Action</TableCell>
                  </TableHead>
                  <TableBody>
                    {sortedRows.map((row) => (
                      <Problem
                        row={row}
                        key={row._id}
                        handleDelete={handleDelete}
                        setLoading={setLoading}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProblemSet;
