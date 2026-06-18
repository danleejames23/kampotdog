const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../Controller/SettingsController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getSettings);
router.put('/:key', requireAdmin, updateSetting);

module.exports = router;
