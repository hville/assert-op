export function toString(val) {
	var c = val && (val.constructor || Object)
	return c === Array ? '[' + val.map(toString) +']'
		: c === Object ? ('{' + Object.keys(val).map(kv,val) + '}')
		: c === String ? ('"'+val.replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')+'"')
		: ('' + val)
}

function kv(k) {
	return k+':'+toString(this[k])
}
