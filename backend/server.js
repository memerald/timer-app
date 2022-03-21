const env = require("dotenv");
env.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", require("./routes/userRoute"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
}

const url = process.env.MONGO_URL;

mongoose.connect(url, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});
