/**
 * @param {*} val
 * @returns {string}
 */
export function toString(val) {
	switch (typeof val) {
		case 'object': return !val ? ''+val
			: Array.isArray(val) ? `[${ val.map(toString) }]`
			: (val.constructor === Object || val.constructor === null) ? `{${ Object.keys(val).map(kv,val) }}`
			: Object.prototype.toString.call(val).slice(8,-1)
		case 'string': return `"${ val.replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t') }"`
	}
	return '' + val
}

function kv(k) {
	return k + ':' + toString(this[k])
}
