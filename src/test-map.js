export default function(val, ref, tst, depth) {
	if ( !(ref instanceof Map && val.size === ref.size) ) return false
	let result = true
	val.forEach(function(v,k) { if (result) result = tst(v, ref.get(k), depth) })
	return result
}
