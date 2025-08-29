// src/components/ScoreCard.jsx
import React from "react";

const ScoreCard = ({ score }) => {
  if (!score) return null;

  return (
    <div style={{ border: "1px solid black", padding: "10px", width: "200px" }}>
      <p>Red: {score.red}</p>
      <p>Blue: {score.blue}</p>
      <p>Total: {score.total}</p>
    </div>
  );
};

export default ScoreCard;
