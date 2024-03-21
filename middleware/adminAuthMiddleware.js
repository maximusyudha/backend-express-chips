const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secretKey);
        if (decodedToken && decodedToken.role === 'admin') {
            req.userData = { userId: decodedToken.userId, email: decodedToken.email, role: decodedToken.role };
            next();
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
