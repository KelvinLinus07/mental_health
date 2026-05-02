import { useEffect, useState } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fakeData = [
      { name: "Rahul", score: 120 },
      { name: "Ananya", score: 110 },
      { name: "Rohit", score: 95 },
      { name: "Sneha", score: 80 },
      { name: "You", score: Math.floor(Math.random() * 100) + 50 },
    ];

    const sorted = fakeData.sort((a, b) => b.score - a.score);
    setPlayers(sorted);
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>Leaderboard 🏆</h1>

      {players.map((p, i) => (
        <div
          key={i}
          style={{
            ...card,
            background: p.name === "You" ? "#2563eb" : "#0f172a",
          }}
        >
          <span>
            #{i + 1} — {p.name}
          </span>
          <span>{p.score} pts</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;

/* 🎨 styles */
const container = {
  maxWidth: "700px",
  margin: "20px auto",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "10px",
};