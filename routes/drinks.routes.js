const express = require('express');
const Drinks = require('../models/Drinks.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken')

const drinksRoutes = express.Router();

drinksRoutes.get('/',  async (req, res, next) => {
  try{
     const drinks = await Drinks.find()
     return res.status(200).json(drinks);
  }catch(err) {
     next(err);
  }
});

drinksRoutes.get('/:id',  async (req, res, next) => {
  const id = req.params.id;
  try {
      const drinks = await Drinks.findById(id);
      if (drinks) {
          return res.status(200).json(drinks);
      } else {
          next(createError('No existe un plato con el id indicado', 404));
      }
  } catch (err) {
      // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
      next(err);
  }
});

drinksRoutes.post('/', async (req, res, next) => {
  try {
 
     const newPlates = new Drinks({...req.body });
     const createPlates = await newPlates.save();
     
     return res.status(201).json(createPlates);
  } catch(err) {
     next(err);
  }
});


 module.exports = drinksRoutes;