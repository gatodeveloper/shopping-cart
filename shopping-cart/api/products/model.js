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
	,	status: { type: String }
	,	created: { type: Date, default: Date.now }
});

var ShoppingCartSchema = new Schema({
		session: { type: String }
	,	user: { type: String , unique: true }
	,	products: [{ type: ObjectId, ref: 'Product'}]
	,	created: { type: Date, default: Date.now }
});

var Product = mongoose.model('Product', ProductSchema);
var ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);