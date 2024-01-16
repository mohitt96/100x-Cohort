const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    try {
        const username = req.headers.username;
        const password = req.headers.password;
        
        const user = await User.findOne({
            username,
            password
        })
        
        if(!user) {
            return res.status(403).json({
                message: 'User does not exist'
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            message: 'Error while fetching user'
        });
    }
}

module.exports = userMiddleware;