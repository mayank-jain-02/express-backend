const express = require('express');
const jokesRouter = express.Router();

const foodJokes = require('../data/food-jokes.json');
const celJokes = require('../data/celebrity-jokes.json');

jokesRouter.get('/food', (req, res) => {
    res.json(foodJokes);
});

jokesRouter.get('/celebrity', (req, res) => {
    res.json(celJokes);
});

module.exports = jokesRouter;