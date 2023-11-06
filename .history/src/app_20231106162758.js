const mongoose = require('mongoose');
const express = require("express");
const app = express();
const { MongoClient } = require('mongodb');
const cors = require ()


// Your MongoDB connection code here

// const db = require("./dbconnection");
// const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
require('dotenv').config();


connectionParams = {
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true,

}

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.64ejlaa.mongodb.net/?retryWrites=true&w=majority`;
const connexion = mongoose.connect(uri, connectionParams).then(()=>console.log('connected to mongo cloud atlas'))
.catch((err) => console.log(err));

module.exports = connexion


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware
app.use(express.static("public"));
app.use(express.json());

// app.use(authRoutes);
// app.use("/videos", videoRoutes);