/**
 * Turbo for Titanium (Maintained by Axway Development Community)
 * Alloy for Titanium - Copyright (c) 2020 by Axway, Inc.
 * This is generated code, DO NOT MODIFY - changes will be lost!
 */
console.info(`🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩  Starting Turbo Engine 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 `);
var Alloy = global.Alloy = require('/alloy');
var _ = global._ = Alloy._;

console.info('----------------------------------------------------------------------');
console.info(`| ID:              ${_.padEnd(Ti.App.id, 50)}|`);
console.info(`| Name:            ${_.padEnd(Ti.App.name, 50)}|`);
console.info(`| App Version:     ${_.padEnd(Ti.App.version, 50)}|`);
console.info(`| SDK Version:     ${_.padEnd(Ti.version, 50)}|`);
console.info(`| Turbo Version:   ${_.padEnd(Alloy.version, 50)}|`);
console.info(`| Deployment Type: ${_.padEnd(Ti.App.deployType, 50)}|`);
console.info('----------------------------------------------------------------------');


var turbo = global.turbo = require('/turbo');
var Backbone = global.Backbone = Alloy.Backbone;


Ti.UI.VISIBILITY_COLLAPSE = 'collapse';	
Ti.UI.VISIBILITY_EXPAND = 'expand';	
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
