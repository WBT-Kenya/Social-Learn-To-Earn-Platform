const mongoose = require("mongoose");
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
require("dotenv").config();

connectionParams = {
  useUnifiedTopology: true,
};

const port = 3001;

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(authRoutes);
app.use("/videos", videoRoutes);

app.listen(port, () => console.log(`App started on port ${port}`));
