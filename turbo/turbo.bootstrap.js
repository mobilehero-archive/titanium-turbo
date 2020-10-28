// Add support for console.table()
console.table = require('./console-table.js');

// Fallbacks for non-static require statements
global.binding.register('moment', require('/alloy/moment'));
global.binding.register('lodash', require('./lodash.js'));

