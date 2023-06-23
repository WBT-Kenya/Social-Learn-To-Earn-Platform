const { MongoUnexpectedServerResponseError } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path')

const videoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
   // type: Buffer,
    type: String,
    required: true,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
