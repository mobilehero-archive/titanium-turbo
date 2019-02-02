const _ = require('lodash');
const logger = require('../../logger');
const Table = require('cli-table3');

exports.splitAssign = (value, alloyConfig) => {
	// instantiate table
	var table = new Table({
		head: ['TH 1 label', 'TH 2 label'], colWidths: [20, 50]
	});

	// console.error('program.config: ' + JSON.stringify(value, null, 2));
	logger.debug('raw config = "' + value + '"');
	_.each(value.split(','), function(v) {
		var parts = v.split('=');
		if (alloyConfig[parts[0]]) {
			alloyConfig[parts[0]] = [].concat(alloyConfig[parts[0]], parts[1]);
		} else {
			alloyConfig[parts[0]] = parts[1];
		}
		table.push([parts[0],  parts[1]]);
		logger.debug(parts[0] + ' = ' + parts[1]);
	});
	logger.debug(table.toString());
};