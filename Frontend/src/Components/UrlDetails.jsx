import React, { useEffect, useState } from "react";
import "../App.css"
function UrlDetails({ shortcode }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`http://localhost:3001/shorturls/${shortcode}`);
        const data = await res.json();
        if (res.ok) {
          setDetails(data);
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDetails();
  }, [shortcode]);

  if (!details) return null;

  return (
    <div className="details">
      <h2>URL Details</h2>
      <p><strong>Short Link:</strong> <a href={details.shortLink}>{details.shortLink}</a></p>
      <p><strong>Click Count:</strong> {details.clickCount}</p>
      <p><strong>Created At:</strong> {new Date(details.created).toLocaleString()}</p>
      <p><strong>Expires At:</strong> {new Date(details.expiry).toLocaleString()}</p>

      <h3>Click History</h3>
      <ul>
        {details.clickData.length === 0 ? (
          <li>No clicks yet</li>
        ) : (
          details.clickData.map((c, i) => (
            <li key={i}>{new Date(c.timestamp).toLocaleString()}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UrlDetails;
