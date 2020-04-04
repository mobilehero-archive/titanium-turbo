var CU = require('../compilerUtils');
var styler = require('../styler');
var U = require('../../../utils');
var fs = require('fs-extra');
var path = require('path');

exports.parse = function(node, state) {
	var args = CU.getParserArgs(node, state);
	var compilerConfig = CU.getCompilerConfig();

	function getSourceCode(src) {
		if ( src) {

			const basePath = path.isAbsolute(src) ?  compilerConfig.dir.resourcesPlatform : path.dirname(state.filepath);

			const sourcePath = path.join(basePath, src);
			if (fs.existsSync(sourcePath)) {
				return fs.readFileSync(sourcePath, 'utf8');
			} 
		}	
	}

	let addedStyles;

	// get code from any external source
	const fileStylesheet = getSourceCode(args.createArgs.src);

	if ( fileStylesheet ) {
		addedStyles = styler.loadAndSortStyle(fileStylesheet, {
			existingStyle: state.styles,
		}, true);
	}

	// get code from text node
	const stylesheet = U.XML.getNodeText(node) || '';

	addedStyles = styler.loadAndSortStyle(stylesheet, {
		existingStyle: addedStyles || state.styles,
	}, true);

	return {
		addedStyles,
		code: '',
	};
};
