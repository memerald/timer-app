const env = require("dotenv");
env.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./routes/userRoute"));

const url = process.env.MONGO_URL;

mongoose.connect(url, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
