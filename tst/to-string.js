/* eslint no-console: 0, no-loop-func: 0*/
// @ts-ignore
var a = require('../'),
		toString = require('../src/to-string')

console.log('toString')
//number
a('===', toString(123456789), '123456789')
//string
a('===', toString('2\t'), '"2\\t"')
a('===', toString('2\f'), '"2\\f"')
a('===', toString('2\n'), '"2\\n"')
a('===', toString('2\r'), '"2\\r"')
a('===', toString('abcdef'), '"abcdef"')
//Array
a('===', toString([1,2]), '[1,2]')
a('===', toString([1,2],5), '[1,2]')
a('===', toString([1234567890,2345678901]), '[1234567890,2345678901]')

//null
a('===', toString(null), 'null')
//undefined
a('===', toString(undefined), 'undefined')
//boolean
a('===', toString(true), 'true')
a('===', toString(false), 'false')
//Object
a('===', toString({}), '{}')
a('===', toString({a:1,b:2}), '{a:1,b:2}')
