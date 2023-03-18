const express = require('express');
const createError = require('../utils/errors/create-error.js');
const Order = require('../models/Order.js');

const orderRouter = express.Router();

orderRouter.get('/', async(req, res) => {
    try {
       const order = await Order.find().populate('pizza');
       return res.status(200).json(order);
   } catch(err) {
       next(err);
   }
 });

 orderRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allOrder = await Order.findOne({ id: id });
        return response.status(200).json(allOrder);
    } catch (error) {
        next(error)
    }
 });
 
 orderRouter.post('/', async (req, res, next) => {
     try {
        
        const newOrder = new Order({...req.body });
        const createOrder = await newOrder.save();
         
        return res.status(201).json(createOrder);
     } catch(err) {
        next(err);
     }
  });
 
 orderRouter.put('/add-pizza', async (req, res, next) => {
    try {
        const {orderId, pizzaId} = req.body;
        if(!orderId) {
            return next(createError('Se necesita un id de orden para poder añadir una pizza', 500))
        }
        if(!pizzaId) {
            return next(createError('Se necesita un id de pizza para añadir a la orden', 500))
        }
        const addOrder = await Order.findByIdAndUpdate(
            orderId,
            {$push: {pizza: pizzaId}},
            {new: true }
        );
        return res.status(200).json(addOrder);
    } catch(err) {
        next(err);
    }
 });
 
 orderRouter.put('/:id', async (req, res, next) => {
    try {
       const id = req.params.id;
       const modifiedOrder = new Order({...req.body});
       modifiedOrder._id = id;
       const orderUpdate = await Order.findByIdAndUpdate(
          id,
          modifiedOrder,
          {new: true}
       );
       return res.status(200).json(orderUpdate);
    }catch (err) {
       next(err);
    }
  });
 
 orderRouter.delete('/:id', async (req, res, next) => {
    try{  
       const id = req.params.id;
       await Order.findByIdAndDelete(id);
       return res.status(200).json('La orden se elimino correctamente.')
    } catch(err) {
       next(err);
    }
  });
 
 module.exports = orderRouter;