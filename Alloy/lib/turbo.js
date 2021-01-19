try {
	module.exports = require(`@titanium/essentials`);
} catch( error ){
	logger.debug(`🦠  error: ${JSON.stringify(error, null, 2)}`);
	module.exports = {};
}