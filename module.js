import {deepEqual, deepStrictEqual} from './src/deep-equal'
import {toString} from './src/to-string'

var max = 50

/**
 * @param {string} op
 * @param {*} val
 * @param {*} [ref]
 * @param {string} [msg]
 * @return {void}
 */
export default function assert(op, val, ref, msg) {
	var not = op !== '!' && op[0] === '!',
			key = !not ? op : op[1] === '=' ? op.slice(1) + '=' : op.slice(1),
			fcn = ops[key]
	if (!fcn) throw Error('invalid operator: ' + op)
	if (fcn(val, ref) ? not : !not) {
		var len = fcn.length,
				vst = toString(val, max),
				txt = len > 1 ? (vst + ' ' + op + ' ' + toString(ref, max - vst.length)) : (op + ' ' + vst)
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
			fcn()
		} catch (e) {
			var typ = typeof validate
			return !validate ||
				typ === 'string' ||
				(typ === 'function' && (e instanceof validate || validate(e))) ||
				(validate.test && validate.test(e.message))
		}
	}
}
