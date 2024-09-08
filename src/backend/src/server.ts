import { app } from "./app";
import { config } from "./config";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 App Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Config Environment Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

// Create & Start Server
const port = config.APP.PORT || 5000;
const server = app.listen(port, async () => {
  console.log(`✅ Server started at:  ${config.APP.SERVER_URL}${port} ✅ `);
});

// Unhandled Rejections
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED SERVER REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
