//const Course = require('../models/Course');
const Video = require('../models/Video');

const storeVideo = async (req, res) => {
  try {
    const { filename, contentType, data } = req.body;

    const video = new Video({
      filename,
      contentType,
      data: Buffer.from(data, 'base64'), // Assuming the data is sent as a base64 string
    });

    await video.save();

    res.status(201).json({ message: 'Video stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while storing the video' });
  }
};

module.exports = { storeVideo };

