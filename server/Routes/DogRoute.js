const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getDogs, getDogById, createDog, updateDog, deleteDog } = require('../Controller/DogController');
const { requireAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        cb(null, 'dog-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', getDogs);
router.get('/:id', getDogById);
router.post('/', requireAdmin, upload.single('image'), createDog);
router.put('/:id', requireAdmin, upload.single('image'), updateDog);
router.delete('/:id', requireAdmin, deleteDog);

module.exports = router;
