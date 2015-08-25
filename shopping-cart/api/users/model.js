/**
 * Model User
 */


/**
 * Dependencies
 * @type {[type]}
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var u = require("../utils");

var authTypes = ['twitter', 'facebook'];
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var FavoriteSchema = new Schema({});
var FundsSchema = new Schema({});
var ReservationsSchema = new Schema({});
var SessionSchema = new Schema({});

var deviceSchema = new Schema({
		model: { type: String }
	,	platform: { type: String }
	,	uuid: { type: String }
	,	token: { type: String }
	,	version: { type: String }
	,	__v: {select: false}
});

var UserSchema = new Schema({
		name : { type: String }
	,	username : { type: String }
	,	email : { type: String, required: true, unique: true, /*validate: _validate().email */}
	,	hashed_password : { type: String }
	,	forgotten_password_code : { type: String }
	,	forgotten_password_time : { type: String }
	,	remember_code : { type: String}
	,	last_login : { type: Date, default: Date.now }
	,	status : { type: String , default: 'validate' }
	,	created : { type: Date, default: Date.now }
	,	favorites: [ FavoriteSchema ]
	,	funds: [ FundsSchema ]
	,	reservations: [ ReservationsSchema ]
	,	provider: String
	,	devices: [ deviceSchema ]
	,	salt: String
	,	facebook: { type: Object }
	,	twitter: { type: Object }
	,	google: { type: Object }
	,	_account: { type: ObjectId, ref: 'Profile' }
});

var CodeActivationSchema = new Schema({
		code: { type: String, unique: true }
	,	_user: { type: ObjectId, ref: 'User' }
	,	createdAt: { type: Date, expires: '.01h' }
	,	__v: {select: false}
});

var CodeRecoveryPasswordSchema = new Schema({
		code: { type: String, unique: true }
	,	token: { type: String }
	,	_user: { type: ObjectId, ref: 'User' }
	,	createdAt: { type: Date, expires: '.01h' }
	,	__v: {select: false}
});

CodeActivationSchema.pre('save', function( next ){
	var self = this;
	var UserID = self.id;
	var code = u.genCodeHex();
	var	CodeActivationParams = {_user: UserID,	code: code };
	codeActivation = new CodeActivation( CodeActivationParams )
	next();
});


/**
 * Virtuals
 */

var virtual = UserSchema.virtual('password');

virtual.set( function(password) {
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password);
}).get(function() {
	return this._password;
});

/**
 * Validations
 */

var validatePresenceOf = function(value) {
	return value && value.length;
};


// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function(name) {
	// if you are authenticating by any of the oauth strategies, don't validate
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
	// if you are authenticating by any of the oauth strategies, don't validate
	if (authTypes.indexOf(this.provider) !== -1) return true;
	if (!email) return false;
	return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function(username) {
	// if you are authenticating by any of the oauth strategies, don't validate
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
	// if you are authenticating by any of the oauth strategies, don't validate
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return hashed_password.length;
}, 'Password cannot be blank');



/**
 * Pre-save hook
 */

UserSchema.pre('save', function( next ) {
	if (!this.isNew) return next();
	if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
		next(new Error('Invalid password'));
	else
		next();
});



/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';

        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};



var User = mongoose.model('User', UserSchema);
var CodeActivation = mongoose.model('CodeActivation', CodeActivationSchema);
var CodeRecoveryPassword = mongoose.model('CodeRecoveryPassword', CodeRecoveryPasswordSchema);
var Session = mongoose.model('Session', SessionSchema);
