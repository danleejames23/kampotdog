const express = require('express');
const router = express.Router();
const { saveReturn, getReturns, updateReturnStatus, deleteReturn } = require('../Controller/ReturnController');
const { requireAdmin } = require('../middleware/auth');

router.post('/save', saveReturn);
router.get('/all', requireAdmin, getReturns);
router.patch('/status/:id', requireAdmin, updateReturnStatus);
router.delete('/delete/:id', requireAdmin, deleteReturn);

module.exports = router;
