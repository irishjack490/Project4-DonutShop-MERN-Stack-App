const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		donuts : [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Donut',
		
		}],

		coffees: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coffee',
			
		}],
		
		active: {
			type: Boolean,
			default: true,
			required: true
		},
		
		owner: {
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
