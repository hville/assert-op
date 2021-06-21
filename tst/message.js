// @ts-ignore
import t from '../index.js'
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

t(`number`, a => {
	msg('===', 123, 456, '123 === 456')
	msg('!==', 123, '123', '123 !== "123"')
	msg('===', 123, 123, '123 !== 123')
})

t(`string`, a=> {
	msg('===', '123', '456', '"123" === "456"')
	msg1('!', 'a', '! "a"')
})

t(`null`, a=> {
	msg('!==', null, null, 'null !== null')
})

t('undefined', a=> {
	msg('!==', undefined, undefined, 'undefined !== undefined')
})
