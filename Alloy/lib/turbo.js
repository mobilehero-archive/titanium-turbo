const { observable } = require('@titanium/observer');
const _turbo = { 
	data: {},
	globals: {},
	fonts: {},
	colors: {},
	api: {},
	DEBUG_MODE: false,
	TRACE_MODE: false,
	VERBOSE_MODE: false,
	DEBUG_UI: false,
};

_turbo.debug = (...args) => {
	_turbo.DEBUG_MODE && console.debug(...args);
};

_turbo.trace = (...args) => {
	_turbo.TRACE_MODE && console.debug(...args);
};

_turbo.verbose = (...args) => {
	_turbo.VERBOSE_MODE && console.debug(...args);
};

module.exports = observable(_turbo);
// module.exports = _turbo;