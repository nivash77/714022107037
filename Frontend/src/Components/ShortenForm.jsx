import React, { useState } from "react";
import "../App.css"
function ShortenForm({ setShortcode }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [customCode, setCustomCode] = useState("");
  const [shortLink, setShortLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/shorturls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, validity, shortcode: customCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortLink(data.shortLink);
        const code = data.shortLink.split("/").pop();
        setShortcode(code);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Validity in minutes"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <button type="submit">Generate Short URL</button>

      {shortLink && (
        <p className="result">
           Short URL: <a href={shortLink}>{shortLink}</a>
        </p>
      )}
    </form>
  );
}

export default ShortenForm;
