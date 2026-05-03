import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { FaHome, FaHeart, FaBook, FaLeaf, FaTrophy, FaBars } from "react-icons/fa";

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

  if (!user) return <Login />;

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>

        {/* ===== SIDEBAR ===== */}
        <div
          style={{
            width: collapsed ? "80px" : "230px",
            background: "#020617",
            padding: "20px",
            transition: "0.3s",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              marginBottom: "20px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <FaBars />
          </button>

          <h2 style={{ marginBottom: "20px", fontSize: "18px" }}>
            {!collapsed && "🎓 Wellness"}
          </h2>

          {/* NAV LINKS */}
          <SidebarLink to="/dashboard" icon={<FaHome />} label="Dashboard" collapsed={collapsed} />
          <SidebarLink to="/mood" icon={<FaHeart />} label="Mood" collapsed={collapsed} />
          <SidebarLink to="/study" icon={<FaBook />} label="Study" collapsed={collapsed} />
          <SidebarLink to="/wellness" icon={<FaLeaf />} label="Wellness" collapsed={collapsed} />
          <SidebarLink to="/leaderboard" icon={<FaTrophy />} label="Leaderboard" collapsed={collapsed} />

          {/* Logout */}
          <button
            onClick={() => auth.signOut()}
            style={{
              marginTop: "20px",
              padding: "10px",
              width: "100%",
              background: "#ef4444",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
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
    </Router>
  );
}

export default App;

/* ===== SIDEBAR LINK COMPONENT ===== */
function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        borderRadius: "10px",
        color: isActive ? "white" : "#cbd5e1",
        textDecoration: "none",
        marginBottom: "10px",
        background: isActive
          ? "linear-gradient(135deg, #2563eb, #7c3aed)"
          : "transparent",
        transition: "0.2s",
      })}
    >
      {icon}
      {!collapsed && label}
    </NavLink>
  );
}