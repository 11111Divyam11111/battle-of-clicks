// src/App.jsx
import React, { useEffect, useState } from "react";
import ClickButtons from "./components/ClickButtons";
import ScoreCard from "./components/ScoreCard";
import { getScore } from "./api";

function App() {
  const [score, setScore] = useState({ red: 0, blue: 0, total: 0 });

  const fetchScore = async () => {
    try {
      const data = await getScore();
      setScore(data);
    } catch (err) {
      console.error("Failed to fetch score");
    }
  };

  useEffect(() => {
    fetchScore();

    // Optional: polling every 2 seconds
    const interval = setInterval(fetchScore, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Battle of Clicks</h1>
      <ClickButtons onUpdate={fetchScore} />
      <ScoreCard score={score} />
    </div>
  );
}

export default App;
