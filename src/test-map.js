export default function(val, ref, tst, depth) {
	if (ref.constructor !== Map || val.size!== ref.size) return false
	var result = true
	val.forEach(function(v,k) { if (result) result = tst(v, ref.get(k), depth) })
	return result
}
