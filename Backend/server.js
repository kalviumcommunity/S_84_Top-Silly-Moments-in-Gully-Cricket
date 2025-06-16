const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const momentRoutes = require("./routes/momentRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7856;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/moments", momentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Gully Cricket Moments API");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
