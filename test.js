import a from './assert.js'

let tests = [],
		close = null,
		fails = []

export default function test(msg, fcn) {
	if (!close) close = Promise.resolve().then(end)
	if (Array.isArray(msg)) return fcn => test(msg[0], fcn)
	tests.push(new Promise( r => {
		try {
			fcn(a)
			r([msg])
		} catch (err) {
			r(fails[fails.length] = [msg, err])
		}
	}))
}

function end() {
	Promise.all(tests)
		.then( res => {
			res.forEach( r => r.length === 2 ? console.error('!', r[0], r[1]) :	console.log(' ',r[0]) )
			tests = []
			close = null
			return fails.length ? Promise.reject(fails) : Promise.resolve()
		})
}
