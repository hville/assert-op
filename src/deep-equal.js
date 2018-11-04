var testOwn = require('./test-own'),
		testMap = require('./test-map'),
		testSet = require('./test-set')

var maxDepth = 50 //for circular refs

module.exports = function deepEqual(val, ref, depth) {
	// primitives check
	if (val == ref) return true //eslint-disable-line eqeqeq
	if (!val || typeof val !== 'object' || typeof ref !== 'object') return false

	if (depth === maxDepth) return false

	// MAP: compare each value by key
	if (val.constructor === Map) return testMap(val, ref, deepEqual, depth ? ++depth : 1)

	// SET: compare each value by order
	if (val.constructor === Set) return testSet(val, ref, deepEqual, depth ? ++depth : 1)

	// object: own properties
	return testOwn(val, ref, deepEqual, depth ? ++depth : 1)
}

