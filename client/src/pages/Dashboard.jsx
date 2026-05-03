import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [chat, setChat] = useState([]);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setChat(JSON.parse(localStorage.getItem("chat")) || []);
    setHabits(JSON.parse(localStorage.getItem("habits")) || []);
  }, []);

  /* ================= CALCULATIONS ================= */
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const completedHabits = habits.filter((h) => h.done).length;

  const percent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const lastChat =
    chat.length > 0 ? chat[chat.length - 1].text : "No chats yet";

  /* ================= FAKE POINT SYSTEM ================= */
  const points =
    completedTasks * 10 +
    completedHabits * 5 +
    chat.length * 2;

  /* ================= STREAK (FAKE BUT SMART) ================= */
  const streak =
    completedTasks > 0 || completedHabits > 0
      ? 2 + completedHabits
      : 0;

  return (
    <div className="dashboard-container">

      {/* TITLE */}
      <h1 className="dashboard-title gradient-text">
        Student Wellness 🚀
      </h1>

      {/* STATS */}
      <div className="grid grid-4 stagger-container">
        <StatCard title="🔥 Streak" value={`${streak} days`} />
        <StatCard title="📚 Tasks" value={`${completedTasks}/${totalTasks}`} />
        <StatCard title="💬 Chats" value={chat.length} />
        <StatCard title="⭐ Points" value={points} />
      </div>

      {/* PROGRESS */}
      <div className="card glass highlight">
        <h3 className="section-title">📊 Progress</h3>

        <div className="progress-text">
          {percent}% completed
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill glow"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="card glass">
        <h3 className="section-title">🚀 Quick Actions</h3>

        <div className="btn-row">
          <button
            className="modern-btn glow"
            onClick={() => navigate("/mood")}
          >
            💬 Mood Check
          </button>

          <button
            className="modern-btn"
            onClick={() => navigate("/study")}
          >
            📚 Add Task
          </button>

          <button
            className="modern-btn secondary"
            onClick={() => navigate("/wellness")}
          >
            🌿 Wellness
          </button>
        </div>
      </div>

      {/* LAST CHAT */}
      <div className="card glass">
        <h3 className="section-title">💬 Last Chat</h3>
        <p className="section-text">{lastChat}</p>
      </div>

      {/* INSIGHT */}
      <div className="card glass">
        <h3 className="section-title">🧠 Insight</h3>
        <p className="section-text">
          {points > 100
            ? "🔥 You're on fire!"
            : percent === 100
            ? "💯 Perfect day!"
            : percent > 50
            ? "💪 Keep going strong!"
            : "🚀 Start small today!"}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

/* COMPONENT */
function StatCard({ title, value }) {
  return (
    <div className="card glass stat-card">
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
}