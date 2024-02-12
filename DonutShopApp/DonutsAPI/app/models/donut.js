const mongoose = require('mongoose')

const donutSchema = new mongoose.Schema (

    {
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
        glutenFree: {
            type: Boolean,
            required: true,
            default: false
        },
        price: {
            type: String,
            required: true,
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			
		},
	},
	{
		timestamps: true,
	}
    


)
module.exports = mongoose.model('Donut', donutSchema)