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

const port = 
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.64ejlaa.mongodb.net/?retryWrites=true&w=majority`;
const connexion = mongoose
  .connect(uri, connectionParams)
  .then(() => console.log("connected to mongo cloud atlas"))
  .catch((err) => console.log(err));


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

app.listen()