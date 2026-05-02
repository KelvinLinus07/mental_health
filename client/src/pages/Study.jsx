import { useState, useEffect } from "react";

function Study() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 Load tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // 🔹 Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", color: "white" }}>
      <h1>Study Hub 📚</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a study task..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
          }}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((t, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1e293b",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              textDecoration: t.completed ? "line-through" : "none",
            }}
          >
            {t.text}
          </span>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => toggleTask(i)}>
              {t.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Study;