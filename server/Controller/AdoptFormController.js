const db = require('../db');

const saveForm = (req, res) => {
    try {
        const { email, livingSituation, phoneNo, previousExperience, familyComposition, petId } = req.body;
        const info = db.prepare(
            `INSERT INTO adopt_forms (email, phone_no, living_situation, previous_experience, family_composition, pet_id) VALUES (?, ?, ?, ?, ?, ?)`
        ).run(email, phoneNo, livingSituation, previousExperience, familyComposition, petId);
        const row = db.prepare('SELECT * FROM adopt_forms WHERE id=?').get(info.lastInsertRowid);
        res.status(200).json(row);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAdoptForms = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM adopt_forms ORDER BY created_at DESC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteForm = (req, res) => {
    try {
        const { id } = req.params;
        const info = db.prepare('DELETE FROM adopt_forms WHERE id=?').run(id);
        if (info.changes === 0) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteAllRequests = (req, res) => {
    try {
        const { id } = req.params;
        const info = db.prepare('DELETE FROM adopt_forms WHERE pet_id=?').run(id);
        if (info.changes === 0) {
            console.log('Forms not found');
            return res.status(404).json({ error: 'Forms not found' });
        }
        res.status(200).json({ message: 'Forms deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    saveForm,
    getAdoptForms,
    deleteForm,
    deleteAllRequests
};
