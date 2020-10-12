var CU = require('../compilerUtils'),
	U = require('../../../utils'),
	styler = require('../styler'),
	CONST = require('../../../common/constants'),
	_ = require('lodash'),
	tiapp = require('../../../tiapp'),
	platform = CU.getCompilerConfig().alloyConfig.platform;

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	var fullname = CU.getNodeFullname(node),
		parts = fullname.split('.'),
		extras = [];

	if (node.previewContext) {
		extras.push(['previewContext', node.previewContext]);
	}

	if (CU[CONST.DOCROOT_MODULE_PROPERTY] && !node.hasAttribute('module')) {
		node.setAttribute('module', CU[CONST.DOCROOT_MODULE_PROPERTY]);
	}
	// is this just a proxy property?
	if (parts[0] === '_ProxyProperty') {
		return require('./_ProxyProperty.' + parts[1]).parse(node, state);
	}

	// special handling for touchEnabled per ALOY-911
	if (node.hasAttribute('touchEnabled')) {
		var attr = node.getAttribute('touchEnabled');
		extras.push(['touchEnabled', attr === 'true']);
	}

	if (extras.length) {
		state.extraStyle = state.extraStyle || {};
		state.extraStyle = _.extend(state.extraStyle, styler.createVariableStyle(extras));
	}

	// start assembling a basic view creation
	var createFunc = 'create' + node.nodeName,
		isCollectionBound = args[CONST.BIND_COLLECTION] ? true : false,
		code = '';
	if (node.nodeName === 'Annotation' && ( (platform == 'ios' && tiapp.version.gte('3.2.0')) || platform == 'android' && tiapp.version.gte('3.1.0'))) {
		// ALOY-800: on iOS & Android, using the external ti.map module, set the
		// namespace so that the ti.map module's createAnnotation() method is used
		args.ns = 'require("ti.map")';
	}

	// make symbol a local variable if necessary
	if (state.local) {
		args.symbol = CU.generateUniqueId();
	}

	if (node.nodeName === 'Window') {
	// find any font attributes and create proper font object
		if (args.createArgs && (args.createArgs.fontSize || args.createArgs.fontStyle || args.createArgs.fontFamily || args.createArgs.fontWeight || args.createArgs.textStyle || args.createArgs.titleColor )) {
			args.createArgs.titleAttributes = args.createArgs.titleAttributes || {};
			args.createArgs.titleAttributes.font = args.createArgs.titleAttributes.font || {};
			_.defaults(args.createArgs.titleAttributes, {
				font: {
					fontSize: args.createArgs.titleAttributes.font.fontSize || args.createArgs.fontSize,
					fontStyle: args.createArgs.titleAttributes.font.fontStyle || args.createArgs.fontStyle,
					fontFamily: args.createArgs.titleAttributes.font.fontFamily || args.createArgs.fontFamily,
					fontWeight: args.createArgs.titleAttributes.font.fontWeight || args.createArgs.fontWeight,
					textStyle: args.createArgs.titleAttributes.font.textStyle || args.createArgs.textStyle					
				},
				color: args.createArgs.titleAttributes.color || args.createArgs.titleColor,
				//TODO: Add support for shadow as well

			});

			delete args.createArgs['fontSize'];
			delete args.createArgs['fontStyle'];
			delete args.createArgs['fontFamily'];
			delete args.createArgs['fontWeight'];
			delete args.createArgs['textStyle'];
			delete args.createArgs['titleColor'];

			if ( _.isEmpty(args.createArgs.titleAttributes.font)) {
				delete args.createArgs.titleAttributes['font'];
			}
		}	
	} else {
	// find any font attributes and create proper font object
		if (args.createArgs && (args.createArgs.fontSize || args.createArgs.fontStyle || args.createArgs.fontFamily || args.createArgs.fontWeight || args.createArgs.textStyle)) {
			args.createArgs.font = args.createArgs.font || {};
			_.defaults(args.createArgs.font, {
				fontSize: args.createArgs.font.fontSize || args.createArgs.fontSize,
				fontStyle: args.createArgs.font.fontStyle || args.createArgs.fontStyle,
				fontFamily: args.createArgs.font.fontFamily || args.createArgs.fontFamily,
				fontWeight: args.createArgs.font.fontWeight || args.createArgs.fontWeight,
				textStyle: args.createArgs.font.textStyle || args.createArgs.textStyle
			});

			delete args.createArgs['fontSize'];
			delete args.createArgs['fontStyle'];
			delete args.createArgs['fontFamily'];
			delete args.createArgs['fontWeight'];
			delete args.createArgs['textStyle'];
		}		
	}

	if ( args.createArgs && args.createArgs.visibility ) {

		switch ( args.createArgs.visibility ) {
			case CONST.VISIBILITY_COLLAPSE:
				args.createArgs.expandedHeight = args.createArgs.height;
				args.createArgs.expandedWidth = args.createArgs.width;
				args.createArgs.height = 0;
				args.createArgs.width = 0;
				if( args.createArgs.collapseMargins ){
					args.createArgs.expandedTop = args.createArgs.top;
					args.createArgs.expandedRight = args.createArgs.right;
					args.createArgs.expandedBottom = args.createArgs.bottom;
					args.createArgs.expandedLeft = args.createArgs.left;

					if( !_.isNil(args.createArgs.top)){
						args.createArgs.top = 0;
					}
					if( !_.isNil(args.createArgs.right)){
						args.createArgs.right = 0;
					}
					if( !_.isNil(args.createArgs.bottom)){
						args.createArgs.bottom = 0;
					}
					if( !_.isNil(args.createArgs.left)){
						args.createArgs.left = 0;
					}

				}
				args.createArgs.visible = false;
				break;
			case CONST.VISIBILITY_EXPAND:
				args.createArgs.expandedHeight = args.createArgs.height;
				args.createArgs.expandedWidth = args.createArgs.width;
				if( args.createArgs.collapseMargins ){
					args.createArgs.expandedTop = args.createArgs.top;
					args.createArgs.expandedRight = args.createArgs.right;
					args.createArgs.expandedBottom = args.createArgs.bottom;
					args.createArgs.expandedLeft = args.createArgs.left;
				}				
				args.createArgs.visible = true;
				break;				
			case CONST.VISIBILITY_HIDDEN:
				args.createArgs.visible = false;
				break;
			case CONST.VISIBILITY_VISIBLE:
				args.createArgs.visible = true;
				break;
		}
	}

	// Generate runtime code
	if (state.isViewTemplate) {
		var bindId = node.getAttribute('bindId');
		code += (state.local ? 'var ' : '') + args.symbol + '={';
		code += "type:'" + fullname + "',";
		if (bindId) {
			code += "bindId:'" + bindId + "',";
		}

		// apply usual style properties
		var argsObject = {
			properties: styler.generateStyleParams(
				state.styles,
				args.classes,
				args.id,
				fullname,
				_.defaults(state.extraStyle || {}, args.createArgs || {}),
				state
			)
		};

		// add in any events on the ItemTemplate
		if (args.events && args.events.length > 0) {
			argsObject.events = '{' + _.reduce(args.events, function(memo, o) {
				return memo + o.name + ':' + o.value + ',';
			}, '') + '}';
		}

		var children = U.XML.getElementsFromNodes(node.childNodes);
		var childTemplates;
		if (children.length > 0) {
			childTemplates = CU.generateUniqueId();

			code += 'childTemplates: (function() {';
			code += 'var ' + childTemplates + '=[];';

			_.each(children, function(child) {
				const generated_code = CU.generateNodeExtended(child, state, {
					parent: {},
					local: true,
					isViewTemplate: true,
					post: function(node, state, args) {
						return childTemplates + '.push(' + state.item.symbol + ');';
					}
				});

				if(typeof generated_code === 'object'){
					code += generated_code.content;
				} else {
					code += generated_code;
				}

			});

			code += 'return ' + childTemplates + ';';
			code += '})(),';
		}

		// add the additional arguments to the code
		code += _.reduce(argsObject, function(memo, v, k) {
			return memo + k + ':' + v + ',';
		}, '');

		code += '};';
	} else {
		var module = node.getAttribute('module');
		if (module) {
			createFunc = node.getAttribute('method') || createFunc;
			code += (state.local ? 'var ' : '') + args.symbol + ' = ' + '(require("' + module + '").' + createFunc + ' || ' + args.ns + '.' + createFunc + ')(\n';
			code += styler.generateStyleParams(
				state.styles,
				args.classes,
				args.id,
				fullname,
				_.defaults(state.extraStyle || {}, args.createArgs || {}),
				state
			) + '\n';
			code += ');\n';


			delete args.createArgs['module'];
			delete args.createArgs['method'];
		} else {
			code += (state.local ? 'var ' : '') + args.symbol + ' = ' + args.ns + '.' + createFunc + '(\n';
			code += styler.generateStyleParams(
				state.styles,
				args.classes,
				args.id,
				fullname,
				_.defaults(state.extraStyle || {}, args.createArgs || {}),
				state
			) + '\n';
			code += ');\n';
		}

		if (args.parent.symbol) {
			code += args.parent.symbol + '.add(' + args.symbol + ');\n';
		}

		if (isCollectionBound && CU.isNodeForCurrentPlatform(node)) {
			var localModel = args.createArgs.modelName || '__currentModel';
			var dataName = args.createArgs.dataName || '$model';
			var itemCode = '';

			_.each(U.XML.getElementsFromNodes(node.childNodes), function(child) {
				const generated_code = CU.generateNodeExtended(child, state, {
					parent: {
						node: node,
						symbol: args.symbol
					},
					local: true,
					model: localModel,
					dataName: dataName,
				});

				if(typeof generated_code === 'object'){
					itemCode += generated_code.content;
				} else {
					itemCode += generated_code;
				}

			});

			var pre = 'var children = ' + args.symbol + '.children;' +
				'for (var d = children.length-1; d >= 0; d--) {' +
				'	' + args.symbol + '.remove(children[d]);' +
				'}';

			if (state.parentFormFactor || node.hasAttribute('formFactor')) {
				// if this node or a parent has set the formFactor attribute
				// we need to pass it to the data binding generator
				args.parentFormFactor = (state.parentFormFactor || node.getAttribute('formFactor'));
			}
			code += _.template(CU.generateCollectionBindingTemplate(args))({
				localModel: localModel,
				dataName: dataName,
				pre: pre,
				items: itemCode,
				post: ''
			});
		}
	}

	// Update the parsing state
	var ret = {
		isViewTemplate: state.isViewTemplate || false,
		local: state.local || false,
		model: state.model || undefined,
		dataName: state.dataName || undefined,
		condition: state.condition || undefined,
		styles: state.styles,
		code: code
	};
	var nextObj = {
		node: node,
		symbol: args.symbol
	};

	if (state.isViewTemplate) {
		return _.extend(ret, { item: nextObj });
	} else {
		return _.extend(ret, { parent: isCollectionBound ? {} : nextObj });
	}
}
