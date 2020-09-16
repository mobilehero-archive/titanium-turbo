var CU = require('../compilerUtils');
var U = require('../../../utils');
var fs = require('fs-extra');
var path = require('path');

exports.parse = function(node, state) {
	var args = CU.getParserArgs(node, state);
	var compilerConfig = CU.getCompilerConfig();
	var code = '';

	function getSourceCode(src) {
		if ( src ) {
			const sourcePath = path.join(compilerConfig.dir.resourcesPlatform, src);
			if (fs.existsSync(sourcePath)) {
				return fs.readFileSync(sourcePath, 'utf8');
			} 
		}	
	}

	const isStatic = !!args.createArgs.static;

	// get code from any external source
	code += getSourceCode(args.createArgs.src) || '';

	// get code from text node
	code += U.XML.getNodeText(node) || '';

	if( isStatic ){
		return {
			staticCode: code.trim() + '\n\n',
			code: '',
		};
	} else {
		return {
			code: code.trim() + '\n\n',
			staticCode: '',
		};
	}

};
