const path = require('path');
let config = {};
let file_registry = [];
let package_registry = [];
const _ = require('lodash');
const logger = console;

module.exports = ({ types: t }) => {

	let filepath;
	let filename;
	let dirname;

	return {
		name: 'fix-require',
		pre: function(file) {
			config = this.opts || {};
			try{
				file_registry = require(path.join(config.dir.resourcesPlatform, '__file_registry.json' ));
			} catch(error){}
			package_registry = require(path.join(config.dir.resourcesPlatform, '__package_registry.json' ));
			filepath = file.opts.filename;
			if( filepath && filepath.startsWith(config.dir.resourcesPlatform)){
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

					// if( dirname ){
						if ( t.isStringLiteral(first)) {
							const originalModulePath = first.node.value;
							if( dirname && originalModulePath.startsWith('.')){
								const modifiedModulePath = path.resolve(dirname, originalModulePath);
								targetPath = t.stringLiteral(modifiedModulePath);
							} else if( !originalModulePath.startsWith('/') ){
								const module_name = originalModulePath.match(/^((?:@[^/]*\/[^/\n\r]*)|(?:[^/\n\r]*))/g);
								if( _.isArray(module_name) && module_name.length ){
									// logger.debug(`🦠  module_name[0]: ${JSON.stringify(module_name[0], null, 2)}`);
									let package_entry = _.find(package_registry, { alias: module_name[0] });
									if( package_entry && package_entry.main){
										// logger.debug(`🦠  package_entry: ${JSON.stringify(package_entry, null, 2)}`);
										targetPath = t.stringLiteral(package_entry.main);
									} else {
										package_entry = _.find(package_registry, { name: module_name[0] });
										if( package_entry && package_entry.main){
											targetPath = t.stringLiteral(package_entry.main);
										}
									}									
								}
							}
						} else if(t.isTemplateLiteral(first)) {

							const originalModulePath = _.get(first, 'node.quasis[0].value.cooked');

							if( _.get(first, 'node.expressions.length' )){
								// Don't do anything here yet...
							} else if( originalModulePath ) {
								if( dirname && originalModulePath.startsWith('.') ) {
									const modifiedModulePath = path.resolve(dirname, originalModulePath);
									// Not sure if this is the official way to do this but it seems to work
									targetPath.quasis[0].value.raw = modifiedModulePath;
									targetPath.quasis[0].value.cooked = modifiedModulePath;
								} else if( !originalModulePath.startsWith('/') ){
									const module_name = originalModulePath.match(/^((?:@[^/]*\/[^/\n\r]*)|(?:[^/\n\r]*))/g);
									if( _.isArray(module_name) && module_name.length ){
										let package_entry = _.find(package_registry, { alias: module_name[0] });
										if( package_entry && package_entry.main){
											// Not sure if this is the official way to do this but it seems to work
											targetPath.quasis[0].value.raw = package_entry.main;
											targetPath.quasis[0].value.cooked = package_entry.main;
										} else {
											package_entry = _.find(package_registry, { name: module_name[0] });
											if( package_entry && package_entry.main){
												// Not sure if this is the official way to do this but it seems to work
												targetPath.quasis[0].value.raw = package_entry.main;
												targetPath.quasis[0].value.cooked = package_entry.main;
											} 	
										}		
									}
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
