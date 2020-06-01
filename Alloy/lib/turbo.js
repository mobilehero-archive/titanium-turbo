const { observable } = require('@titanium/observer');
const _turbo = { 
	data: {},
	globals: {},
	fonts: {},
	colors: {},
	api: {},
	DEBUG_MODE: false,
	TRACE_MODE: false,
	VERBOSE_MODE: false,
	DEBUG_UI: false,
};

_turbo.debug = (...args) => {
	_turbo.DEBUG_MODE && console.debug(...args);
};

_turbo.trace = (...args) => {
	_turbo.TRACE_MODE && console.debug(...args);
};

_turbo.verbose = (...args) => {
	_turbo.VERBOSE_MODE && console.debug(...args);
};


_turbo.createStackLayout = (params = {}) => {
	const orientation = params.orientation || params.layout || 'vertical';
	params.layout = params.orientation = orientation;
	_.defaults(params, {
		height: 'size',
	});
	const view = _turbo.createView( params );
	return view;
};

_turbo.createAbsoluteLayout =  (params = {})  => {
	params.layout = params.orientation = 'composite';
	_.defaults(params, {
		height: 'size',
	});
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI) {
		params.backgroundColor = params.debugColor;
	}
	const view = Ti.UI.createView( params );
	return view;
};

_turbo.createVerticalLayout =  (params = {})  => {
	params.layout = params.orientation = 'vertical';
	_.defaults(params, {
		height: 'size',
	});
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	const view = _turbo.createView( params );
	return view;
};

_turbo.createHorizontalLayout =  (params = {})  => {
	params.layout = params.orientation = 'horizontal';
	_.defaults(params, {
		height: 'size',
	});
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	const view = _turbo.createView( params );
	return view;
};

_turbo.createImageView = (params = {}) => {
	params.image = params.image || params.src;
	const view = Ti.UI.createImageView( params );
	return view;
};

_turbo.createLabel =  (params = {})  => {
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	const view = Ti.UI.createLabel( params );
	return view;
};

_turbo.createView =  (params = {})  => {
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	const view = Ti.UI.createView( params );
	return view;
};

_turbo.createWindow =  (params = {})  => {
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	// if ( OS_ANDROID ) {
	// 	delete params.largeTitleEnabled;
	// 	delete params.largeTitleDisplayMode;
	// }
	const view = Ti.UI.createWindow( params );
	return view;
};

_turbo.KEYBOARD_TYPES = {
	ascii: Ti.UI.KEYBOARD_TYPE_ASCII,  // 0
	numbers_punctuation: Ti.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION,  // 1
	url: Ti.UI.KEYBOARD_TYPE_URL,  // 2
	number: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,  // 3
	phone: Ti.UI.KEYBOARD_TYPE_PHONE_PAD,  // 4
	email: Ti.UI.KEYBOARD_TYPE_EMAIL,  // 5
	name_phone: Ti.UI.KEYBOARD_TYPE_NAMEPHONE_PAD,  // 6
	default: Ti.UI.KEYBOARD_TYPE_DEFAULT,  // 7
	decimal: Ti.UI.KEYBOARD_TYPE_DECIMAL_PAD,  // 8
};

_turbo.AUTOCAPITALIZATION_TYPES = {
	none: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,  // 0
	sentences: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,  // 1
	words: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,  // 2
	all: Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,  // 3
};

_turbo.AUTOFILL_TYPES = {
	address: Ti.UI.AUTOFILL_TYPE_ADDRESS, 
	phone: Ti.UI.AUTOFILL_TYPE_PHONE,  
	name: Ti.UI.AUTOFILL_TYPE_NAME,  
	cc_year: Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_YEAR,  
	cc_month: Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_MONTH,  
	username: Ti.UI.AUTOFILL_TYPE_USERNAME,  
	postal_code: Ti.UI.AUTOFILL_TYPE_POSTAL_CODE,  
	cc_day: Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_DAY,  
	cc_date: Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_DATE,  
	password: Ti.UI.AUTOFILL_TYPE_PASSWORD,  
	cc_code: Ti.UI.AUTOFILL_TYPE_CARD_SECURITY_CODE,  
	cc_number: Ti.UI.AUTOFILL_TYPE_CARD_NUMBER,  
	email: Ti.UI.AUTOFILL_TYPE_EMAIL,  
};

_turbo.createTextField =  (params = {})  => {
	if ( params.debugColor && _turbo.DEBUG_MODE && _turbo.DEBUG_UI ) {
		params.backgroundColor = params.debugColor;
	}
	
	if ( ! _.isNil(params.keyboardType)) {
		params.keyboardType = _.get(_turbo.KEYBOARD_TYPES, params.keyboardType, params.keyboardType);
	}

	if ( ! _.isNil(params.autocapitalization)) {
		params.autocapitalization = _.get(_turbo.AUTOCAPITALIZATION_TYPES, params.autocapitalization, params.autocapitalization);
	}

	if ( ! _.isNil(params.autofillType)) {
		params.autofillType = _.get(_turbo.AUTOFILL_TYPES, params.autofillType, params.autofillType);
	}

	const view = Ti.UI.createTextField( params );
	return view;
};

_turbo.createIcon =  (params = {})  => {
	params.font = params.font || {};
	const heightInt = _.toInteger(params.height);
	params.font.fontSize = params.size || params.font.size || params.font.fontSize || ((heightInt > 0) ? heightInt : undefined);
	if ( params.type ) {
		params.font.fontFamily = 'FontAwesome-' + _.capitalize(params.type);
	}

	params.font.fontFamily = params.font.fontFamily || 'FontAwesome-Regular';
	params.text = _.get(turbo, ['fonts', params.font.fontFamily, params.name], '');
	params.textAlign = params.textAlign || Ti.UI.TEXT_ALIGNMENT_CENTER;

	delete params.type;
	delete params.size;

	const view = Ti.UI.createLabel( params );
	return view;
};

_turbo.createInput =  (params = {})  => {
	const view = _turbo.createTextField( params );
	return view;
};

module.exports = observable(_turbo);
// module.exports = _turbo;