var _ = require('lodash'),
	styler = require('../styler'),
	U = require('../../../utils'),
	CU = require('../compilerUtils');

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	var children = U.XML.getElementsFromNodes(node.childNodes),
		code = '',
		extras = [],
		proxyProperties = {};

	_.each(children, function(child, key) {
		//TODO: Figure out why child name has not been converted yet
		if (['RefreshControl', 'refresh-control', 'refreshControl', 'refresh_control'].includes(child.nodeName)) {
			const generated_code = CU.generateNodeExtended(child, state, {
				parent: { },
				post: function(node, state, args) {
					proxyProperties.refreshControl = state.parent.symbol;
				}
			});

			if(typeof generated_code === 'object'){
				code += generated_code.content;
			} else {
				code += generated_code;
			}
			
			child.nodeType = null;
		}
	});

	// add all proxy properties at creation time
	_.each(proxyProperties, function(v, k) {
		extras.push([k, v]);
	});

	// if we got any extras, add them to the state
	if (extras.length) { state.extraStyle = styler.createVariableStyle(extras); }

	scrollViewState = require('./default').parse(node, state);
	scrollViewState.code = code + scrollViewState.code;

	return scrollViewState;
}
