import { useState, useEffect } from "react";

function Study() {
  /* ================= STATE ================= */
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);

  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studyTasks"));
    if (saved) setTasks(saved);
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

  /* ================= TASK FUNCTIONS ================= */
  const addTask = () => {
    if (!task || !subject) return;

    setTasks([
      ...tasks,
      {
        text: task,
        subject,
        priority,
        completed: false,
      },
    ]);

    setTask("");
    setSubject("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? (completedCount / tasks.length) * 100
    : 0;

  /* ================= UI ================= */
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title gradient-text">
        Study Hub 📚
      </h1>

      {/* ================= TIMER ================= */}
      <div className="card glass fade-in">
        <h3 className="section-title">⏱ Focus Timer</h3>

        <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>
          {formatTime()}
        </h2>

        <button
          className="modern-btn glow"
          onClick={() => setRunning(!running)}
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>

      {/* ================= INPUT ================= */}
      <div className="card glass fade-in">
        <h3 className="section-title">➕ Add Study Task</h3>

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
      <div className="card glass fade-in">
        <h3 className="section-title">📊 Progress</h3>

        <p>{completedCount} / {tasks.length} completed</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ================= TASK LIST ================= */}
      <div className="card glass fade-in">
        <h3 className="section-title">📝 Tasks</h3>

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