const express = require('express');
const createError = require('../utils/errors/create-error.js');
const Order = require('../models/Order.js');

const orderRouter = express.Router();

orderRouter.get('/', async(req, res) => {
    try {
       const order = await Order.find().populate('items.pizza');
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
 orderRouter.get('/orders/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('items.pizza');
      if (order == null) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
        next(error)
    }
  });
 
  orderRouter.post('/order', async (req, res, next) => {
    try {
      const newOrder = new Order({
        items: req.body.items.map(item => Object.assign({}, item)),
        total: req.body.total
      });
      const createOrder = await newOrder.save();
      return res.status(201).json(createOrder);
    } catch (err) {
      next(err);
    }
  });
 
 

 
 module.exports = orderRouter;