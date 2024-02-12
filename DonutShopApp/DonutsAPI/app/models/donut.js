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
module.exports = mongoose.model('Donut', donutSchema)