const express = require('express');
const fs = require('fs');
const loggingMiddleware = require('./LoggingMiddleware/loggingMiddleware');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors());  
app.use(express.json());
app.use(loggingMiddleware); 



const dataFile = 'data.json';

const initialData = fs.existsSync(dataFile) ? require(`./${dataFile}`) : { urlStore: {}, clickData: {} };
let urlStore = initialData.urlStore || {};
let clickData = initialData.clickData || {};

function generateShortcode() {
  return Math.random().toString(36).substring(3, 7);
}


const saveData = () => {
  fs.writeFileSync(dataFile, JSON.stringify({ urlStore, clickData }, null, 2));
};


app.post('/shorturls', (req, res) => {
  const { url, validity = 30, shortcode: customShortcode } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Valid URL is required' });
  }

  let shortcode = customShortcode || generateShortcode();
  if (urlStore[shortcode]) {
    return res.status(409).json({ error: 'Shortcode already in use' });
  }

  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + parseInt(validity));
  urlStore[shortcode] = { url, expiry, created: new Date().toISOString(), clickCount: 0 };
  clickData[shortcode] = [];

  saveData();
  res.status(201).json({
    shortLink: `http://localhost:${port}/${shortcode}`,
    expiry: expiry.toISOString()
  });
});


app.post("/log", (req, res) => {
  const { stack, level, package: pkg, message, timestamp } = req.body;

  if (!stack || !level || !pkg || !message) {
    return res.status(400).json({ error: "Missing required log fields" });
  }

  console.log(`[${timestamp || new Date().toISOString()}] [${stack}] [${level}] [${pkg}] ${message}`);

  res.status(201).json({ status: "Log received" });
});

app.get('/shorturls/:shortcode', (req, res) => {
  const shortcode = req.params.shortcode;
  const urlData = urlStore[shortcode];

  if (!urlData) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date() > new Date(urlData.expiry)) {
    delete urlStore[shortcode];
    delete clickData[shortcode];
    saveData();
    return res.status(410).json({ error: 'Link has expired' });
  }

  res.json({
    shortLink: `http://localhost:${port}/${shortcode}`,
    clickCount: urlData.clickCount,
    created: urlData.created,
    expiry: urlData.expiry,
    clickData: clickData[shortcode].map(click => ({
      timestamp: click.timestamp,
    }))
  });
});




app.get('/:shortcode', (req, res) => {
  const shortcode = req.params.shortcode;
  const urlData = urlStore[shortcode];

  if (!urlData) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date() > new Date(urlData.expiry)) {
    delete urlStore[shortcode];
    delete clickData[shortcode];
    saveData();
    return res.status(410).json({ error: 'Link has expired' });
  }

  urlData.clickCount++;
  clickData[shortcode].push({
    timestamp: new Date().toISOString(),
  });
  saveData();
  res.redirect(urlData.url);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});