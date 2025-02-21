const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 7856;

app.use(express.json());

//  Connection with MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

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
