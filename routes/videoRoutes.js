const { Router } = require('express');
//module.exports = router;
const videoController = require('../controllers/videoController'); //import
const router = Router();
const express = require('express');

// POST route to store a video
router.post('/video', videoController.storeVideo);

module.exports = router;