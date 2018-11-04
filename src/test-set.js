module.exports = function(val, ref, tst, depth) {
	if (ref.constructor !== Set || val.size!== ref.size) return false
	return tst(setValues(val), setValues(ref), depth)
}

function setValues(set) {
	var res = []
	set.forEach(push, res)
	return res
}

function push(v) { this.push(v) }
