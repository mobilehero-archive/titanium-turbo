const { observable } = require('@nx-js/observer-util');
const _turbo = { 
	data: {},
	globals: {},
	fonts: {},
	DEBUG_MODE: false,
	DEBUG_UI: false,
	debug: (...args) => {
		DEBUG_MODE && console.debug(...args);
	}
};
module.exports = observable(_turbo);
// module.exports = _turbo;