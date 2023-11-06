const express = require('express');
const app = express();
const db = require('./dbconnection');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User')
// const videoRoutes = require('./routes/videoRoutes');
// const Video = require('./models/Video')

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//middleware
app.use(express.static('public'));
app.use(express.json());

app.use(authRoutes);
// app.use('/videos', videoRoutes);


app.listen(3001, ()=>{
  console.log("Listening to 3001")
})