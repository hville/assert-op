/* eslint no-console: 0, no-loop-func: 0*/
// @ts-ignore
import a from '../assert.js'

function msg(op, val, ref, txt) {
	try {
		a(op, val, ref)
	} catch (e) {
		a('===', e.message, txt)
	}
}
function msg1(op, val, txt) {
	try {
		a(op, val)
	} catch (e) {
		a('===', e.message, txt)
	}
}

console.log('number...')
msg('===', 123, 456, '123 === 456')
msg('!==', 123, '123', '123 !== "123"')
msg('===', 123, 123, '123 !== 123')
console.log('string...')
msg('===', '123', '456', '"123" === "456"')
msg1('!', 'a', '! "a"')
console.log('null...')
msg('!==', null, null, 'null !== null')
console.log('undefined...')
msg('!==', undefined, undefined, 'undefined !== undefined')
