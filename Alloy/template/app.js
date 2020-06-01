/**
 * Alloy for Titanium by Appcelerator
 * This is generated code, DO NOT MODIFY - changes will be lost!
 * Copyright (c) 2012 by Appcelerator, Inc.
 */
var Alloy = require('/alloy');
var _ = Alloy._;
var Backbone = Alloy.Backbone;
var turbo = require('/turbo');

global.Alloy = Alloy;
global._ = _;
global.Backbone = Backbone;
global.turbo = turbo;

Ti.UI.VISIBILITY_COLLAPSE = 'collapse';	
Ti.UI.VISIBILITY_HIDDEN = 'hidden';	
Ti.UI.VISIBILITY_VISIBLE = 'visible';	

__MAPMARKER_ALLOY_JS__
// }

Alloy.main = Alloy.main || Alloy.CFG.main || Titanium.App.Properties.getString('app.main','index');
// 
if( Alloy.BYPASS_AUTO_OPEN ){
	Alloy.createController(Alloy.main);
} else {
	Alloy.open(Alloy.main);
}


