import testOwn from './src/test-own.js'
import testMap from './src/test-map.js'
import testSet from './src/test-set.js'

export function deepEqual(val, ref, visited=new Set) {
	// primitives check
	if (val == ref) return true
	if (!val || typeof val !== 'object' || typeof ref !== 'object') return false

	if (visited.has(val)) return true
	visited.add(val)

	return val instanceof Map ? testMap(val, ref, deepEqual, visited)
	 : val instanceof Set ? testSet(val, ref, deepEqual, visited)
	: testOwn(val, ref, deepEqual, visited)
}
