const express = require('express');
const router = express.Router();
const { approveRequest, deletePost, allPets } = require('../Controller/PetController');
const { requireAdmin } = require('../middleware/auth');

router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', requireAdmin, (req, res) => allPets('Adopted', req, res));
router.put('/approving/:id', requireAdmin, approveRequest);
router.delete('/delete/:id', requireAdmin, deletePost);

module.exports = router;
