import { useState, useEffect, useRef } from "react";

function Mood() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(() => {
    // 🔥 Load ONLY ONCE (important)
    const saved = localStorage.getItem("chat");
    return saved ? JSON.parse(saved) : [];
  });

  const chatEndRef = useRef(null);

  /* 🔹 Save chat */
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  /* 🔹 Send message */
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userText = message;

    // add user msg
    setChat((prev) => [...prev, { role: "user", text: userText }]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "No response" },
      ]);

    } catch {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Server not responding" },
      ]);
    }
  };

  /* 🔹 Auto scroll */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div style={container}>
      <h1 style={title}>Mood Check 💬</h1>

      <div style={chatBox}>
        {chat.length === 0 && (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            Start chatting... 👋
          </p>
        )}

        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                maxWidth: "65%",
                padding: "10px",
                borderRadius: "10px",
                background:
                  msg.role === "user" ? "#2563eb" : "#1e293b",
                color: "white",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      <div style={inputRow}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How are you feeling today?"
          style={input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={btn}>
          Send
        </button>
      </div>
    </div>
  );
}

/* 🔥 FIXED LAYOUT (IMPORTANT) */

const container = {
  width: "100%",
  maxWidth: "900px",        // wider but controlled
  margin: "20px auto",      // space from top + center
  display: "flex",
  flexDirection: "column",
  height: "85vh",
  padding: "10px",          // 🔥 spacing from edges
};

const title = {
  textAlign: "center",
  marginBottom: "20px",     // 🔥 more breathing space
  fontSize: "32px",
};

const chatBox = {
  flex: 1,
  background: "#0f172a",
  padding: "20px",
  borderRadius: "14px",
  overflowY: "auto",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)", // 🔥 nice depth
};

const inputRow = {
  display: "flex",
  gap: "12px",
  marginTop: "15px",
};

const input = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#1e293b",
  color: "white",
  fontSize: "14px",
};

const btn = {
  padding: "12px 24px",
  background: "#2563eb",
  border: "none",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};
export default Mood;