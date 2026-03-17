const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => {
  res.send("User Service is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});