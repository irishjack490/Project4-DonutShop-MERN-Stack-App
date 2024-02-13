
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for examples
const Order = require('../models/order')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Get all orders for authenticated user
// // GET /orders
router.get('/orders', requireToken,  (req, res, next) => {
	Order.find({user: req.user})
		.sort({createdAt: -1})
		.exec((err, orders) => {
			if (err) {
				console.error('Error fetching order:'. err);
				return res.status(500).json({error: 'Failed to fetch orders'});
			}
			res.status(200).json(orders);
		});				
});


// CREATE ORDER
// POST /order
router.post('/order', requireToken, async (req, res, next) => {
	// set owner of new example to be current user
	try{
		const { coffeeId, donutId, coffeeQuantity, donutQuantity, totalPrice} = req.body;
	
		const order = new Order({
			user: req.user,
			coffee: coffeeId,
			coffeeQuantity: coffeeQuantity,
			donut: donutId,
			totalPrice: totalPrice,
		});
		await order.save();
		res.status(201).json(order);
	} catch (error) {
		console.error('Error creating order', error);
		res.status(500).json({error: 'Failed to create order'});
	}
});


// UPDATE
// PUT /order/5a7db6c74d55bc51bdf39793
router.put('/orders/:orderId', requireToken, async (req, res, next) => {
	try {
		const { coffeeId, donutId, coffeeQuantity, donutQuantity, totalPrice} = req.body;
		//find oders by id
		const order = await Order.findById(req.params.orderId);
		//confirm order exists
		if(!order){
			return res.status(404).json({error: 'Order not found'});
		}
		//make sure authenticated user owns the order
		if (order.user.toString() !== req.user.toString()){
			return res.status(403).json({error: 'You are not athorized to update this order'})
		}
		//here update order with the new data
		order.coffee = coffeeId;
		order.coffeeQuantity = coffeeQuantity;
		order.donut = donutId;
		order.donutQuantity = donutQuantity;
		order.totalPrice = totalPrice;

		//save order to the db
		await order.save();

		res.status(200).json(order);
	}   catch (error) {
		console.error('Error updating order', error);
		res.status(500).json({error: 'Failed to update order'})
	}
})
// DELETE orders from user's order history and db
// DELETE /order/5a7db6c74d55bc51bdf39793
router.delete('/orders/:orderId', requireToken, (req, res, next) => {
	Order.findById(req.params.orderId, (err, order) => {
		if (err){
			console.error('Error deleting order:', err);
			return res.status(500).json({error: 'Failed to delete order'})
		}
		//Ensure order exists and that user owns it
		if (!order || order.user.toString() !== req.user.toString()) {
			return res.status(404).json({error: 'Order not found'});
		}
		//Delete order from db
		order.remove((err) =>{
			if (err) {
				console.error('Error deleting order:', err);
				return res.status(500).json({error: 'Failed to delete order'});
			}
			res.status(204).end();
		});
	});
});

module.exports = router
