// src/components/ClickButtons.jsx
import React from "react";
import { recordClick } from "../api";

const ClickButtons = ({ onUpdate }) => {
  const handleClick = async (team) => {
    try {
      await recordClick(team);
      onUpdate(); // refresh score
    } catch (err) {
      alert("Error sending click");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => handleClick("red")}>Red Team</button>
      <button onClick={() => handleClick("blue")} style={{ marginLeft: "10px" }}>Blue Team</button>
    </div>
  );
};

export default ClickButtons;
