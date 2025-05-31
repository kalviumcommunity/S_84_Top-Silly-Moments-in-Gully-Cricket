const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require('./routes');
const authRoutes = require("./authRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 7856;
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes endpoint
app.use("/api", routes);

app.use("/api/auth", authRoutes);
//  Connection with MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Home Router with database connection status
app.get("/", (req, res) => {
  const connectionStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ database_status: connectionStatus });
});
app.get("/ping", (req, res) => {
  res.send("This is Home Route");
});
app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
});
