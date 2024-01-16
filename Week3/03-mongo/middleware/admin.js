const { Admin } = require('../db/index');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try {
        const username = req.headers.username;
        const password = req.headers.password;
        
        const adminUser = await Admin.findOne({
            username,
            password
        })
        
        if(!adminUser) {
            return res.status(403).json({
                message: 'Admin does not exist'
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            message: 'Error while fetching admin user'
        });
    }
}

module.exports = adminMiddleware;