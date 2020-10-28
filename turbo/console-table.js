const _ = require('lodash');

const getFormattedString = (value, isHeaderValue) => {
	if (isHeaderValue) {
		return `${value}`;
	} else if (typeof value === 'string') {
		return `'${value}'`;
	} else if (typeof value === 'function') {
		return '[function]';
	} else if (typeof value === 'object') {
		return JSON.stringify(value);
	} else if (typeof value === 'undefined') {
		return '';
	}
	return `${value}`;
};

const getColoredAndFormattedString = (value, isHeaderValue) => {
	let color_start;
	let color_stop;
	if (typeof value === 'undefined') {
		return {
			formatted: '',
			colored:   '',
			length:    0,
		};
	}
	if (isHeaderValue) {
		return {
			formatted: `${value}`,
			colored:   `${value}`,
			length:    `${value}`.length,
		};
	} else if (typeof value === 'number' || typeof value === 'boolean') {
		color_start = '\u001b[33m';
		color_stop = '\u001b[39m';
	} else if (typeof value === 'string') {
		color_start = '\u001b[32m';
		color_stop = '\u001b[39m';
	} else if (typeof value === 'function') {
		color_start = '\u001b[90m';
		color_stop = '\u001b[39m';
	}

	value = getFormattedString(value, isHeaderValue);
	if (color_start) {
		return {
			formatted: `${value}`,
			colored:   `${color_start}${value}${color_stop}`,
			length:    `${value}`.length,
		};
	} else {
		return {
			formatted: `${value}`,
			colored:   `${value}`,
			length:    `${value}`.length,
		};
	}

};

const pad = (value, width, isHeader = false) => {

	const result = getColoredAndFormattedString(value, isHeader);
	if (width <= result.length) {
		return result.colored;
	} else {
		const padding = width - result.length;
		const pre_pad = Math.floor(padding / 2);
		const post_pad = width - pre_pad - result.length;
		return `${_.repeat(' ', pre_pad)}${result.colored}${_.repeat(' ', post_pad)}`;
	}

};

const printRows = (headers, rows, column_widths) => {
	if (!rows.length) {
		return;
	}
	column_widths = _.map(column_widths, column_width => column_width + 4);
	const row_strings = [];
	row_strings.push(`┌${_.reduce(column_widths, (text, column_width) => {
		const divider = text.length ? '┬' : '';
		text += `${divider}${_.repeat('─', column_width)}`;
		return text;
	}, '')}┐`);


	let column_index = 0;
	row_strings.push(`│${_.reduce(headers, (text, header) => {
		const divider = '│';
		text += `${pad(header, column_widths[column_index++], true)}${divider}`;
		return text;
	}, '')}`);

	row_strings.push(`├${_.reduce(column_widths, (text, column_width) => {
		const divider = text.length ? '┼' : '';
		text += `${divider}${_.repeat('─', column_width)}`;
		return text;
	}, '')}┤`);

	for (const row of rows) {
		let column_index = 0;
		row_strings.push(`│${_.reduce(row, (text, column_value) => {
			const divider = '│';
			text += `${pad(column_value, column_widths[column_index], !column_index)}${divider}`;
			column_index++;
			return text;
		}, '')}`);
	}


	row_strings.push(`└${_.reduce(column_widths, (text, column_width) => {
		const divider = text.length ? '┴' : '';
		text += `${divider}${_.repeat('─', column_width)}`;
		return text;
	}, '')}┘`);

	for (const row of row_strings) {
		console.info(row);
	}
};

const table = (data, properties, options = {}) => {

	if (typeof data !== 'object') {
		console.info(data);
		return;
	}

	const rows = [];
	const header0 = '(index)';
	const _headers = new Set();
	const column_widths = [ header0.length ];
	let header_array;

	if (data instanceof Array) {

		if (properties instanceof Array) {
			header_array = properties;
		} else {
			for (const item of data) {
				for (const key in item) {
					const name = getFormattedString(key, true);
					_headers.add(name);
				}
			}

			header_array = Array.from(_headers).sort();
		}

		let row_index = 0;
		for (const item of data) {
			const row_index_text = getFormattedString(row_index);
			const row = [ row_index_text ];
			column_widths[0] = Math.max(row_index_text.length, column_widths[0] || 0, 0);
			let column_index = 1;
			for (const key of header_array) {
				const value = getFormattedString(item[key]);
				column_widths[column_index] = Math.max(value.length, column_widths[column_index] || 0, key.length, 0);
				row.push(item[key]);
				column_index++;


			}
			rows.push(row);
			row_index++;
		}
		header_array = [ header0, ...header_array ];

	} else {

		let last_column;
		if (! (properties instanceof Array)) {
			properties = undefined;

			for (const key in data) {
				const item = data[key];
				if (typeof item === 'object') {
					for (const subkey in item) {
						_headers.add(subkey);
					}
				}
			}

			header_array = Array.from(_headers);
			const header1 = 'Values';
			header_array.push(header1);
			last_column = header_array.length;
		} else {
			header_array = properties;
		}

		for (let column_index = 0; column_index < header_array.length; column_index++) {
			column_widths[column_index] = header_array[column_index].length;
		}

		for (const key in data) {
			const _row = [];
			const name = getFormattedString(key, true);
			_row[0] = key;
			column_widths[0] = Math.max(name.length, column_widths[0]);
			const item = data[key];
			if (_.isObjectLike(item)) {

				let column_index = 1;
				for (const header of header_array) {
					const value = getFormattedString(item[header]);
					column_widths[column_index] = Math.max(value.length, column_widths[column_index]);
					_row[column_index] = item[header];
					column_index++;
				}
			} else if (! properties) {
				const value = getFormattedString(item);
				_row[last_column] = item;
				column_widths[last_column] = Math.max(value.length, column_widths[last_column] || 0);
			}

			rows.push(_row);

		}

		header_array = [ header0, ...header_array ];

	}

	printRows(header_array, rows, column_widths);

};

module.exports = table;
