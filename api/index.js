export default function handler(req, res) {
  // Read environment variables
  const env = process.env.APP_ENV;
  const debug = process.env.APP_DEBUG === "true";

  // Send JSON response
  res.status(200).json({
    message: "Hello from Node.js 20 on Vercel!",
    environment: env,
    debugMode: debug,
    url: process.env.APP_URL
  });
}
