const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'pawfinds_secret_key';

const adminLogin = (req, res) => {
    const { username, email, password } = req.body;
    const submittedUsername = (username || email || '').trim();
    if (submittedUsername === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        return res.status(200).json({ token });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
};

module.exports = { adminLogin };