const express = require('express');
const router = express.Router();
const { saveForm, getAdoptForms, deleteForm, deleteAllRequests } = require('../Controller/AdoptFormController');
const { requireAdmin } = require('../middleware/auth');

router.post('/save', saveForm);
router.get('/getForms', requireAdmin, getAdoptForms);
router.delete('/reject/:id', requireAdmin, deleteForm);
router.delete('/delete/many/:id', requireAdmin, deleteAllRequests);

module.exports = router;
