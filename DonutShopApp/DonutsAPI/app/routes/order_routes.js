
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
router.get('/orders/:userId', requireToken, (req, res, next) => {
		Order.find()
			.populate('user')
			.then((orders) => {
				// `pets` will be an array of Mongoose documents
				// we want to convert each one to a POJO, so we use `.map` to
				// apply `.toObject` to each one
				return orders.map((order) => order.toObject())
			})
			// respond with status 200 and JSON of the pets
			.then((orders) => res.status(200).json({ orders: orders }))
			// if an error occurs, pass it to the handler
			.catch(next)
	})


// CREATE ORDER
// POST /order
router.post('/orders/create-order', requireToken, (req, res, next) => {
	// set owner of new order to be current user
	req.body.order.user = req.user.id

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

// UPDATE
// PUT /order/update-order/5a7db6c74d55bc51bdf39793
router.put('/orders/update-order/:orderId', requireToken, removeBlanks, (req, res, next) => {

	delete req.body.order.owner
	const orderId = req.params.orderId; 

	Order.findById(orderId)
		.then(handle404)
		.then((order) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			//requireOwnership(req, order)

			// pass the result of Mongoose's `.update` to the next `.then`
			return order.updateOne(req.body)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


router.delete('/orders/delete-order/:userId/:orderId', requireToken, (req, res, next) => {
    const orderId = req.params.orderId;
	
    Order.findById(orderId)
		.populate('user')
        .then(handle404)
        .then((order) => {
			console.log('Request User ID:', req.user._id)
            console.log('Resource Owner ID:', order.user);
            
            requireOwnership(req, order);

            return order.deleteOne(); 
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
});

module.exports = router;