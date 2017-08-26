/* eslint-disable eqeqeq */
var maxDepth = 50 //for circular refs


export function deepEqual(val, ref, depth) {
	// primitives check
	if (val == ref) return true
	if (!val || typeof val !== 'object' || typeof ref !== 'object') return false

	if (depth === maxDepth) return false

	// MAP: compare each value by key
	if (val.constructor === Map) return testMap(val, ref, deepEqual, depth ? ++depth : 1)

	// SET: compare each value by order
	if (val.constructor === Set) return testSet(val, ref, deepEqual, depth ? ++depth : 1)

	// object: own properties
	return testOwn(val, ref, deepEqual, depth ? ++depth : 1)
}


export function deepStrictEqual(val, ref, depth) {
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


function testOwn(val, ref, tst, depth) {
	var kv = Object.keys(val),
			kr = Object.keys(ref)
	if (kv.length !== kr.length) return false
	for (var i=0; i<kv.length; ++i) if (!tst(val[kv[i]], ref[kv[i]], depth)) return false
	return true
}

function testMap(val, ref, tst, depth) {
	if (ref.constructor !== Map || val.size!== ref.size) return false
	var result = true
	val.forEach(function(v,k) { if (result) result = tst(v, ref.get(k), depth) })
	return result
}

function testSet(val, ref, tst, depth) {
	if (ref.constructor !== Set || val.size!== ref.size) return false
	return tst(setValues(val), setValues(ref), depth)
}

function setValues(set) {
	var res = []
	set.forEach(push, res)
	return res
}

function push(v) { this.push(v) }
