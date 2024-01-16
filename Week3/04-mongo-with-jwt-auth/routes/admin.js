const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const {Admin, Course} = require('../db');
const {JWT_SECRET} = require('../config');

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const adminUser = await Admin.findOne({username});
        if(adminUser) {
            return res.status(403).json({
                message: 'Admin user already exists'
            });
        };

        await Admin.create({
            username,
            password
        });

        res.status(200).json({
            message: 'Admin user created successfully'
        })
    } catch(err) {
        res.status(500).json({
            message: 'Admin user could not be created'
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const adminUser = await Admin.findOne({username, password});
        if(adminUser) {
            const token = jwt.sign({username, type: 'admin'}, JWT_SECRET);
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

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        const {title, description, imageLink, price} = req.body;
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price
        });
        res.status(200).json({
            message: 'Course created successfully',
            courseId: newCourse._id
        });
    } catch (err) {
        res.status(500).json({
            message: 'Course could not be created'
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
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

module.exports = router;