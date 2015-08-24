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

}));