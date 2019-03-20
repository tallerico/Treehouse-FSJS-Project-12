const mongoose = require('mongoose')
const Schema = mongoose.Schema

const news = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
		auto: true,
	},
	user: { type: String, required: true },
	urlToImage: { type: String, required: true },
	url: { type: String, required: true },
	title: { type: String, required: true },
})

var User = mongoose.model('News', news)

module.exports = User
