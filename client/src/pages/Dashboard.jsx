import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setChat(JSON.parse(localStorage.getItem("chat")) || []);
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const lastChat =
    chat.length > 0 ? chat[chat.length - 1].text : "No chats yet";

  return (
    <div className="dashboard-container">

      {/* TITLE */}
      <h1 className="dashboard-title gradient-text">
        Student Wellness 🚀
      </h1>

      {/* STATS */}
      <div className="grid grid-4 stagger-container">
        <StatCard title="🔥 Streak" value="2 days" />
        <StatCard title="📚 Tasks" value={`${completed}/${total}`} />
        <StatCard title="💬 Chats" value={chat.length} />
        <StatCard title="⭐ Points" value={completed * 10} />
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
            🌿 Relax
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
          {percent === 100
            ? "🔥 You crushed today!"
            : percent > 50
            ? "💪 Keep pushing, you're doing great!"
            : "🚀 Start small, build momentum!"}
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