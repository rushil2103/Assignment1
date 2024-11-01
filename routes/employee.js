const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const routes = express.Router();

// User signup route
routes.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).send({
            message: 'User created successfully',
            user: { username: savedUser.username, email: savedUser.email }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// User login route
routes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        res.status(200).send({
            message: 'Login successful',
            user: { username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = routes;
