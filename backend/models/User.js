const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
	given_name: { type: String, required: true },
	family_name: { type: String, required: true },
	full_name: { type: String, required: true },
	user_id: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: [true, 'Unique Email Required'],
		validate: {
			validator: function(v) {
				const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return emailRegx.test(v)
			},
		},
	},
	picture_url: { type: String, required: true },
})

var User = mongoose.model('User', users)

module.exports = User
