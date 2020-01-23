var _ = require('lodash'),
	styler = require('../styler'),
	CU = require('../compilerUtils'),
	U = require('../../../utils');

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	let code = '';

	node.nodeName = 'View';		
	node.setAttribute('layout', 'composite');

	var nodeState = require('./default').parse(node, state);
	code += nodeState.code;

	// Generate runtime code using default
	return _.extend(nodeState, {
		code: code
	});
}
