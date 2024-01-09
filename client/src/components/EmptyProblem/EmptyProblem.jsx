import React from 'react'
import { Button } from '@mui/material';

import img from "../../images/empty.png"
import "./EmptyProblem.css"

const EmptyProblem = () => {
  return (
    <div className="empty">
      <img src={img} alt="Empty Problem" height={300} width={500} />
      <h2>No problems found. Add some problems to your library!</h2>
      <Button variant="contained" style={{ marginTop: 20 }} href="/addproblem">
        ADD Problem
      </Button>
    </div>
  );
}

export default EmptyProblem