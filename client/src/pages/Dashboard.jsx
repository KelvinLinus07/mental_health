import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [chat, setChat] = useState([]);
  const [streak, setStreak] = useState(0);

  // Load data
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedChat = JSON.parse(localStorage.getItem("chat")) || [];

    setTasks(savedTasks);
    setChat(savedChat);

    // 🔥 streak logic
    const lastDate = localStorage.getItem("lastActiveDate");
    const today = new Date().toDateString();

    if (lastDate === today) {
      setStreak(parseInt(localStorage.getItem("streak")) || 1);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        const newStreak = (parseInt(localStorage.getItem("streak")) || 1) + 1;
        localStorage.setItem("streak", newStreak);
        setStreak(newStreak);
      } else {
        localStorage.setItem("streak", 1);
        setStreak(1);
      }

      localStorage.setItem("lastActiveDate", today);
    }
  }, []);

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div style={container}>
      <h1 style={title}>Dashboard 🧠</h1>

      {/* 🔥 Top Cards */}
      <div style={grid}>
        <Card title="🔥 Streak" value={`${streak} days`} />
        <Card title="📚 Tasks Done" value={`${completed}/${tasks.length}`} />
        <Card title="💬 Chats" value={chat.length} />
      </div>

      {/* 🎯 Quick Actions */}
      <div style={card}>
        <h3>🚀 Quick Actions</h3>
        <div style={btnRow}>
          <button onClick={() => navigate("/mood")}>Mood Check</button>
          <button onClick={() => navigate("/study")}>Add Task</button>
          <button onClick={() => navigate("/wellness")}>Relax</button>
        </div>
      </div>

      {/* 💬 Last Mood */}
      <div style={card}>
        <h3>💬 Last Chat</h3>
        {chat.length > 0 ? (
          <p>{chat[chat.length - 1].text}</p>
        ) : (
          <p>No chats yet</p>
        )}
      </div>

      {/* 📅 Productivity */}
      <div style={card}>
        <h3>📅 Productivity</h3>
        <p>
          You completed <b>{completed}</b> tasks today.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

/* 🔹 Reusable Card */
function Card({ title, value }) {
  return (
    <div style={miniCard}>
      <h4>{title}</h4>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

/* 🎨 styles */
const container = {
  maxWidth: "1000px",
  margin: "20px auto",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginBottom: "20px",
};

const miniCard = {
  background: "#0f172a",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
};

const card = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};