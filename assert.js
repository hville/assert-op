import {deepEqual} from './deep-equal.js'
import {deepStrictEqual} from './deep-strict-equal.js'
import {toString} from './to-string.js'

const ops = {
	'{==}': deepEqual,
	'{===}': deepStrictEqual,
	'==' : function(v,r) { return v == r }, //eslint-disable-line eqeqeq
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
			return !validate || typ === 'string' ? true
				: typ === 'function' ? (validate.prototype && e instanceof validate) || validate(e)
				: validate?.test?.(e.message) //regExp
		}
	}
}

/**
 * @param {string} op
 * @param {*} val
 * @param {*} [ref]
 * @param {string} [msg]
 * @return {void}
 */
export default function assert(op, val, ref, msg) {
	if (Array.isArray(op)) return (val, ref, msg) => assert(op[0], val, ref, msg)
	const not = op[0] === '!' && op.length > 1,
				key = not ? op[1] === '=' ? op.slice(1) + '=' : op.slice(1) : op,
				fcn = ops[key]
	if (!fcn) throw Error('invalid operator: ' + op)
	if (fcn(val, ref) ? not : !not) {
		const txt = fcn.length > 1 ? `${ toString(val) } ${ op } ${ toString(ref) }` : `${ op } ${ toString(val) }`
		throw Error(msg ? `${ txt }, ${ msg }` : txt)
	}
}
