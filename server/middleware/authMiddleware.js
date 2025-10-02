const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Token format is invalid' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; 
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};