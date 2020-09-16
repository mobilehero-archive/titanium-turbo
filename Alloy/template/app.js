/**
 * Turbo for Titanium (Maintained by Axway Development Community)
 * Alloy for Titanium - Copyright (c) 2020 by Axway, Inc.
 * This is generated code, DO NOT MODIFY - changes will be lost!
 */

var turbo = global.turbo = require('/turbo');
var Alloy = global.Alloy = require('/alloy');
var Backbone = global.Backbone = Alloy.Backbone;
var _ = global._ = Alloy._;

Ti.UI.VISIBILITY_COLLAPSE = 'collapse';	
Ti.UI.VISIBILITY_HIDDEN = 'hidden';	
Ti.UI.VISIBILITY_VISIBLE = 'visible';	

Alloy.main = Alloy.main || Alloy.CFG.main || Titanium.App.Properties.getString('app.main','index');

__MAPMARKER_ALLOY_JS__

const initMainController = () => {
	if( Alloy.BYPASS_AUTO_OPEN ){
		Alloy.createController(Alloy.main);
	} else if( ! Alloy.MANUAL_OPEN ){
		Alloy.open(Alloy.main);
	} else {
		console.warn('You must manually open main controller')
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
