/**
 * Dependencies
 * @type {[type]}
 */
var u = require('../utils');
var mongoose = require("mongoose");
var async = require('async');
var _ = require('lodash');
var path = require('path');
var paginate = require('mongoose-query-paginate');


/**
 * Models
 * @type {[type]}
 */
var Product = mongoose.model('Product');
var ShoppingCart = mongoose.model('ShoppingCart');


exports.postProduct = function(req, res){
	res.send('postProduct');
};

exports.getProducts = function(req, res){

	var query = req.query;
	var page = query.p || 1;

	var paginate = {
		perPage: 20,
		page : page,
		delta  : 1,
	};

	var findProducts = function(){
		var find = {};
		var paginate = 
		Product
			.find( find )
			.paginate( paginate, function(err, products){
				res.send(products)
			});

	};

	var response = function( products, cb){
		res.send(products)
	};
	
	async.waterfall([
		findProducts
	], function(err, eData){

	});
};


// Cart

exports.postProductCart = function(req, res){

	var body = req.body;
	var query = req.query;
	var params = req.params;
	var userId = params.userId;
	var product = body.product;

	var findShoppingCart = function( cb ){
		var find = { 
			user: userId 
		};
		ShoppingCart
			.findOne( find )
			.exec( function(err, shoppingCart){
				if( err ) cb(true, 400);
				cb(null, shoppingCart);
			});
	};

	var createShoppingCart = function( shoppingCart, cb ){
		if( shoppingCart ) return cb( null, shoppingCart);
		var data = {
			user: userId,
			products: [product]
		};
		var productCart = new ShoppingCart( data )
		productCart
			.save( function(err, shoppingCart){
				res.send(shoppingCart)
			});

	};

	var updateProductCart = function( shoppingCart, cb ){
		shoppingCart.products.push(product);
		shoppingCart.save( function(err, shoppingCart){
			if( err ) cb(true, 400);
			cb(null, shoppingCart)
		});
	};

	var response = function(shoppingCart, cb){
		res.send(shoppingCart);
	};
	
	async.waterfall([
		findShoppingCart,
		createShoppingCart,
		updateProductCart,
		response
	], function(err, eData){
		if( err ) return res.status(eData).send(eData);
	});
};

exports.getProductsCart = function(req, res){

	//var body = req.body;
	//var query = req.query;
	var params = req.params;
	var userId = params.userId;
	//var product = body.product;

	var findShoppingCart = function( cb ){
		var find = { 
			user: userId 
		};
		ShoppingCart
			.findOne( find )
			.populate('products')
			.exec( function(err, shoppingCart){
				if( err ) cb(true, 400);
				cb(null, shoppingCart);
			});
	};

	var response = function(shoppingCart, cb){
		res.send(shoppingCart);
	};

	async.waterfall([
		findShoppingCart,
		response
	], function(err, eData){
		if( err ) return res.status(eData).send(eData);
	});
};


exports.deleteProductsCart = function(req, res){

	var body = req.body;
	var query = req.query;
	var params = req.params;
	var userId = params.userId;
	var product = body.product;

	var findShoppingCart = function( cb ){
		var find = { 
			user: userId 
		};
		ShoppingCart
			.findOne( find )
			.exec( function(err, shoppingCart){
				if( err ) cb(true, 400);
				cb(null, shoppingCart);
			});
	};

	var updateProductCart = function( shoppingCart, cb ){
		var products = shoppingCart.products || [];
		shoppingCart.products = _.filter( products, function( p ){
			return (p != product);
		});
		shoppingCart.save( function(err, shoppingCart){
			if( err ) cb(true, 400);
			cb(null, shoppingCart)
		});
	};

	var response = function(shoppingCart, cb){
		res.send(shoppingCart);
	};

	async.waterfall([
		findShoppingCart,
		updateProductCart,
		response
	], function(err, eData){
		if( err ) return res.status(eData).send(eData);
	});
};