import { useState, useEffect } from "react";
import { addPoints } from "../utils/points";

function Wellness() {
  /* ================= STATE (FIXED LOAD) ================= */
  const [activeGuide, setActiveGuide] = useState(null);

  const [entry, setEntry] = useState("");

  const [journal, setJournal] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("journal")) || [];
    } catch {
      return [];
    }
  });

  const [habit, setHabit] = useState("");

  const [habits, setHabits] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("habits")) || [];
    } catch {
      return [];
    }
  });

  /* ================= SAVE (AUTO) ================= */
  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  /* ================= GUIDES ================= */
  const guides = {
    panic: {
      title: "😰 Panic Attack Help",
      steps: [
        "Sit down and focus on breathing",
        "Inhale for 4 seconds",
        "Hold for 4 seconds",
        "Exhale for 6 seconds",
        "Repeat slowly",
        "Tell yourself: This will pass",
      ],
    },
    low: {
      title: "😞 Feeling Low",
      steps: [
        "Drink water and rest",
        "Listen to calm music",
        "Talk to someone",
        "Write thoughts down",
        "Do one small task",
      ],
    },
    anxiety: {
      title: "😟 Anxiety Control",
      steps: [
        "Slow breathing (4-4-6)",
        "Ground yourself (5 things)",
        "Stretch body",
        "Walk for 5 minutes",
        "Remind: You are safe",
      ],
    },
  };

  /* ================= JOURNAL ================= */
  const addEntry = () => {
    if (!entry.trim()) return;

    setJournal((prev) => [
      {
        text: entry,
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setEntry("");
  };

  const deleteEntry = (i) => {
    setJournal((prev) => prev.filter((_, index) => index !== i));
  };

  /* ================= HABITS ================= */
  const addHabit = () => {
    if (!habit.trim()) return;

    setHabits((prev) => [
      ...prev,
      { text: habit, done: false },
    ]);

    setHabit("");
  };

  const toggleHabit = (i) => {
    setHabits((prev) =>
      prev.map((h, index) => {
        if (index !== i) return h;

        // add points ONLY when marking done
        if (!h.done) {
          addPoints(5);
        }

        return {
          ...h,
          done: !h.done,
        };
      })
    );
  };

  const deleteHabit = (i) => {
    setHabits((prev) => prev.filter((_, index) => index !== i));
  };

  /* ================= UI ================= */
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title gradient-text">
        Wellness 🌿
      </h1>

      {/* ===== MENTAL SUPPORT ===== */}
      <div className="card fade-in">
        <h3 className="section-title">🧠 Mental Support</h3>

        <div className="grid grid-3">
          <Guide title="🧘 Relax" onClick={() => setActiveGuide("relax")} />
          <Guide title="😰 Panic Attack" onClick={() => setActiveGuide("panic")} />
          <Guide title="😞 Feeling Low" onClick={() => setActiveGuide("low")} />
          <Guide title="😟 Anxiety" onClick={() => setActiveGuide("anxiety")} />
        </div>
      </div>

      {/* ===== HABITS ===== */}
      <div className="card fade-in">
        <h3 className="section-title">🔁 Habit Tracker</h3>

        <div style={row}>
          <input
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Add habit..."
            style={input}
          />
          <button className="modern-btn" onClick={addHabit}>
            Add
          </button>
        </div>

        {habits.map((h, i) => (
          <div key={i} className="habit-card">
            <span
              style={{
                textDecoration: h.done ? "line-through" : "none",
                opacity: h.done ? 0.6 : 1,
              }}
            >
              {h.text}
            </span>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="modern-btn secondary"
                onClick={() => toggleHabit(i)}
              >
                {h.done ? "Undo" : "Done"}
              </button>

              <button
                className="modern-btn"
                onClick={() => deleteHabit(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== JOURNAL ===== */}
      <div className="card fade-in">
        <h3 className="section-title">📝 Journal</h3>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts..."
          style={textarea}
        />

        <button className="modern-btn glow" onClick={addEntry}>
          Save Entry
        </button>
      </div>

      {/* ===== JOURNAL LIST ===== */}
      <div className="card fade-in">
        <h3 className="section-title">📖 Entries</h3>

        {journal.length === 0 && (
          <p className="section-text">No entries yet</p>
        )}

        {journal.map((j, i) => (
          <div key={i} style={entryCard}>
            <p>{j.text}</p>

            <div style={footer}>
              <span>{j.date}</span>

              <button
                className="modern-btn"
                onClick={() => deleteEntry(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {activeGuide && (
        <div className="modal">
          <div className="modal-box">

            <h2>
              {activeGuide === "relax"
                ? "🧘 Relax Guide"
                : guides[activeGuide].title}
            </h2>

            <ul>
              {(activeGuide === "relax"
                ? [
                    "Inhale 4 sec",
                    "Hold 4 sec",
                    "Exhale 4 sec",
                    "Repeat 5 times",
                  ]
                : guides[activeGuide].steps
              ).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            <button
              className="modern-btn glow"
              onClick={() => setActiveGuide(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Wellness;

/* ===== GUIDE CARD ===== */
function Guide({ title, onClick }) {
  return (
    <div className="guide-card" onClick={onClick}>
      {title}
    </div>
  );
}

/* ===== STYLES ===== */
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

const textarea = {
  width: "100%",
  height: "100px",
  borderRadius: "10px",
  padding: "10px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const entryCard = {
  background: "rgba(30,41,59,0.6)",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  opacity: 0.7,
};