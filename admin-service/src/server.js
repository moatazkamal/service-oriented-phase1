const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => {
  res.send("Admin Service is running...");
});

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Admin Service running on port ${PORT}`);
});