const db = require('../db');

const getSettings = (req, res) => {
    try {
        const rows = db.prepare('SELECT key, value FROM site_settings').all();
        const settings = {};
        rows.forEach(row => { settings[row.key] = row.value; });
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateSetting = (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;
        if (value === undefined) {
            return res.status(400).json({ error: 'value is required' });
        }
        db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value').run(key, value);
        res.status(200).json({ key, value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getSettings, updateSetting };
