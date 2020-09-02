const path = require('path');
let config = {};
let registry = [];

module.exports = ({ types: t }) => {

	let filepath;
	let filename;
	let dirname;

	return {
		name: 'fix-require',
		pre: function(file) {
			config = this.opts || {};
			registry = require(path.join(config.dir.resourcesPlatform, '__file_registry.json' ));
			filepath = file.opts.filename;
			if( filepath.startsWith(config.dir.resourcesPlatform)){
				filename = filepath.substring(config.dir.resourcesPlatform.length);
				dirname = path.dirname(filename);
			}

		},
		visitor: {
			CallExpression: (_path, state) => {
				const args = _path.get('arguments');
				const callee = _path.get('callee')
				let targetPath = _path.node.arguments[0];
				if ( t.isIdentifier(callee.node, { name: 'require' }) ) {

					if (dirname && t.isStringLiteral(args[0])) {
						const originalModulePath = args[0].node.value;
						if( originalModulePath.startsWith('.')){
							const modifiedModulePath = path.resolve(dirname, originalModulePath);
							targetPath = t.stringLiteral(modifiedModulePath);
						}
					}
					_path.replaceWith(
						t.callExpression(callee.node, [
							targetPath,
							t.identifier('__dirname')
						])
					);
					_path.skip();
				}
			}
		}
	};
};
