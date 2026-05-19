require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const videoRoutes =
    require("./routes/videoRoutes");

const app = express();

const authRoutes =
    require("./routes/authRoutes");

app.use(express.json());

connectDB();

app.use(cors());

app.use("/videos", videoRoutes);

app.use("/auth", authRoutes);

app.listen(5000, () => {

    console.log("Server Started");

});