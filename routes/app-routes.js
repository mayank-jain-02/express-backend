const express = require('express');
const appRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const users = require('../data/users');

const secret = 'mayank-jain';
const expiresIn = '1h';

const generateToken = (payload) => {
    return jsonwebtoken.sign(payload, secret, { expiresIn: expiresIn });
}

appRouter.get('/get-token', (req, res) => {
    const token = generateToken({ payload: 'front-end' })
    res.json({
        token: token
    });
});

appRouter.post('/verify-token', (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
        const decoder = jsonwebtoken.verify(token, secret);

        res.json({
            success: true,
            token,
            decoder
        });
    } catch (ex) {
        res.json({
            success: false,
            error: ex
        })
    }
});

appRouter.get('/users', (req, res) => {
    res.json(users);
})

appRouter.post('/login', (req, res) => {
    let isValid = undefined;
    users.filter((user) => {
        if (user.username === req.body.username && user.password === req.body.password) {
            isValid = true;
        }
    });
    
    if (isValid) {
        return res.status(200).json({
            success: true,
            token: generateToken({
                username: req.body.username
            })
        })
    }

    res.status(422).json({
        success: false,
        message: "Invalid username or password"
    });
})

module.exports = appRouter;