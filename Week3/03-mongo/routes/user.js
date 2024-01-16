const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    try {
        const { courseId } = req.params;
        const username= req.headers.username;
        
        await User.updateOne({
            username,
        }, {
            "$push": {
                purchasedCourses: courseId,
            },
        });
        res.status(200).json({
            message: 'Course purchased successfully'
        });
    } catch(err) {
        res.status(500).json({
            message: 'Error while purchasing course'
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.headers.username,
        });

        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses,
            }
        });
        res.status(200).json({
            courses
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error while fetching courses'
        });
    }
});

module.exports = router