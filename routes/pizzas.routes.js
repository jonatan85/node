const express = require('express');
const imageToUri = require('image-to-uri');
const fs = require('fs');

const Pizzas = require('../models/pizzas.js');
const createError = require('../utils/errors/create-error.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken.js');
const upload = require('../utils/middleware/file.middleware.js');

const pizzasRouter = express.Router();

pizzasRouter.get('/', (req, res) => {
    res.send('Esta es la lista de pizzas ricas');
});

pizzasRouter.post('/', [upload.single('picture')], async (req, res, next) => {
    try {
       const picturePath = req.file ? req.file.path : null;
       const picture = imageToUri(picturePath);
    
       const newMovie = new Movie({...req.body, picture });
       const createMovies = await newMovie.save();
       
       await fs.unlinkSync(picturePath);
       
       return res.status(201).json(createMovies);
    } catch(err) {
       next(err);
    }
 });

module.exports = pizzasRouter;