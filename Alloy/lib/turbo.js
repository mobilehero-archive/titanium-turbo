const { observable } = require('@nx-js/observer-util');
const _turbo = { 
	data: {},
	globals: {},
	fonts: {},
	DEBUG_MODE: false,
};
module.exports = observable(_turbo);
// module.exports = _turbo;