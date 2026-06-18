const db = require('../db');

const saveContact = (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const info = db.prepare(
            `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`
        ).run(name, email, subject, message);
        const row = db.prepare('SELECT * FROM contact_messages WHERE id=?').get(info.lastInsertRowid);
        res.status(200).json(row);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getContacts = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateContactStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        db.prepare('UPDATE contact_messages SET status=? WHERE id=?').run(status, id);
        res.status(200).json({ message: 'Status updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteContact = (req, res) => {
    try {
        const { id } = req.params;
        const info = db.prepare('DELETE FROM contact_messages WHERE id=?').run(id);
        if (info.changes === 0) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { saveContact, getContacts, updateContactStatus, deleteContact };
