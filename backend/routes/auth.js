const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // this is used inorder to check for valid emails and passwords
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const JWT_SECRET='JaiIsAGoodBoy';

//create a user using : POST "/api/auth/createuser", Doesn't require Auth
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 2 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password length too short').isLength({ min: 5 })
], async (req, res) => {

    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // CHECK WEATHER THE EMAIL IS REGISTERED ALREADY, as it is a promise so we are using await infront of it
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data={
            user:{
                id:user.id
            }
        }

        const authToken =jwt.sign(data,JWT_SECRET);


        // res.json(user);

        res.json({authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;