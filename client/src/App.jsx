import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { FaHome, FaHeart, FaBook, FaLeaf, FaTrophy } from "react-icons/fa";

import Dashboard from "./pages/Dashboard";
import Mood from "./pages/Mood";
import Study from "./pages/Study";
import Wellness from "./pages/Wellness";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "10px",
    color: "#cbd5e1",
    textDecoration: "none",
  };

  const activeStyle = {
    background: "#2563eb",
    color: "white",
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          height: "100vh",
          background: "#020617",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: collapsed ? "70px" : "230px",
            background: "#020617",
            padding: "20px",
            color: "white",
            transition: "0.3s",
          }}
        >
          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              marginBottom: "20px",
              background: "#1e293b",
              border: "none",
              color: "white",
              padding: "8px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            ☰
          </button>

          {!collapsed && <h2>🎓 Student Wellness</h2>}

          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            <FaHome /> {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/mood"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            <FaHeart /> {!collapsed && "Mood"}
          </NavLink>

          <NavLink
            to="/study"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            <FaBook /> {!collapsed && "Study"}
          </NavLink>

          <NavLink
            to="/wellness"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            <FaLeaf /> {!collapsed && "Wellness"}
          </NavLink>

          <NavLink
            to="/leaderboard"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            <FaTrophy /> {!collapsed && "Leaderboard"}
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => auth.signOut()}
            style={{
              marginTop: "20px",
              padding: "10px",
              width: "100%",
              background: "#ef4444",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
            }}
          >
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/study" element={<Study />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;