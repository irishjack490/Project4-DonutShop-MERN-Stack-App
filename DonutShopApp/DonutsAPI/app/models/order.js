const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		donut : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Donut',
			required: true
		},

		donutQuantity: { 
			type: Number,
			default: 0
		},
	
		coffee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coffee',
			required: true
		},
		coffeeQuantity: {
			type: Number,
			default: 0
		},

		totalPrice: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			
		},
        createdAt: {
            type: String,
            default: Date.now
        }
	}
	
)

module.exports = mongoose.model('Order', orderSchema)
