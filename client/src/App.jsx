import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaHome, FaHeart, FaBook, FaLeaf, FaTrophy } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/Mood";
import Study from "./pages/Study";
import Wellness from "./pages/Wellness";
import Leaderboard from "./pages/Leaderboard";

function App() {
    const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  };
  return (
    <Router>
      <div style={{ display: "flex" }}>
        
        {/* Sidebar */}
        <div style={{
  width: "240px",
  height: "100vh",
  background: "#111827",
  color: "white",
  padding: "20px"
}}>
  <h2 style={{ marginBottom: "30px" }}>🎓 Student Wellness</h2>

  <p><Link to="/" style={linkStyle}><FaHome /> Dashboard</Link></p>
  <p><Link to="/mood" style={linkStyle}><FaHeart /> Mood Check</Link></p>
  <p><Link to="/study" style={linkStyle}><FaBook /> Study Hub</Link></p>
  <p><Link to="/wellness" style={linkStyle}><FaLeaf /> Wellness</Link></p>
  <p><Link to="/leaderboard" style={linkStyle}><FaTrophy /> Leaderboard</Link></p>
</div>
          <h2>Student Wellness</h2>


        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/study" element={<Study />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

      
    </Router>
  );
}

export default App;