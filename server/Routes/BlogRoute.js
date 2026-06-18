const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../Controller/BlogController');
const { requireAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        cb(null, 'blog-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', requireAdmin, upload.single('image'), createBlog);
router.put('/:id', requireAdmin, upload.single('image'), updateBlog);
router.delete('/:id', requireAdmin, deleteBlog);

module.exports = router;
