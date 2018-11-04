/* eslint no-console: 0, no-loop-func: 0*/
// @ts-ignore
var a = require('../'),
		toString = require('../src/to-string')

console.log('toString')
a('===', toString(2), '2')
a('===', toString([2]), '[2]')
a('===', toString('2\t'), '2\\t')
a('===', toString('2\f'), '2\\f')
a('===', toString('2\n'), '2\\n')
a('===', toString('2\r'), '2\\r')
