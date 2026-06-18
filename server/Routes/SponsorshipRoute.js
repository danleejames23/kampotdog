const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const { getSponsorships } = require('../Controller/SponsorshipController');

router.get('/', requireAdmin, getSponsorships);

module.exports = router;
