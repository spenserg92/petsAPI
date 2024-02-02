
const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		adoptable: {
			type: Boolean,
			required: true,
			default: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
	}
)

// we define virtuals outside of the schema

// virtuals allow us to derive additional data from already existing data on our documnets
// when a document is retrieved and turnde into an object or JSON, the virtuals 

petSchema.virtual('fullTitle').get(function() {
    return`${this.name} the ${this.type}`
})

petSchema.virtual('isABaby').get(function(){
    if (this.age < 5) {
        return "Yeah, they're just a baby"
    } else if (this.age >= 5 && this.age < 10) {
        return "Not really a baby but still like a baby"
    } else {
        return "A good old pet(definitely still a baby)"
    }
})

module.exports = mongoose.model('Pet', petSchema)
