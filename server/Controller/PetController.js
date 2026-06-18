const db = require('../db');
const fs = require('fs');
const path = require('path');

const postPetRequest = (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;
    const info = db.prepare(
      `INSERT INTO pets (name, age, area, justification, email, phone, type, filename, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`
    ).run(name, age, area, justification, email, phone, type, filename);
    const row = db.prepare('SELECT * FROM pets WHERE id=?').get(info.lastInsertRowid);
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;
    const info = db.prepare(
      `UPDATE pets SET email=?, phone=?, status=?, updated_at=datetime('now') WHERE id=?`
    ).run(email, phone, status, id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const row = db.prepare('SELECT * FROM pets WHERE id=?').get(id);
    res.status(200).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = (reqStatus, req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM pets WHERE status=? ORDER BY updated_at DESC').all(reqStatus);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = (req, res) => {
  try {
    const id = req.params.id;
    const pet = db.prepare('SELECT * FROM pets WHERE id=?').get(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    db.prepare('DELETE FROM pets WHERE id=?').run(id);
    const filePath = path.join(__dirname, '../images', pet.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
