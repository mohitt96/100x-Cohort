const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

// Middleware for handling auth
function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        const jwtToken = token.split(' ')[1];
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedValue.username && decodedValue.type === 'user') {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({
                message: 'User is not authenticated'
            });
        }
    } catch(err) {
        res.status(500).json({
            message: 'Invalid access token'
        });
    }
}

module.exports = userMiddleware;