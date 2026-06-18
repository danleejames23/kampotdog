const db = require('../db');

const saveReturn = (req, res) => {
    try {
        const { dogName, adopterName, email, phone, reason, additionalInfo } = req.body;
        if (!dogName || !adopterName || !email || !phone || !reason) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const info = db.prepare(
            `INSERT INTO return_requests (dog_name, adopter_name, email, phone, reason, additional_info) VALUES (?, ?, ?, ?, ?, ?)`
        ).run(dogName, adopterName, email, phone, reason, additionalInfo || '');
        const row = db.prepare('SELECT * FROM return_requests WHERE id=?').get(info.lastInsertRowid);
        res.status(200).json(row);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getReturns = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM return_requests ORDER BY created_at DESC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateReturnStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        db.prepare('UPDATE return_requests SET status=? WHERE id=?').run(status, id);
        res.status(200).json({ message: 'Status updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteReturn = (req, res) => {
    try {
        const { id } = req.params;
        const info = db.prepare('DELETE FROM return_requests WHERE id=?').run(id);
        if (info.changes === 0) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { saveReturn, getReturns, updateReturnStatus, deleteReturn };
