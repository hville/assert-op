/* eslint no-console: 0, no-loop-func: 0*/
// @ts-ignore
var a = require('../'),
		toString = require('../src/to-string')

console.log('toString')
//number
a('===', toString(123456789), '123456789')
a('===', toString(123456789,9), '123456789')
a('===', toString(123456789,8), '[object Number]')
//string
a('===', toString('2\t'), '"2\\t"')
a('===', toString('2\f'), '"2\\f"')
a('===', toString('2\n'), '"2\\n"')
a('===', toString('2\r'), '"2\\r"')
a('===', toString('abcdef'), '"abcdef"')
a('===', toString('abcdef', 8), '"abcdef"')
a('===', toString('abcdef', 7), '[object String]')
//Array
a('===', toString([1,2]), '[1,2]')
a('===', toString([1,2],5), '[1,2]')
a('===', toString([1,2],4), '[object Array]')
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
a('===', toString({a:1,b:2},9), '{a:1,b:2}')
a('===', toString({a:1,b:2},8), '[object Object]')
