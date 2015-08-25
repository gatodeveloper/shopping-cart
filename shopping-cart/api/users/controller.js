/**
 * Dependencies
 * @type {[type]}
 */
var u = require('../utils');
var mongoose = require("mongoose");
var async = require('async');
var _ = require('lodash');
//var mailing = require("../mailing/controller");
//var gm = require('gm').subClass({ imageMagick: true });
var path = require('path');    


/**
 * Models
 * @type {[type]}
 */
var User = mongoose.model('User');


/**
 * @api {post} /users Create User
 * @apiVersion 0.0.1
 * 
 * @apiName postUser
 * @apiGroup Users
 *
 * @apiParamTitle (Login) Login
 * @apiParam (Login) {String} email The email user
 * @apiParam (Login) {String} password The password user
 *
 * 
 * @apiSuccessTitle (postUser200) 200 - OK Request
 * @apiSuccess (postUser200) Object <code>200</code> The Object user.
 *
 * 
 * @apiErrorTitle (postUser400) 400 - Bad Request
 * @apiError (postUser400) 400 <code>400</code> email and password is Required
 *
 * 
 * @apiErrorTitle (postUser401) 401 - Unauthorized
 * @apiError (postUser401) 401 <code>401</code> Invalid password or email
 *
 *
 */

exports.postUser = function(req, res, next) {

	var body = req.body;
	var data = body;

	var	createUser =  function( cb ){
		var user = new User( data );
		user.save( function( err, user ){
			if( err || !user ) return cb( err );
			cb( null );
		});
	}

	async.waterfall([
		createUser,
	], function( err , data ){
		if( err ) return next( err );
		res.json({results: data});
	});
};


/**
 * @api {get} /users get User
 * @apiVersion 0.0.1
 * 
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiParamTitle (Login) Login
 * @apiParam (Login) {String} email The email user
 * @apiParam (Login) {String} password The password user
 *
 * 
 * @apiSuccessTitle (getUser200) 200 - OK Request
 * @apiSuccess (getUser200) Object <code>200</code> The Object user.
 *
 * 
 * @apiErrorTitle (getUser400) 400 - Bad Request
 * @apiError (getUser400) 400 <code>400</code> email and password is Required
 *
 * 
 * @apiErrorTitle (getUser401) 401 - Unauthorized
 * @apiError (getUser401) 401 <code>401</code> Invalid password or email
 *
 *
 */

exports.getUser = function(req, res, next) {

	var params = req.params;
	var userId = params.userID;

	var	getUser =  function( cb ){
		var find = userId;
		User.findById( find )
			.exec( function( err, user){
				if( err || !user ) return cb( true, err );
				cb( null, user);
			});
	}

	async.waterfall([
		getUser,
	], function( err , data ){
		if( err ) return next( err );
		res.json({results: data});
	});
};

/**
 * @api {delete} /users Delete User
 * @apiVersion 0.0.1
 * 
 * @apiName deleteUser
 * @apiGroup Users
 *
 * @apiParamTitle (Login) Login
 * @apiParam (Login) {String} email The email user
 * @apiParam (Login) {String} password The password user
 *
 * 
 * @apiSuccessTitle (deleteUser200) 200 - OK Request
 * @apiSuccess (deleteUser200) Object <code>200</code> The Object user.
 *
 * 
 * @apiErrorTitle (deleteUser400) 400 - Bad Request
 * @apiError (deleteUser400) 400 <code>400</code> email and password is Required
 *
 * 
 * @apiErrorTitle (deleteUser401) 401 - Unauthorized
 * @apiError (deleteUser401) 401 <code>401</code> Invalid password or email
 *
 *
 */

exports.deleteUser = function(req, res, next) {

	var params = req.params;
	var userId = params.userID;

	var	getUser =  function( cb ){
		var find = userId;
		User.removeById( find )
			.exec( function( err, user){
				if( err || !user ) return cb( true, err );
				cb( null, user);
			});
	}

	async.waterfall([
		getUser,
	], function( err , data ){
		if( err ) return next( err );
		res.json({results: data});
	});
};


/**
 * @api {post} /auth/login SignIn
 * @apiVersion 0.0.1
 * 
 * @apiName SignIn
 * @apiGroup Auth
 *
 * @apiGroupDescription The User Authentication
 * 
 * @apiParamTitle (Login) Login
 * @apiParam (Login) {String} email The email user
 * @apiParam (Login) {String} password The password user
 *
 * 
 * @apiSuccessTitle (SignIn200) 200 - Data for User
 * @apiSuccess (SignIn200) Object <code>200</code> The Object user.
 *
 * 
 * @apiErrorTitle (SignIn400) 400 - Bad Request
 * @apiError (SignIn400) 400 <code>400</code> email and password is Required
 *
 * 
 * @apiErrorTitle (SignIn401) 401 - Unauthorized
 * @apiError (SignIn401) 401 <code>401</code> Invalid password or email
 *
 *
 */


exports.login = function(req, res) {

	var user = req.user;
	var userID = user.id;

	var findUser = function( cb ){
		User.findById( userID )
			.exec( function( err, user){
				if( err || !user ) return cb( true, err );
				cb( null, user );
			});
	};
	
	async.waterfall([
		findUser
	], function( err , data ){
		if( err ) return next( err );
		res.json(data);
	});

};

/**
 * @api {get} /auth/logout LogOut
 * @apiVersion 0.0.1
 * 
 * @apiName LogOut
 * @apiGroup Auth
 *
 *
 * 
 * @apiSuccessTitle (LogOut200) 200 - Status code
 * @apiSuccess (LogOut200) Status <code>200</code>
 *
 *
 */

exports.logout = function(req, res) {
	//req.session.destroy()
	req.logout();
	res.send();
};


/**
 * @api {get} /auth/session Has Session
 * @apiVersion 0.0.1
 * 
 * @apiName HasSession
 * @apiGroup Auth
 *
 * 
 * @apiSuccessTitle (HasSession200) 200 - Status Code
 * @apiSuccess (HasSession200) Status <code>200</code> Ok
 *
 * 
 * @apiErrorTitle (HasSession401) 401 - Unauthorized
 * @apiError (HasSession401) Status <code>401</code> Unauthorized
 *
 *
 */

exports.hasSession = function(req, res) {
	//console.log('req.isAuthenticated()', req.isAuthenticated())
	//console.log('req.sessionStore', req.sessionStore)
	//console.log('req.sessionID', req.sessionID)
	//console.log('req.session', req.session)
	return ( !req.user ) ? res.status(401).send() : res.status(200).send();
};


exports.user = function(req, res, next, id){
	User
		.findOne({ _id: id })
		.exec(function(err, user) {
			if ( err || !user ) return res.status(400).send();
			req.profile = user;
			next();
		});
};



exports.getProfile = function(req, res){

};