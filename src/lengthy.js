/*
	----------------------
	lengthy.js
	----------------------

	- Inspired by Pretty of John Resig
*/

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory.root();
	} else {
		root.lengthy = factory(root);
	}
}(this, function (root) {
	'use strict';

	// convert value to string and pad it with leading zeroes
	function leadingZeros(value, length) {
		var str = value.toString(),
			finalLengh = arguments.length === 2 ? length : 2;

		if (str.length > finalLengh) {
			return str;
		}

		for (str; str.length < finalLengh; str = '0' + str);

		return str;
	}

	var tokens = {
		YYYY: function(date) {
			return date.getFullYear();
		},
		YY: function(date) {
			return leadingZeros(date.getFullYear() % 100);
		},
		MMMM: function(date, format) {
			return language[lengthy.lang()].months(date, format);
		},
		MMM: function(date, format) {
			return language[lengthy.lang()].monthsShort(date, format);
		},
		MM: function(date) {
			return leadingZeros(date.getMonth() + 1);
		},
		M: function(date) {
			return date.getMonth() + 1;
		},
		DD: function(date) {
			return language[lengthy.lang()].weekdays[date.getDay()];
		},
		D: function(date) {
			return language[lengthy.lang()].weekdayMin[date.getDay()];
		},
		dd: function(date) {
			return leadingZeros(date.getDate());
		},
		d: function(date) {
			return date.getDate();
		},
		HH: function(date) {
			return leadingZeros(date.getHours());
		},
		H: function(date) {
			return date.getHours();
		},
		hh: function(date) {
			return leadingZeros(date.getHours() % 12 || 12);
		},
		h: function(date) {
			return date.getHours() % 12 || 12;
		},
		mm: function(date) {
			return leadingZeros(date.getMinutes());
		},
		m: function(date) {
			return date.getMinutes();
		},
		ss: function(date) {
			return leadingZeros(date.getSeconds());
		},
		s: function(date) {
			return date.getSeconds();
		},
		ff: function(date) {
			return leadingZeros(date.getMilliseconds(), 3);
		},
		f: function(date) {
			return date.getMilliseconds();
		},
		A: function(date) {
			return language[lengthy.lang()].meridiem(date.getHours(), false);
		},
		a: function(date) {
			return language[lengthy.lang()].meridiem(date.getHours(), true);
		},
		Z: function(date) {
			var tz = date.getTimezoneOffset(),
				hours = Math.abs(Math.floor(tz / 60)),
				mins = tz % 60,
				sign = tz > 0 ? '+' : '-';

			return [sign, leadingZeros(hours), ':', leadingZeros(mins)].join('');
		}
	};

	var possibleFormats = [];
	for (var extractor in tokens) {
		if (tokens.hasOwnProperty(extractor)) {
			possibleFormats.push(extractor);
		}
	}
	var regexp = new RegExp(possibleFormats.join('|'), 'mg');

	function lengthy(format, date) {
		if (!format || typeof format !== 'string') {
			throw new TypeError('Argument `format` must be a string :/');
		}

		if (date !== undefined && !(date instanceof Date) && typeof date !== 'number' && typeof date !== 'string') {
			throw new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String :/');
		}

		var ln = (arguments.length === 2 && date) ? date instanceof Date ? date : new Date(date) : new Date();

		format = format.toString();

		if (lengthy._formatters[format]) {
			return lenghty._formatters[format](ln);
		} else {
			return format.replace(regexp, function(match) {
				return tokens[match](ln, format);
			});
		}
	}

	var hasModule = !!(typeof module !== 'undefined' && module.exports);

	// define one language
	var language = lengthy._language = {};

	var lang = lengthy.lang = function(lang, options) {
		if (!lang) {
			return language.current;
		}

		if (!options) {
			if (language[lang] && language.current !== lang) {
				language.current = lang;
			} else if (hasModule) {
				try {
					require('./lang/' + lang);
					language.current = lang;
				} catch (e) {
					return language.current;
				}
			}
			return language.current;
		}

		language[lang] = options;
		language.current = lang;
		return language.current;
	};

	lang('en', {
		_months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
		months: function(date) {
			return this_months[date.getMonth()];
		},
		_monthsShort: 'Jan_Feb_Mar_Apr_May_June_July_Aug_Sept_Oct_Nov_Dec'.split('_'),
		monthsShort: function(date) {
			return this._monthsShort[date.getMonth()];
		},
		weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
		weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
		weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
		meridiem: function(hours, isLower) {
			if (hours > 11) {
				return isLower ? 'pm' : 'PM';
			} else {
				return isLower ? 'am' : 'AM';
			}
		}
	});

	// formatting function
	var createFormatter = function(format) {
		return function(date) {
			var f = format[lengthy.lang()] || format['default'] || format;
			return lengthy(f, date);
		};
	};

	// Define formatters
	var formatters = lengthy._formatters = {};

	var register = lengthy.register = function(name, format) {
		formatters[name] = createFormatter(format);
		return formatters[name];
	};

	// list of custom formats
	lengthy.formatters = function() {
		return Object.keys(lengthy._formatters);
	};

	// basic formats
	register('ISODate', 'YYYY-MM-dd');
	register('ISOTime', 'hh:mm:ss');
	register('ISODateTime', 'YYYY-MM-ddThh:mm:ss');
	register('ISODateTimeTZ', 'YYYY-MM-ddthh:mm:ssZ');

	// conflict
	var prevLengthy = root.lengthy;

	lengthy.noClonfict = function() {
		root.lengthy = prevLengthy;
		return this;
	};

	return lengthy;
}));