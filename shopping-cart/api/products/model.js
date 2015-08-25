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

var ProductSchema = new Schema({});
var Product = mongoose.model('Product', ProductSchema);