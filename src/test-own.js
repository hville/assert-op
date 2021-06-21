export default function(val, ref, tst, depth) {
	const kv = Object.keys(val),
				kr = Object.keys(ref)
	if (kv.length !== kr.length) return false
	for (const kvi of kv) if (!tst(val[kvi], ref[kvi], depth)) return false
	return true
}
