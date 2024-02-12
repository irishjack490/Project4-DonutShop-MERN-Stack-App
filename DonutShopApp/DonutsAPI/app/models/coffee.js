const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema (

    {
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
        size: {
            type: String,
            required: true,
            enum: ['small', 'medium', 'large'],
            default: 'small'
        },
        cost: {
            type: String,
            required: true,
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Coffee', coffeeSchema)