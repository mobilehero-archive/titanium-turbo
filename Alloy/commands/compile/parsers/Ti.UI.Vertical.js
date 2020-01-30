exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {

	node.nodeName = 'VerticalLayout';

	// Generate runtime code using default
	return require('./default').parse(node, state);
}
