const db = require('../db');

const getCounters = (req, res) => {
    try {
        const rows = db.prepare('SELECT key, value, label FROM site_counters ORDER BY id ASC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCounter = (req, res) => {
    try {
        const { key } = req.params;
        const { value, label } = req.body;
        const info = db.prepare('UPDATE site_counters SET value=?, label=? WHERE key=?').run(value, label, key);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Counter not found' });
        }
        const row = db.prepare('SELECT * FROM site_counters WHERE key=?').get(key);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCounters, updateCounter };
