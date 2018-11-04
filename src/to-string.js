module.exports = toString

function toString(val, max) {
	var c = val && (val.constructor || Object),
			t = c === Array ? '[' + val.map(toString) +']'
			: c === Object ? ('{' + Object.keys(val).map(kv,val) + '}')
			: c === String ? val.replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
			: ('' + val)
	return (max && t.length > max) ? Object.prototype.toString.call(val) : t
}

function kv(k) {
	return k+':'+toString(this[k])
}
