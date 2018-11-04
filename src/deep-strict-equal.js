var testOwn = require('./test-own'),
		testMap = require('./test-map'),
		testSet = require('./test-set')

var maxDepth = 50 //for circular refs

module.exports = function deepStrictEqual(val, ref, depth) {
	// primitives check
	if (val === ref) return true
	if (!val || typeof val !== 'object' || typeof ref !== 'object') return false

	if (depth === maxDepth) return false

	// MAP: compare each value by key
	if (typeof Map !== 'undefined' && val.constructor === Map) {
		return testMap(val, ref, deepStrictEqual, depth ? ++depth : 1)
	}

	// SET: compare each value by order
	if (typeof Set !== 'undefined' && val.constructor === Set) {
		return testSet(val, ref, deepStrictEqual, depth ? ++depth : 1)
	}

	// object: own properties and strict Equal
	var toStr = Object.prototype.toString
	return Object.getPrototypeOf(val) === Object.getPrototypeOf(ref) &&
		toStr.call(val) === toStr.call(ref) &&
		testOwn(val, ref, deepStrictEqual, depth ? ++depth : 1)
}
