const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaXZhc2htYXJlZXNoMDdAZ21haWwuY29tIiwiZXhwIjoxNzU2OTgxNzI0LCJpYXQiOjE3NTY5ODA4MjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzY2M3MjczMC03YzYzLTRjODktOGU4YS1mNmEyYmIyMjllOTAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJuaXZhc2ggbSIsInN1YiI6IjM0N2RjMDRiLTk2M2EtNDM3YS1iZmNjLThjMTgwMDBkNzQ4NCJ9LCJlbWFpbCI6Im5pdmFzaG1hcmVlc2gwN0BnbWFpbC5jb20iLCJuYW1lIjoibml2YXNoIG0iLCJyb2xsTm8iOiI3MTQwMjIxMDcwMzciLCJhY2Nlc3NDb2RlIjoiQlVlWnVEIiwiY2xpZW50SUQiOiIzNDdkYzA0Yi05NjNhLTQzN2EtYmZjYy04YzE4MDAwZDc0ODQiLCJjbGllbnRTZWNyZXQiOiJBdFFNWFBickZGQmNFeHRWIn0.TPZ5wdKg8bJqOtXVZ_PP6Y5Dirqe0ChNCvXXBaCSgFE";
const TEST_SERVER_URL = "http://20.244.56.144/evaluation-service/logs";

async function Log(stack, level, pkg, message) {
  const fetch = (await import('node-fetch')).default;

  const logPayload = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(TEST_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`, 
      },
      body: JSON.stringify(logPayload),
    });
  } catch (err) {
    console.error("Failed to send log:", err.message);
  }

  console.log(`[${logPayload.timestamp}] [${stack}] [${level}] [${pkg}] ${message}`);
}

module.exports = Log;
