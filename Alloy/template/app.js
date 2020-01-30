/**
 * Alloy for Titanium by Appcelerator
 * This is generated code, DO NOT MODIFY - changes will be lost!
 * Copyright (c) 2012 by Appcelerator, Inc.
 */
var Alloy = require('/alloy');
var _ = Alloy._;
var Backbone = Alloy.Backbone;
var turbo = require('/turbo');

Ti.UI.VISIBILITY_COLLAPSE = 'collapse';	
Ti.UI.VISIBILITY_HIDDEN = 'hidden';	
Ti.UI.VISIBILITY_VISIBLE = 'visible';	

Ti.UI.createStackLayout = (params = {}) => {
	const orientation = params.orientation || params.layout || 'vertical';
	params.layout = params.orientation = orientation;
	_.defaults(params, {
		height: 'size',
	});
	const view = Ti.UI.createView( params );
	return view;
}

Ti.UI.createVerticalLayout =  (params = {})  => {
	params.layout = params.orientation = 'vertical';
	_.defaults(params, {
		height: 'size',
	});
	const view = Ti.UI.createView( params );
	return view;
}

Ti.UI.createHorizontalLayout =  (params = {})  => {
	params.layout = params.orientation = 'horizontal';
	_.defaults(params, {
		height: 'size',
	});
	const view = Ti.UI.createView( params );
	return view;
}

Ti.UI.createAbsoluteLayout = (params = {}) => {
	params.layout = params.orientation = 'composite';
	const view = Ti.UI.createView( params );
	return view;
}

const createImageView = Ti.UI.createImageView;
Ti.UI.createImageView = (params = {}) => {
	params.image = params.image || params.src;
	const view = createImageView( params );
	return view;
}

__MAPMARKER_ALLOY_JS__
// }

Alloy.main = Alloy.main || Alloy.CFG.main || Titanium.App.Properties.getString('app.main','index');
Alloy.open(Alloy.main);

