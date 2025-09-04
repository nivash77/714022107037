import React, { useState } from "react";
import ShortenForm from "../Components/ShortenForm";
import "../App.css"
function AddShortUrl() {
  const [shortcode, setShortcode] = useState("");
  return (
    <div>
      <h2>Add Short URL</h2>
      <ShortenForm setShortcode={setShortcode} />
    </div>
  );
}

export default AddShortUrl;
