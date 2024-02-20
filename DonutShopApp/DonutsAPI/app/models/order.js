const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
			
		},
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
		
        createdAt: {
            type: String,
            default: Date.now
        }
	}
	
)

module.exports = mongoose.model('Order', orderSchema)
