import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
function Home() {
  return (
    <div className="home">
      <h1>Welcome to URL Shortener</h1>
      <div className="buttons">
        <Link to="/add">
          <button className="btn"> Add Short URL</button>
        </Link>
        <Link to="/view">
          <button className="btn">View Short URL</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
