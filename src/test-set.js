export default function(val, ref, tst, visited) {
	if ( !(ref instanceof Set && val.size === ref.size) ) return false
	return tst(setValues(val), setValues(ref), visited)
}

function setValues(set) {
	const res = []
	set.forEach(v => res.push(v), res)
	return res
}
