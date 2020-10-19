const path = require('path');
let config = {};
let registry = [];
const _ = require('lodash');

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
				const callee = _path.get('callee');
				const first = args[0];

				if( ! filepath && state.filename ){
					filepath = state.filename;
					if( filepath.startsWith(config.dir.resourcesPlatform)){
						filename = filepath.substring(config.dir.resourcesPlatform.length);
						dirname = path.dirname(filename);
					}
				}

				let targetPath = _path.node.arguments[0];

				if ( t.isIdentifier(callee.node, { name: 'require' }) ) {

					if( dirname ){
						if ( t.isStringLiteral(first)) {
							const originalModulePath = first.node.value;
							if( originalModulePath.startsWith('.')){
								const modifiedModulePath = path.resolve(dirname, originalModulePath);
								targetPath = t.stringLiteral(modifiedModulePath);
							}
						} else if(t.isTemplateLiteral(first)) {

							const originalModulePath = _.get(first, 'node.quasis[0].value.cooked');

							if( _.get(first, 'node.expressions.length' )){
								// Don't do anything here yet...
							} else if( originalModulePath && originalModulePath.startsWith('.') ) {
								const modifiedModulePath = path.resolve(dirname, originalModulePath);
								// Not sure if this is the official way to do this but it seems to work
								targetPath.quasis[0].value.raw = modifiedModulePath;
								targetPath.quasis[0].value.cooked = modifiedModulePath;
							} 
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
