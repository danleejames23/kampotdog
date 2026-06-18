const express = require('express');
const router = express.Router();
const { saveContact, getContacts, updateContactStatus, deleteContact } = require('../Controller/ContactController');
const { requireAdmin } = require('../middleware/auth');

router.post('/save', saveContact);
router.get('/all', requireAdmin, getContacts);
router.patch('/status/:id', requireAdmin, updateContactStatus);
router.delete('/delete/:id', requireAdmin, deleteContact);

module.exports = router;
