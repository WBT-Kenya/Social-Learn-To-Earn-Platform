const express = require('express');
const app = express();
const db = require('./dbconnection');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User')


app.use(express.urlencoded({extended: true}));
app.use(express.json());


//middleware
app.use(express.static('public'));
app.use(express.json());

app.use(authRoutes);


app.listen(3001, ()=>{
  console.log("Listening to 3001")
})