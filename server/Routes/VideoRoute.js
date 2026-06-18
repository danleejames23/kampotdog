const express = require('express');
const router = express.Router();
const { getVideos, getChannelVideos, createVideo, deleteVideo } = require('../Controller/VideoController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getVideos);
router.get('/channel', getChannelVideos);
router.post('/', requireAdmin, createVideo);
router.delete('/:id', requireAdmin, deleteVideo);

module.exports = router;
