// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for orders
const Order = require('../models/order')
const Coffee = require('../models/coffee')
const Donut =require('../models/donut')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /orders
router.get('/orders', requireToken, (req, res, next) => {
	Order.find()
		.populate(['coffees', 'donuts', 'owner'])
		.then((orders) => {
			// `orders` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return orders.map((order) => order.toObject())
		})
		// respond with status 200 and JSON of the orders
		.then((orders) => res.status(200).json({ orders: orders }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /orders/5a7db6c74d55bc51bdf39793
router.get('/orders/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Order.findById(req.params.id)
		.populate(['coffees', 'donuts', 'owner'])
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "order" JSON
		.then((order) => res.status(200).json({ order: order.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /orders
router.post('/orders/create-orders', requireToken, (req, res, next) => {
	// set owner of new order to be current user
	req.body.order.owner = req.user.id

	Order.create(req.body.order)
		// respond to succesful `create` with status 201 and JSON of new "order"
		.then((order) => {
			res.status(201).json({ order: order.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

//Add coffee
//This should find an order that is active and owned by the user
//The route should be /orders/add-coffee/:coffeeId
//if the user is the owner of the order then push the coffeeId into the coffee order array
router.post('/orders/addcoffee/:coffeeId', requireToken, (req, res, next) => {
	const ownerId = req.user.id; 
   	const coffeeId = req.params.coffeeId;
	
	   Order.findOne({ owner: ownerId, active : true })
	   .then((order) => {
		   if (!order) {
			   throw new Error('Order not found or not active');
		   }
		   
		
		   // If everything is fine, proceed to add the coffee
		   order.coffees.push(coffeeId);
		   return order.save();
	   })
	   .then((order) => {
		res.status(201).json({ order: order.toObject() })
	})
	   .catch(next);
});

//Add donut
//This should find an order that is active and owned by the user
//The route should be /orders/add-donut/:donutId
//if the user is the owner of the order then push the donutId into the coffee order array
router.post('/orders/adddonut/:donutId', requireToken, (req, res, next) => {
	const ownerId = req.user.id; 
   	const donutId = req.params.donutId;
	
	   Order.findOne({ owner: ownerId, active : true })
	   .then((order) => {
		   if (!order) {
			   throw new Error('Order not found or not active');
		   }
		   
		
		   // If everything is fine, proceed to add the coffee
		   order.donuts.push(donutId);
		   return order.save();
	   })
	   .then((order) => {
		res.status(201).json({ order: order.toObject() })
	})
	   .catch(next);
});




// UPDATE
// PATCH /orders/5a7db6c74d55bc51bdf39793
router.patch('/orders/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.order.owner

	Order.findById(req.params.id)
		.then(handle404)
		.then((order) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, order)

			// pass the result of Mongoose's `.update` to the next `.then`
			return order.updateOne(req.body.order)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /orders/5a7db6c74d55bc51bdf39793
router.delete('/orders/:id', requireToken, (req, res, next) => {
	Order.findById(req.params.id)
		.then(handle404)
		.then((order) => {
			// throw an error if current user doesn't own `order`
			requireOwnership(req, order)
			// delete the order ONLY IF the above didn't throw
			order.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
