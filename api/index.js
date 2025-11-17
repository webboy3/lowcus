import express from "express";

const app = express();

// Middleware (similar to Laravel middleware)
app.use(express.json());

// Maintenance mode check
const maintenance = process.env.APP_MAINTENANCE === "true";
if (maintenance) {
  app.use((req, res) => {
    res.status(503).send("Application is under maintenance.");
    return;
  });
}

// Example route (like Laravel routes/web.php)
app.get("/", (req, res) => {
  res.json({
    message: "Hello from Node.js 20 on Vercel!",
    environment: process.env.APP_ENV,
    debugMode: process.env.APP_DEBUG === "true",
    url: process.env.APP_URL
  });
});

// Start server (Vercel handles this automatically in serverless functions)
export default app;
