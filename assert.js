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
			const typ = typeof validate
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
	if (isTag(op)) return assert.bind(null,t(...arguments))
	const not = op[0] === '!' && op.length > 1,
				key = not ? op[1] === '=' ? op.slice(1) + '=' : op.slice(1) : op,
				fcn = ops[key]
	if (!fcn) throw Error('invalid operator: ' + op)
	if (fcn(val, ref) ? not : !not) {
		const txt = fcn.length > 1 ? `${ toString(val) } ${ op } ${ toString(ref) }` : `${ op } ${ toString(val) }`
		throw Error(msg ? `${ txt }, ${ msg }` : txt)
	}
}
function isTag(a0) {
  return Array.isArray(a0) && Array.isArray(a0.raw)
}
function t(a0, ...as) {
	let	t=a0[0], i=0
	while(i<a0.length-1) t += as[i]+a0[++i]
	return t
}
