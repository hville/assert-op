import testOwn from './src/test-own.js'
import testMap from './src/test-map.js'
import testSet from './src/test-set.js'

const maxDepth = 50 //for circular refs

export function deepStrictEqual(val, ref, visited=new Set) {
	// primitives check
	if (val === ref) return true
	if (!val || typeof val !== 'object' || typeof ref !== 'object') return false

	if (visited.has(val)) return true
	visited.add(val)

	// MAP: compare each value by key
	if (typeof Map !== 'undefined' && val instanceof Map) {
		return testMap(val, ref, deepStrictEqual, visited)
	}

	// SET: compare each value by order
	if (typeof Set !== 'undefined' && val instanceof Set) {
		return testSet(val, ref, deepStrictEqual, visited)
	}

	// object: own properties and strict Equal
	const toStr = Object.prototype.toString
	return Object.getPrototypeOf(val) === Object.getPrototypeOf(ref) &&
		toStr.call(val) === toStr.call(ref) &&
		testOwn(val, ref, deepStrictEqual, visited)
}
