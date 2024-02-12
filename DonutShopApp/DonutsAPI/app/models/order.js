const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		donutItems: [donutSchema],

        coffeeItems: [coffeeSchema],
		
        totalCost: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        createdAt: {
            type: String,
            default: Date.now
        }
	}
	
)

module.exports = mongoose.model('Order', orderSchema)
