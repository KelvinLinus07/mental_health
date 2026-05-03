import { useState, useEffect } from "react";

function Wellness() {
  /* ================= STATE ================= */
  const [activeGuide, setActiveGuide] = useState(null);

  /* ================= GUIDES ================= */
  const guides = {
    panic: {
      title: "😰 Panic Attack Help",
      steps: [
        "Sit down and focus on your breathing",
        "Inhale slowly for 4 seconds",
        "Hold for 4 seconds",
        "Exhale slowly for 6 seconds",
        "Remind yourself: 'This will pass'",
        "Focus on 5 things you can see around you",
      ],
    },
    low: {
      title: "😞 Feeling Low",
      steps: [
        "Take a short break from everything",
        "Drink water or eat something light",
        "Listen to calming music",
        "Talk to a friend or someone you trust",
        "Write your thoughts in a journal",
        "Do one small productive task",
      ],
    },
    anxiety: {
      title: "😟 Anxiety Control",
      steps: [
        "Slow your breathing (4-4-6 method)",
        "Avoid overthinking future scenarios",
        "Ground yourself: name 3 things around you",
        "Stretch or walk for 5 minutes",
        "Remind yourself: 'I am safe right now'",
      ],
    },
  };

  /* ================= JOURNAL ================= */
  const [entry, setEntry] = useState("");
  const [journal, setJournal] = useState([]);

  /* ================= HABITS ================= */
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setJournal(JSON.parse(localStorage.getItem("journal")) || []);
    setHabits(JSON.parse(localStorage.getItem("habits")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addEntry = () => {
    if (!entry.trim()) return;
    setJournal([
      { text: entry, date: new Date().toLocaleString() },
      ...journal,
    ]);
    setEntry("");
  };

  const addHabit = () => {
    if (!habit.trim()) return;
    setHabits([...habits, { text: habit, done: false }]);
    setHabit("");
  };

  const toggleHabit = (i) => {
    const updated = [...habits];
    updated[i].done = !updated[i].done;
    setHabits(updated);
  };

  /* ================= UI ================= */
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title gradient-text">
        Wellness 🌿
      </h1>

      {/* ================= GUIDES ================= */}
      <div className="card glass fade-in">
        <h3 className="section-title">🧠 Mental Support</h3>

        <div style={guideGrid}>
          <GuideCard title="🧘 Relax" onClick={() => setActiveGuide("relax")} />
          <GuideCard title="😰 Panic Attack" onClick={() => setActiveGuide("panic")} />
          <GuideCard title="😞 Feeling Low" onClick={() => setActiveGuide("low")} />
          <GuideCard title="😟 Anxiety" onClick={() => setActiveGuide("anxiety")} />
        </div>
      </div>

      {/* ================= HABITS ================= */}
      <div className="card glass fade-in">
        <h3 className="section-title">🔁 Habit Tracker</h3>

        <div style={row}>
          <input
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Add habit..."
            style={input}
          />
          <button className="modern-btn" onClick={addHabit}>Add</button>
        </div>

        {habits.map((h, i) => (
          <div key={i} style={habitCard}>
            <span style={{
              textDecoration: h.done ? "line-through" : "none",
              opacity: h.done ? 0.6 : 1,
            }}>
              {h.text}
            </span>

            <button
              className="modern-btn secondary"
              onClick={() => toggleHabit(i)}
            >
              {h.done ? "Undo" : "Done"}
            </button>
          </div>
        ))}
      </div>

      {/* ================= JOURNAL ================= */}
      <div className="card glass fade-in">
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

      {/* ================= GUIDE MODAL ================= */}
      {activeGuide && (
        <div className="modal">
          <div className="modal-box glass">

            <h2>
              {activeGuide === "relax"
                ? "🧘 Relax Guide"
                : guides[activeGuide].title}
            </h2>

            <ul>
              {(activeGuide === "relax"
                ? [
                    "Inhale 4 seconds",
                    "Hold 4 seconds",
                    "Exhale 4 seconds",
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

/* ================= COMPONENT ================= */
function GuideCard({ title, onClick }) {
  return (
    <div className="guide-card" onClick={onClick}>
      {title}
    </div>
  );
}

/* ================= STYLES ================= */

const guideGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
};

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
  borderRadius: "12px",
  padding: "10px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const habitCard = {
  display: "flex",
  justifyContent: "space-between",
  background: "rgba(30,41,59,0.6)",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "8px",
};