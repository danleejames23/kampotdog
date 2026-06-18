const db = require('../db');
const fs = require('fs');
const path = require('path');

const getBlogs = (req, res) => {
    try {
        const { category } = req.query;
        let rows;
        if (category && category !== 'all') {
            rows = db.prepare('SELECT * FROM blogs WHERE category=? ORDER BY created_at DESC').all(category);
        } else {
            rows = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all();
        }
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBlogById = (req, res) => {
    try {
        const { id } = req.params;
        const row = db.prepare('SELECT * FROM blogs WHERE id=?').get(id);
        if (!row) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createBlog = (req, res) => {
    try {
        const { title, category, content, author, remove_image } = req.body;
        if (!title || !category || !content) {
            return res.status(400).json({ error: 'title, category and content are required' });
        }
        const image = req.file ? req.file.filename : null;
        const info = db.prepare('INSERT INTO blogs (title, category, content, author, image) VALUES (?, ?, ?, ?, ?)').run(title, category, content, author || 'Admin', image);
        const row = db.prepare('SELECT * FROM blogs WHERE id=?').get(info.lastInsertRowid);
        res.status(201).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateBlog = (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content, author } = req.body;
        if (!title || !category || !content) {
            return res.status(400).json({ error: 'title, category and content are required' });
        }

        const existing = db.prepare('SELECT * FROM blogs WHERE id=?').get(id);
        if (!existing) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const shouldRemoveImage = String(remove_image || '').toLowerCase() === 'true';
        const image = req.file ? req.file.filename : (shouldRemoveImage ? null : existing.image);
        db.prepare(
            'UPDATE blogs SET title=?, category=?, content=?, author=?, image=? WHERE id=?'
        ).run(title, category, content, author || 'Admin', image, id);

        if ((req.file || shouldRemoveImage) && existing.image && existing.image !== image) {
            const oldFilePath = path.join(__dirname, '../images', existing.image);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }

        const row = db.prepare('SELECT * FROM blogs WHERE id=?').get(id);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteBlog = (req, res) => {
    try {
        const { id } = req.params;
        const blog = db.prepare('SELECT * FROM blogs WHERE id=?').get(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        db.prepare('DELETE FROM blogs WHERE id=?').run(id);
        if (blog.image) {
            const filePath = path.join(__dirname, '../images', blog.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
