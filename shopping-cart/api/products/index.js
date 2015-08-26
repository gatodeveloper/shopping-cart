/**
 * Dependecies
 */
var express = require('express'),
	router = express.Router();


/**
 * Controller
 */


var productsCtrl = require("./controller");


/**
 * Routes
 */


router.route('/products')
	.post( productsCtrl.postProduct )
	.get( productsCtrl.getProducts );


router.route('/cart')
	//.get( productsCtrl.getProductsCart );

router.route('/cart/:userId')
	.post( productsCtrl.postProductCart )
	.get( productsCtrl.getProductsCart )

router.route('/cart/:userId/products/:productId')
	.delete( productsCtrl.deleteProductsCart );




module.exports = router;