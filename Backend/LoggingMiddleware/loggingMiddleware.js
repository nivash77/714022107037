
const Log = require("./log");

const loggingMiddleware = (req, res, next) => {
  const start = Date.now();
  Log("backend", "info", "middleware", `Incoming request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    Log(
      "backend",
      "info",
      "middleware",
      `Response: ${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = loggingMiddleware;
