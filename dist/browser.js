/* hugov@runbox.com | https://github.com/hville/cotest.git | license:MIT */
var cotest = (function () {
'use strict';

/* eslint-disable eqeqeq */
var maxDepth = 50; //for circular refs


function deepEqual(val, ref, depth) {
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


function deepStrictEqual(val, ref, depth) {
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
	var toStr = Object.prototype.toString;
	return Object.getPrototypeOf(val) === Object.getPrototypeOf(ref) &&
		toStr.call(val) === toStr.call(ref) &&
		testOwn(val, ref, deepStrictEqual, depth ? ++depth : 1)
}


function testOwn(val, ref, tst, depth) {
	var kv = Object.keys(val),
			kr = Object.keys(ref);
	if (kv.length !== kr.length) return false
	for (var i=0; i<kv.length; ++i) if (!tst(val[kv[i]], ref[kv[i]], depth)) return false
	return true
}

function testMap(val, ref, tst, depth) {
	if (ref.constructor !== Map || val.size!== ref.size) return false
	var result = true;
	val.forEach(function(v,k) { if (result) result = tst(v, ref.get(k), depth); });
	return result
}

function testSet(val, ref, tst, depth) {
	if (ref.constructor !== Set || val.size!== ref.size) return false
	return tst(setValues(val), setValues(ref), depth)
}

function setValues(set) {
	var res = [];
	set.forEach(push, res);
	return res
}

function push(v) { this.push(v); }

function toString(val, max) {
	var c = val && (val.constructor || Object),
			t = c === Array ? '[' + val.map(toString) +']'
				: c === Object ? ('{' + Object.keys(val).map(kv,val) + '}')
					: ('' + val);
	return (max && t.length > max) ? Object.prototype.toString.call(val) : t
}

function kv(k) {
	return k+':'+toString(this[k])
}

var max = 50;

/**
 * @param {string} op
 * @param {*} val
 * @param {*} [ref]
 * @param {string} [msg]
 * @return {void}
 */
function assert(op, val, ref, msg) {
	var not = op !== '!' && op[0] === '!',
			key = !not ? op : op[1] === '=' ? op.slice(1) + '=' : op.slice(1),
			fcn = ops[key];
	if (!fcn) throw Error('invalid operator: ' + op)
	if (fcn(val, ref) ? not : !not) {
		var len = fcn.length,
				vst = toString(val, max),
				txt = len > 1 ? (vst + ' ' + op + ' ' + toString(ref, max - vst.length)) : (op + ' ' + vst);
		throw Error(msg ? txt + ', ' + msg : txt)
	}
}

var ops = {
	'{==}': deepEqual,
	'{===}': deepStrictEqual,
	'==' : function(v,r) { return v == r },
	'===' : function(v,r) { return v === r },
	'>' : function(v,r) { return v > r },
	'<' : function(v,r) { return v < r },
	'>=' : function(v,r) { return v >= r },
	'<=' : function(v,r) { return v <= r },
	'!' : function(v) { return !v },
	'throws': function(fcn, validate) {
		try {
			fcn();
		} catch (e) {
			var typ = typeof validate;
			return !validate ||
				typ === 'string' ||
				(typ === 'function' && (e instanceof validate || validate(e))) ||
				(validate.test && validate.test(e.message))
		}
	}
};

return assert;

}());
