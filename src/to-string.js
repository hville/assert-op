export function toString(val, max) {
	var c = val && (val.constructor || Object),
			t = c === Array ? '[' + val.map(toString) +']'
				: c === Object ? ('{' + Object.keys(val).map(kv,val) + '}')
					: ('' + val)
	return (max && t.length > max) ? Object.prototype.toString.call(val) : t
}

function kv(k) {
	return k+':'+toString(this[k])
}
