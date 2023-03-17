const express = require('express');
const Ingredients = require('../models/Ingredients.js');
const createError = require('../utils/errors/create-error.js');

const ingredientsRoutes = express.Router();


ingredientsRoutes.get('/', async(req, res, next) => {
    try {
        const ingredients = await Ingredients.find().populate('pizzas');
        return res.status(200).json(ingredients);
    } catch(err) {
        next(err);
    }
});

ingredientsRoutes.post('/', async(req, res, next) => {
    try{
        const newIngredients = new Ingredients({ ...req.body});
        const createIngredients = await newIngredients.save();
        return res.status(201).json(createIngredients);
    } catch(err) {
        next(err);
    }
});

// Añade peliculas  a los cines.
ingredientsRoutes.put('/add-ingredients', async (req, res, next) => {
    try {
        const {ingredientsId, pizzasId} = req.body;
        if(!ingredientsId) {
            return next(createError('Se necesita un id de cine para poder añadir una peliula', 500))
        }
        if(!pizzasId) {
            return next(createError('Se necesita un id de pilicula para añadirlo a el cine', 500))
        }
        const addIngredients = await Ingredients.findByIdAndUpdate(
            ingredientsId,
            {$push: {movies: pizzasId}},
            {new: true }
        );
        return res.status(200).json(addIngredients);
    } catch(err) {
        next(err);
    }
});

module.exports = ingredientsRoutes;