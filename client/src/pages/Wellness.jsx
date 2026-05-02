import { useState, useEffect } from "react";

function Wellness() {
  const [tip, setTip] = useState("");
  const [habits, setHabits] = useState({
    water: false,
    exercise: false,
    meditation: false,
  });

  const tips = [
    "Take a 5-minute break and breathe deeply 🌿",
    "Drink water and stay hydrated 💧",
    "Go for a short walk 🚶",
    "Talk to a friend 🤝",
    "Avoid overthinking — focus on now 🧠",
  ];

  // Load habits
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));

    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  // Save habits
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (key) => {
    setHabits({ ...habits, [key]: !habits[key] });
  };

  return (
    <div style={container}>
      <h1 style={title}>Wellness 🌿</h1>

      {/* Daily Tip */}
      <div style={card}>
        <h3>💡 Daily Tip</h3>
        <p>{tip}</p>
      </div>

      {/* Habits */}
      <div style={card}>
        <h3>✅ Daily Habits</h3>

        {Object.keys(habits).map((h) => (
          <div key={h} style={habitRow}>
            <span>{h.toUpperCase()}</span>
            <button onClick={() => toggleHabit(h)}>
              {habits[h] ? "Done ✅" : "Mark"}
            </button>
          </div>
        ))}
      </div>

      {/* Breathing */}
      <div style={card}>
        <h3>🧘 Breathing Exercise</h3>
        <p>Inhale 4 sec → Hold 4 sec → Exhale 4 sec</p>
      </div>
    </div>
  );
}

export default Wellness;

/* 🎨 styles */
const container = {
  maxWidth: "900px",
  margin: "20px auto",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const card = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
};

const habitRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};