const db = require('../db');
const fs = require('fs');
const path = require('path');

const parseBoolean = (value) => value === true || value === 'true' || value === '1' || value === 1;

const getDogs = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM dogs ORDER BY pinned DESC, created_at DESC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDogById = (req, res) => {
    try {
        const { id } = req.params;
        const row = db.prepare('SELECT * FROM dogs WHERE id=?').get(id);
        if (!row) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDog = (req, res) => {
    try {
        const { name, breed, age, gender, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const lookingForHome = parseBoolean(req.body.looking_for_home) ? 1 : 0;
        const sponsored = parseBoolean(req.body.sponsored) ? 1 : 0;
        const pinned = parseBoolean(req.body.pinned) ? 1 : 0;
        const info = db.prepare(
            'INSERT INTO dogs (name, breed, age, gender, description, image, looking_for_home, sponsored, pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).run(name, breed, age, gender, description, image, lookingForHome, sponsored, pinned);
        const row = db.prepare('SELECT * FROM dogs WHERE id=?').get(info.lastInsertRowid);
        res.status(201).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDog = (req, res) => {
    try {
        const { id } = req.params;
        const existingDog = db.prepare('SELECT * FROM dogs WHERE id=?').get(id);
        if (!existingDog) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        const image = req.file ? req.file.filename : existingDog.image;
        const lookingForHome = parseBoolean(req.body.looking_for_home) ? 1 : 0;
        const sponsored = parseBoolean(req.body.sponsored) ? 1 : 0;
        const pinned = parseBoolean(req.body.pinned) ? 1 : 0;
        const { name, breed, age, gender, description } = req.body;

        db.prepare(
            `UPDATE dogs SET name=?, breed=?, age=?, gender=?, description=?, image=?, looking_for_home=?, sponsored=?, pinned=? WHERE id=?`
        ).run(name, breed, age, gender, description, image, lookingForHome, sponsored, pinned, id);

        if (req.file && existingDog.image) {
            const oldFilePath = path.join(__dirname, '../images', existingDog.image);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }

        const row = db.prepare('SELECT * FROM dogs WHERE id=?').get(id);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDog = (req, res) => {
    try {
        const { id } = req.params;
        const dog = db.prepare('SELECT * FROM dogs WHERE id=?').get(id);
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        db.prepare('DELETE FROM dogs WHERE id=?').run(id);
        if (dog.image) {
            const filePath = path.join(__dirname, '../images', dog.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        res.status(200).json({ message: 'Dog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDogs, getDogById, createDog, updateDog, deleteDog };
