import a from './assert.js'

let results = [],
		tid = -1

export default function test(msg, fcn) {
	if (tid < 0) tid = setTimeout(end, 0)
	if (Array.isArray(msg)) return fcn => test(msg[0], fcn)
	results.push(new Promise( r => {
		try {
			fcn(a)
			r([msg])
		} catch (err) {
			r([msg, err])
		}
	}))
}

function end() {
	Promise.all(results).then( res => res.forEach( r => r.length === 2
		? (++ers, console.error(r[0], r[1]))
		:	console.log(r[0])
	)).finally( () => console.log() )
	results = []
	tid = -1
}
