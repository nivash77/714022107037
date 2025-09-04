import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddShortUrl from "./pages/AddShortUrl";
import ViewShortUrl from "./pages/ViewShortUrl";
import "../src/App.css";

function App() {
  return (
    <Router>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/add">Add Short URL</Link>
        <Link to="/view">View Short URL</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddShortUrl />} />
        <Route path="/view" element={<ViewShortUrl />} />
      </Routes>
    </Router>
  );
}

export default App;
