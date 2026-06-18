const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pawfinds_secret_key';

const requireAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { requireAdmin };
