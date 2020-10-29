const path = require('path');
let config = {};
let file_registry = [];
let package_registry = [];
const _ = require('lodash');
const logger = console;
// const require_regex = /^((?:@[^/]*\/[^/\n\r]*)|(?:[^/\n\r]*))/g;
const require_regex = /^((?:@[^/]*\/[^/\n\r]*)|(?:[^/\n\r]*))(.*)/;

const findModuleFile = ({ original, directory, extra }) => {

	// logger.debug(`🦠  original: ${JSON.stringify(original, null, 2)}`);
	// logger.debug(`🦠  directory: ${JSON.stringify(directory, null, 2)}`);
	// logger.debug(`🦠  extra: ${JSON.stringify(extra, null, 2)}`);

	if( ! file_registry ){
		return original;
	}

	let module_file = path.join(directory, extra);
	// logger.debug(`🦠  module_file: ${JSON.stringify(module_file, null, 2)}`);
	if( file_registry.includes(module_file) ){
		return module_file;
	}
	module_file = `${module_file}.js`;
	// logger.debug(`🦠  module_file: ${JSON.stringify(module_file, null, 2)}`);
	if( file_registry.includes(module_file) ){
		return module_file;
	}
	module_file = `${module_file}.json`;
	// logger.debug(`🦠  module_file: ${JSON.stringify(module_file, null, 2)}`);
	if( file_registry.includes(module_file) ){
		return module_file;
	}

	return original;


}

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
			// logger.debug(`🦠  filepath: ${JSON.stringify(filepath, null, 2)}`);
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
							// logger.debug(`🦠  originalModulePath: ${JSON.stringify(originalModulePath, null, 2)}`);
							if( originalModulePath.startsWith('.')){
								if( dirname ){
									const modifiedModulePath = path.resolve(dirname, originalModulePath);
									targetPath = t.stringLiteral(modifiedModulePath);									
								}

							} else if( !originalModulePath.startsWith('/') ){
								// const matches = originalModulePath.match(require_regex);
								const matches = require_regex.exec(originalModulePath);
								if( _.isArray(matches) ){
									// logger.debug(`🦠  matches: ${JSON.stringify(matches, null, 2)}`);
									const module_name = matches[1];
									const extra = matches[2];

										let package_entry = _.find(package_registry, { alias: module_name });
										if( package_entry ){
											// logger.debug(`🦠  package_entry: ${JSON.stringify(package_entry, null, 2)}`);
											if( package_entry.main && !extra.length){
													targetPath = t.stringLiteral(package_entry.main);
											} else if( extra.length ){
												targetPath = t.stringLiteral(findModuleFile({ original: originalModulePath, directory: package_entry.directory, extra }));
											}
										} else {
											package_entry = _.find(package_registry, { name: module_name });
											// logger.debug(`🦠  package_entry: ${JSON.stringify(package_entry, null, 2)}`);
											if( package_entry ){
												if( package_entry.main && !extra.length){
													targetPath = t.stringLiteral(package_entry.main);
												} else if( extra.length ){
													targetPath = t.stringLiteral(findModuleFile({ original: originalModulePath, directory: package_entry.directory, extra }));
												}
											}
									
										}												
												
								}
							}
						} else if(t.isTemplateLiteral(first)) {

							const originalModulePath = _.get(first, 'node.quasis[0].value.cooked');
							// logger.debug(`🦠  originalModulePath: ${JSON.stringify(originalModulePath, null, 2)}`);
							if( _.get(first, 'node.expressions.length' )){
								// Don't do anything here yet...
							} else if( originalModulePath ) {
								if( originalModulePath.startsWith('.') ) {
									if( dirname ){
										const modifiedModulePath = path.resolve(dirname, originalModulePath);
										// Not sure if this is the official way to do this but it seems to work
										targetPath.quasis[0].value.raw = modifiedModulePath;
										targetPath.quasis[0].value.cooked = modifiedModulePath;									
									}

								} else if( !originalModulePath.startsWith('/') ){
									// const module_name = originalModulePath.match(require_regex);
									const matches = require_regex.exec(originalModulePath);
									if( _.isArray(matches) ){
										// logger.debug(`🦠  matches: ${JSON.stringify(matches, null, 2)}`);
										const module_name = matches[1];
										const extra = matches[2];

										let package_entry = _.find(package_registry, { alias: module_name });
										if( package_entry ){
											// logger.debug(`🦠  package_entry: ${JSON.stringify(package_entry, null, 2)}`);
											if( package_entry.main && !extra.length){
												// Not sure if this is the official way to do this but it seems to work
												targetPath.quasis[0].value.raw = package_entry.main;
												targetPath.quasis[0].value.cooked = package_entry.main;
											} else if( extra.length ){
												const main = findModuleFile({ original: originalModulePath, directory: package_entry.directory, extra });
												// logger.debug(`🦠  main: ${JSON.stringify(main, null, 2)}`);
												targetPath.quasis[0].value.raw = main;
												targetPath.quasis[0].value.cooked = main;
											}
										} else {

											package_entry = _.find(package_registry, { name: module_name });
											// logger.debug(`🦠  package_entry: ${JSON.stringify(package_entry, null, 2)}`);
											if( package_entry ){
												if( package_entry.main && !extra.length){
													// Not sure if this is the official way to do this but it seems to work
													targetPath.quasis[0].value.raw = package_entry.main;
													targetPath.quasis[0].value.cooked = package_entry.main;
												} else if( extra.length ){
													const main = findModuleFile({ original: originalModulePath, directory: package_entry.directory, extra });
													// logger.debug(`🦠  main: ${JSON.stringify(main, null, 2)}`);
													targetPath.quasis[0].value.raw = main;
													targetPath.quasis[0].value.cooked = main;
												}
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
