const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // this is used inorder to check for valid emails and passwords
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET = 'JaiIsAGoodBoy';

// ROUTE 1 create a user using : POST "/api/auth/createuser", Doesn't require Auth
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 2 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password length too short').isLength({ min: 5 })
], async (req, res) => {

    let success=false;

    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // CHECK WEATHER THE EMAIL IS REGISTERED ALREADY, as it is a promise so we are using await infront of it
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);


        // res.json(user);
        success=true;
        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal Server Error");
    }
})

// Route 2 : authenticate a user : POST "/api/auth/login", no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;

    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "User or Password Inalid" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "User or Password Inalid" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        success=true;
        res.json({ success,authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal Server Error");
    }

})

// Route 3 : Get logged in user detail : POST "/api/auth/getuser", login required
router.post('/getuser',fetchuser ,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;