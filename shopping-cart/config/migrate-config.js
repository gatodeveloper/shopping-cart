var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

db = mongoose.createConnection('mongodb://localhost/shopping-cart-dev');

var models_path = path.resolve(__dirname, '../api');

fs.readdirSync(models_path).forEach(function( folder ) {
	var file = 'model.js',
		modelFile = models_path + '/' + folder + '/' + file;
	if ( fs.existsSync( modelFile ) ){	
		require( modelFile )
	};
});