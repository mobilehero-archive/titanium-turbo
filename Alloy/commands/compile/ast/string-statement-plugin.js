// Walk tree transformer changing "`......`" to `......` and "~......~" to ......
// This will allow you to use controller args in contained views/controllers
module.exports = function (_ref) {
	var types = _ref.types;

	return {
		pre: function (state) {

		},
		visitor: {

			Property: function (path, state) {
				if (types.isStringLiteral(path.node.value)) {
					const regex1 = /^`([^`]+)`$/;
					const regex2 = /^~([^`]+)~$/;
					if ( regex1.test(path.node.value.value) ) {
						path.replaceWith(types.ObjectProperty(types.identifier(path.node.key.name), types.Identifier(path.node.value.value)));
					} else if ( regex2.test(path.node.value.value) ) {
						path.replaceWith(types.ObjectProperty(types.identifier(path.node.key.name), types.Identifier(path.node.value.value.replace(regex2, '$1'))));
					} 
				}
			},
		}
	};
};