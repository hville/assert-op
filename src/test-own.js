export default function(val, ref, tst, depth) {
	var kv = Object.keys(val),
			kr = Object.keys(ref)
	if (kv.length !== kr.length) return false
	for (var i=0; i<kv.length; ++i) if (!tst(val[kv[i]], ref[kv[i]], depth)) return false
	return true
}
