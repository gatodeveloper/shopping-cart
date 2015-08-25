/**
 * Dependecies
 */
var express = require('express'),
	router = express.Router();


/**
 * Controller
 */


var user = require("./controller");


/**
 * Routes
 */

var response = function (req, res, next) {
	console.log( next )
	res.send( res );
}

router.route('/users')
	.post( user.postUser );

router.route('/users/:userID')
	.get( user.getUser )
	.delete( user.deleteUser );

router.route('/users/:userID/profile')
	//.get( user.getProfile )
	//.put( user.putProfile );

router.route('/users/:userID/favorites')
	//.get( user.getFavorites );

router.route('/users/:userID/inbox')
	.get();

router.route('/users/:userID/reservations')
	.get();

router.route('/search/:servicesType')
	.get();

router.route('/personal-services/:personalServiceID')
	.get();

router.route('/personal-services/:personalServiceID/profile')
	.get();

router.route('/personal-services/:personalServiceID/reservation')
	.post();






//router.param('me', user.me);

module.exports = router;