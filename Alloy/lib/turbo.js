const { observable } = require('@nx-js/observer-util');
const _turbo = { 
	data: {},
	globals: {},
	fonts: {},
	colors: {},
	api: {},
	DEBUG_MODE: false,
	DEBUG_UI: false,
	debug: (...args) => {
		this.DEBUG_MODE && console.debug(...args);
	}
};
module.exports = observable(_turbo);
// module.exports = _turbo;