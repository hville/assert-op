export default function(val, ref, tst, visited) {
	const kv = Object.keys(val),
				kr = Object.keys(ref)
	if (kv.length !== kr.length) return false
	for (const kvi of kv) if (!tst(val[kvi], ref[kvi], visited)) return false
	return true
}
