const db = require('../db');

const getSponsorships = (req, res) => {
    try {
        const rows = db.prepare(
                `SELECT s.*, d.id AS dog_id, d.name AS dog_display_name, d.image AS dog_image, d.sponsored AS dog_sponsored,
                    date(COALESCE(s.sponsored_at, date(s.created_at)), '+1 month') AS next_payment_due
             FROM sponsorships s
             LEFT JOIN dogs d ON LOWER(REPLACE(d.name, ' ', '')) = LOWER(REPLACE(s.dog_name, ' ', ''))
             ORDER BY COALESCE(s.sponsored_at, date(s.created_at)) DESC, s.created_at DESC`
        ).all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getSponsorships };
