/**
 * Model Products
 */


/**
 * Dependencies
 * @type {[type]}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProductSchema = new Schema({
		title: {type: String }
	,	description: {type: String }
	,	price: {type: Number }
	,	stockAmount: {type: Number }
	,	photos: [{type: Object }]
	,	taxes: [{type: Object }]
});

var Product = mongoose.model('Product', ProductSchema);