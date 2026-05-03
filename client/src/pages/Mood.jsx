import { useState, useEffect, useRef } from "react";

function Mood() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("chat");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userText = message;
    setMessage("");

    setChat((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

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
        { role: "ai", text: "⚠️ Server error" },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div style={container}>
      <h1 style={title}>Mood Chat 💬</h1>

      <div style={chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg,#2563eb,#7c3aed)"
                    : "#1e293b",
                padding: "12px 16px",
                borderRadius: "14px",
                marginBottom: "10px",
                maxWidth: "70%",
                animation: "fadeIn 0.3s ease",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ opacity: 0.7 }}>AI is thinking...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={inputRow}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
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

/* styles */
const container = {
  maxWidth: "800px",
  margin: "auto",
};

const title = {
  textAlign: "center",
  marginBottom: "10px",
};

const chatBox = {
  height: "65vh",
  overflowY: "auto",
  background: "rgba(15,23,42,0.6)",
  padding: "20px",
  borderRadius: "16px",
};

const inputRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const btn = {
  padding: "12px 20px",
  borderRadius: "10px",
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  border: "none",
  color: "white",
  cursor: "pointer",
};

export default Mood;