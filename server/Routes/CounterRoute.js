const express = require('express');
const router = express.Router();
const { getCounters, updateCounter } = require('../Controller/CounterController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getCounters);
router.put('/:key', requireAdmin, updateCounter);

module.exports = router;
