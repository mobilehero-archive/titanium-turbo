/**
 * Alloy for Titanium by Appcelerator
 * This is generated code, DO NOT MODIFY - changes will be lost!
 * Copyright (c) 2012 by Appcelerator, Inc.
 */
var Alloy = require('/alloy');
var _ = Alloy._;
var Backbone = Alloy.Backbone;
var turbo = require('/turbo');
const JSONC = require('@titanium/jsonc');

global.Alloy = Alloy;
global._ = _;
global.Backbone = Backbone;
global.turbo = turbo;
global.JSONC = JSONC;

Ti.UI.VISIBILITY_COLLAPSE = 'collapse';	
Ti.UI.VISIBILITY_HIDDEN = 'hidden';	
Ti.UI.VISIBILITY_VISIBLE = 'visible';	

__MAPMARKER_ALLOY_JS__


Alloy.main = Alloy.main || Alloy.CFG.main || Titanium.App.Properties.getString('app.main','index');

const initMainController = () => {
	if( Alloy.BYPASS_AUTO_OPEN ){
		Alloy.createController(Alloy.main);
	} else {
		Alloy.open(Alloy.main);
	}
}

// Open root window if a new UI session has started. Can happen more than once in app's lifetime.
// Event can only be fired if "tiapp.xml" property "run-in-background" is set true.
Ti.UI.addEventListener('sessionbegin', () => initMainController);

// Open the root window immediately if an active UI session exists on startup.
// Note: The Ti.UI.hasSession property was added as of Titanium 9.1.0.
if ((typeof Ti.UI.hasSession === 'undefined') || Ti.UI.hasSession) {
	initMainController();
}
