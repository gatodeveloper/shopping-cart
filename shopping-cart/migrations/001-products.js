var migrate_config = require('../config/migrate-config');
exports.up = function(next){

  var Products = db.model('Products');

	var productDefault1 = {
				title: 'Product Title 1'
			,	description: 'Product Description 1'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault2 = {
				title: 'Product Title 2'
			,	description: 'Product Description 2'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault3 = {
				title: 'Product Title 3'
			,	description: 'Product Description 3'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault4 = {
				title: 'Product Title 4'
			,	description: 'Product Description 4'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault5 = {
				title: 'Product Title 5'
			,	description: 'Product Description 5'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault6 = {
				title: 'Product Title 6'
			,	description: 'Product Description 6'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault7 = {
				title: 'Product Title 7'
			,	description: 'Product Description 7'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault8 = {
				title: 'Product Title 8'
			,	description: 'Product Description 8'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault9 = {
				title: 'Product Title 9'
			,	description: 'Product Description 9'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault10 = {
				title: 'Product Title 10'
			,	description: 'Product Description 10'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault11 = {
				title: 'Product Title 11'
			,	description: 'Product Description 11'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault12 = {
				title: 'Product Title 12'
			,	description: 'Product Description 12'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault13 = {
				title: 'Product Title 13'
			,	description: 'Product Description 13'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault14 = {
				title: 'Product Title 14'
			,	description: 'Product Description 14'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault15 = {
				title: 'Product Title 15'
			,	description: 'Product Description 15'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault16 = {
				title: 'Product Title 16'
			,	description: 'Product Description 16'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault17 = {
				title: 'Product Title 17'
			,	description: 'Product Description 17'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault18 = {
				title: 'Product Title 18'
			,	description: 'Product Description 18'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault19 = {
				title: 'Product Title 19'
			,	description: 'Product Description 19'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault20 = {
				title: 'Product Title 20'
			,	description: 'Product Description 20'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault21 = {
				title: 'Product Title 21'
			,	description: 'Product Description 21'
			,	price: 400
			,	stockAmount: 100
		},
		productDefault22 = {
				title: 'Product Title 22'
			,	description: 'Product Description 22'
			,	price: 400
			,	stockAmount: 100
		},


	AccountType.create( 
		productDefault1,
		productDefault2,
		productDefault3,
		productDefault4,
		productDefault5,
		productDefault6,
		productDefault7,
		productDefault8,
		productDefault9,
		productDefault10,
		productDefault11,
		productDefault12,
		productDefault13,
		productDefault14,
		productDefault15,
		productDefault16,
		productDefault17,
		productDefault18,
		productDefault19,
		productDefault20,
		productDefault21,
		productDefault22,
		function(err){ 
			next();
		}
	);
};

exports.down = function(next){
  next();
};
