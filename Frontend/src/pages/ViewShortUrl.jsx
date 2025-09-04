import React, { useState } from "react";
import UrlDetails from "../Components/UrlDetails";
import "../App.css"
function ViewShortUrl() {
  const [shortcode, setShortcode] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedCode(shortcode.trim());
  };

  return (
    <div>
      <h2>View Short URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          required
        />
        <button type="submit">Fetch Details</button>
      </form>

      {submittedCode && <UrlDetails shortcode={submittedCode} />}
    </div>
  );
}

export default ViewShortUrl;
