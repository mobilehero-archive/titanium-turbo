const U = require('../../../utils');
const CU = require('../compilerUtils');
const _ = require('lodash');

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	if (!state.itemsArray) {
		U.die('Invalid use of <ButtonName>. Must be the child of <ButtonNames>.');
	}

	var nodeText = U.trim(U.XML.getNodeText(node) || '');
	var returnCode = '';

	if (U.isLocaleAlias(nodeText)) {
		returnCode = '.push(' + nodeText + ')';
	} else {
		returnCode = '.push("' + nodeText.replace(/"/g, '\\"') + '")';
	}

	const codePush = state.itemsArray + returnCode;

	let code = codePush;

	const attrName = _.findKey(state.extraOptions, (varName, name) => args.createArgs[name] !== undefined);
	const attrVarName = state.extraOptions[attrName];


	if (attrName) {
		if (args.createArgs[attrName]) {
			code = `${attrVarName} = ${codePush} - 1`;
			// code = `${attrVarName} = ${codePush}`;
		} else {
			code = `${attrVarName} = undefined; ${codePush}`;
		}
	}


	return {
		parent: {},
		styles: state.styles,
		code: `${code};`,
	};
}
