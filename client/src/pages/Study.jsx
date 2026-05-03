import { useState, useEffect } from "react";
import { addPoints } from "../utils/points";

function Study() {
  /* ================= STATE ================= */
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);

  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studyTasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ================= TIMER ================= */
  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setRunning(false);
  };

  /* ================= TASK ================= */
  const addTask = () => {
    if (!task.trim() || !subject.trim()) return;

    const newTask = {
      text: task,
      subject,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setSubject("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];

    if (!updated[i].completed) {
      addPoints(10); // ⭐ Points
    }

    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  /* ================= PROGRESS ================= */
  const completed = tasks.filter((t) => t.completed).length;
  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  /* ================= UI ================= */
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title gradient-text">
        Study Hub 📚
      </h1>

      {/* ================= TIMER ================= */}
      <div className="card fade-in">
        <h3 className="section-title">⏱ Focus Timer</h3>

        <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>
          {formatTime()}
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="modern-btn glow"
            onClick={() => setRunning(!running)}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            className="modern-btn secondary"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ================= ADD TASK ================= */}
      <div className="card fade-in">
        <h3 className="section-title">➕ Add Task</h3>

        <div style={row}>
          <input
            placeholder="Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={input}
          />

          <input
            placeholder="Subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={input}
          />
        </div>

        <div style={row}>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={input}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="modern-btn" onClick={addTask}>
            Add
          </button>
        </div>
      </div>

      {/* ================= PROGRESS ================= */}
      <div className="card fade-in">
        <h3 className="section-title">📊 Progress</h3>

        <p>{completed} / {tasks.length} completed</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* ================= TASK LIST ================= */}
      <div className="card fade-in">
        <h3 className="section-title">📝 Tasks</h3>

        {tasks.length === 0 && (
          <p className="section-text">No tasks yet</p>
        )}

        {tasks.map((t, i) => (
          <div key={i} style={taskCard}>

            <div>
              <b>{t.text}</b>
              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {t.subject} • {t.priority}
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="modern-btn secondary"
                onClick={() => toggleTask(i)}
              >
                {t.completed ? "Undo" : "Done"}
              </button>

              <button
                className="modern-btn"
                onClick={() => deleteTask(i)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Study;

/* ================= STYLES ================= */

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const taskCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(30,41,59,0.6)",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
};