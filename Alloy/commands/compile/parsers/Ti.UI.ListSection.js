var _ = require('lodash'),
	styler = require('../styler'),
	U = require('../../../utils'),
	CU = require('../compilerUtils'),
	CONST = require('../../../common/constants');

var PROXY_PROPERTIES = [
	'_ProxyProperty._Lists.HeaderView',
	'_ProxyProperty._Lists.FooterView'
];
var VALID = [
	'Ti.UI.ListItem'
];
var ALL_VALID = _.union(PROXY_PROPERTIES, VALID);

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	var code = '',
		itemCode = '',
		itemsVar = CU.generateUniqueId(),
		isDataBound = args[CONST.BIND_COLLECTION] ? true : false,
		proxyProperties = {},
		extras = [],
		itemsArray, localModel;

	// process each child
	_.each(U.XML.getElementsFromNodes(node.childNodes), function(child) {
		var fullname = CU.getNodeFullname(child),
			theNode = CU.validateNodeName(child, ALL_VALID),
			isProxyProperty = false,
			isControllerNode = false,
			hasUiNodes = false,
			controllerSymbol;

		// validate the child element and determine if it's part of
		// the table data or a proxy property assigment
		if (!theNode) {
			U.dieWithNode(child, 'Ti.UI.TableView child elements must be one of the following: [' + ALL_VALID.join(',') + ']');
		} else if (!CU.isNodeForCurrentPlatform(child)) {
			return;
		} else if (_.includes(CONST.CONTROLLER_NODES, fullname)) {
			isControllerNode = true;
		} else if (_.includes(PROXY_PROPERTIES, theNode)) {
			isProxyProperty = true;
		}

		// manually handle controller node proxy properties
		if (isControllerNode) {

			// set up any proxy properties at the top-level of the controller
			var inspect = CU.inspectRequireNode(child);
			_.each(_.uniq(inspect.names), function(name) {
				if (_.includes(PROXY_PROPERTIES, name)) {
					var prop = U.proxyPropertyNameFromFullname(name);
					proxyProperties[prop] = '<%= controllerSymbol %>.getProxyPropertyEx("' + prop +
						'", {recurse:true})';
				} else {
					hasUiNodes = true;
				}
			});
		}

		// generate code for proxy property assignments
		if (isProxyProperty) {
			const generated_code = CU.generateNodeExtended(child, state, {
				parent: {},
				post: function(node, state, args) {
					proxyProperties[U.proxyPropertyNameFromFullname(theNode)] = state.parent.symbol;
				}
			});

			if(typeof generated_code === 'object'){
				code += generated_code.content;
			} else {
				code += generated_code;
			}


		// process all ListItems
		} else if (theNode === 'Ti.UI.ListItem') {

			// set up data bound items
			if (isDataBound) {
				localModel = args.createArgs.modelName || '__currentModel';
				var dataName = args.createArgs.dataName || '$model';
				const generated_code = CU.generateNodeExtended(child, state, {
					parent: {},
					local: true,
					model: localModel,
					dataName: dataName,
					post: function(node, state, args) {
						controllerSymbol = state.controller;
						return itemsVar + '.push(' + state.parent.symbol + ');';
					}
				});

				if(typeof generated_code === 'object'){
					itemCode += generated_code.content;
				} else {
					itemCode += generated_code;
				}

			// generate static items
			} else {
				if (!itemsArray) {
					itemsArray = CU.generateUniqueId();
					code += 'var ' + itemsArray + '=[];';
				}
				const generated_code = CU.generateNodeExtended(child, state, {
					parent: {},
					post: function(node, state, args) {
						controllerSymbol = state.controller;
						return itemsArray + '.push(' + state.parent.symbol + ');';
					}
				});

				if(typeof generated_code === 'object'){
					code += generated_code.content;
				} else {
					code += generated_code;
				}

			}

		// if there's no UI nodes inside, just generate it
		} else if (!hasUiNodes && isControllerNode) {
			const generated_code = CU.generateNodeExtended(child, state, {
				parent: {},
				post: function(node, state, args) {
					controllerSymbol = state.controller;
				}
			});

			if(typeof generated_code === 'object'){
				code += generated_code.content;
			} else {
				code += generated_code;
			}

		}

		// fill in proxy property templates, if present
		if (isControllerNode) {
			_.each(proxyProperties, function(v, k) {
				proxyProperties[k] = _.template(v)({
					controllerSymbol: controllerSymbol
				});
			});
		}
	});

	// create the ListView itself
	if (isDataBound) {
		_.each(CONST.BIND_PROPERTIES, function(p) {
			node.removeAttribute(p);
		});
	}

	// add all creation time properties to the state
	_.each(proxyProperties, function(v, k) {
		extras.push([k, v]);
	});
	if (extras.length) { state.extraStyle = styler.createVariableStyle(extras); }

	// create the section
	var sectionState = require('./default').parse(node, state);
	code += sectionState.code;

	// add items to the ListView
	if (itemsArray) {
		code += sectionState.parent.symbol + '.items=' + itemsArray + ';';
	}

	// finally, fill in any model-view binding code, if present
	if (isDataBound) {
		localModel = args.createArgs.modelName || '__currentModel';
		var dataName = args.createArgs.dataName || '$model';
		var sps = sectionState.parent.symbol;

		if (state.parentFormFactor || node.hasAttribute('formFactor')) {
			// if this node or a parent has set the formFactor attribute
			// we need to pass it to the data binding generator
			args.parentFormFactor = (state.parentFormFactor || node.getAttribute('formFactor'));
		}
		code += _.template(CU.generateCollectionBindingTemplate(args))({
			localModel: localModel,
			dataName: dataName,
			pre: 'var ' + itemsVar + '=[];',
			items: itemCode,
			post: 'opts.animation ? ' +
				sps + '.setItems(' + itemsVar + ', opts.animation) : ' +
				sps + '.setItems(' + itemsVar + ');'
		});
	}

	return {
		parent: {},
		styles: state.styles,
		code: code
	};
}
