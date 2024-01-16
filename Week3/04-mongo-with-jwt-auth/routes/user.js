const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const {User, Course} = require('../db');
const {JWT_SECRET} = require('../config');

const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username});
        if(user) {
            return res.status(403).json({
                message: 'User already exists'
            });
        };

        await User.create({
            username,
            password
        });

        res.status(200).json({
            message: 'User created successfully'
        })
    } catch(err) {
        res.status(500).json({
            message: 'User could not be created'
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username, password});
        if(user) {
            const token = jwt.sign({username, type: 'user'}, JWT_SECRET);
            return res.status(200).json({
                token,
            });
        };
        return res.status(411).json({
            message: 'Invalid email and password',
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error while fetching user details'
        });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({
            courses,
        });
    } catch(err) {
        res.status(500).json({
            message: 'Error while fetching courses',
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { username } = req;
        
        await User.updateOne({username}, {
            "$push": {
                purchasedCourses: courseId,
            },
        });
        res.status(200).json({
            message: 'Course purchased successfully',
        });
    } catch(err) {
        res.status(500).json({
            message: 'Error while purchasing course',
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const { username } = req;
        const user = await User.findOne({username});
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses
            },
        });
        res.status(200).json({
            courses,
        });
    } catch(err) {
        res.status(500).json({
            message: 'Error while fetching purchased courses',
        });
    }
});

module.exports = router;