/* eslint no-console: 0, no-loop-func: 0*/
// @ts-ignore
var a = require('../')

//function logE(e) {console.log('ERR:',e.message); return true}
function fail() { throw Error('err') }
function pass() { }

console.log('throws...')
a('throws', fail)
a('throws', fail, 'should throw')
a('throws', fail, Error)
a('throws', fail, function() { return true }, 'should throw')
a('throws', fail, function(e) { return e.message === 'err' }, 'should throw')
a('throws', fail, /^err$/, 'should throw')
a('throws', function() { a('throws', pass) }, /^function.*throws/, 'valid message')


console.log('!throws...')
a('!throws', pass)
a('!throws', fail, function() { return false }, 'shouldn\'t throw')
a('!throws', pass, function(e) { return e.message !== 'err' }, 'shouldn\'t throw')
a('throws', function() { a('!throws', fail) }, /^function.*!throws/, 'valid message')


console.log('===, !==, ==, != ...')
a('===', 2, 2)
a('throws', function() { a('===', {}, {}) }, /^\{} === {}$/, 'valid message')
a('!==', {}, {})
a('throws', function() { a('!==', 2, 2) }, /^2 !== 2$/, 'valid message')
a('==', null, undefined)
a('throws', function() { a('==', null, false) }, /^null == false$/, 'valid message')
a('!=', undefined, true)
a('throws', function() { a('!=', undefined, null) }, /^undefined != null$/, 'valid message')

console.log('>, <, >=, <=, !>, !<, !>=, !<= ...')
a('>', 3, 2)
a('throws', function() { a('>', {a:1}, 3) }, /^\{a:1\} > 3$/, 'valid message')
a('>=', -2, -3)
a('throws', function() { a('>=', [1], 3) }, /^\[1\] >= 3$/, 'valid message')
a('<', 1, 2)
a('throws', function() { a('<', {a:1}, 3) }, /^\{a:1\} < 3$/, 'valid message')
a('<=', -3, -2)
a('throws', function() { a('<=', [1], 0) }, /^\[1\] <= 0$/, 'valid message')

a('!<=', 3, 2)
a('throws', function() { a('!<=', 2, 3) }, /^2 !<= 3$/, 'valid message')
a('!<', -2, -3)
a('throws', function() { a('!<', [1], 3) }, /^\[1\] !< 3$/, 'valid message')
a('!>=', 1, 2)
a('throws', function() { a('!>=', 4, 3) }, /^4 !>= 3$/, 'valid message')
a('!>', -3, -2)
a('throws', function() { a('!>', 4, 3) }, /^4 !> 3$/, 'valid message')

console.log('!, !! ...')
a('!', false)
a('throws', function() { a('!', true) }, /! true$/, 'valid message')
a('!', null)
a('throws', function() { a('!', 1) }, /! 1$/, 'valid message')
a('!', '')
a('throws', function() { a('!', 'a') }, /! a$/, 'valid message')

a('!!', true)
a('throws', function() { a('!!', false) }, /!! false$/, 'valid message')
a('!!', 1)
a('throws', function() { a('!!', 0) }, /!! 0$/, 'valid message')
a('!!', 'a')
a('throws', function() { a('!!', '') }, /! $/, 'valid message')

console.log('{===}, {==}, !{===}, !{==} ...')
a('{===}', [0,1], [0,1])
a('throws', function() { a('{===}', [0,1], [1,0]) }, /^\[0,1\] \{===\} \[1,0\]$/, 'valid message')
a('{===}', {0:1}, {0:1})
a('throws', function() { a('{===}', {0:1}, {1:0}) }, /^\{0:1\} \{===\} \{1:0\}$/, 'valid message')
a('{===}', new Set([0,1]), new Set([0,1]))
a('throws', function() { a('{===}', new Set([0,1]), new Map([[1,0]])) }, /^\[object Set\] \{===\} \[object Map\]$/, 'valid message')

console.log('deepEqual Array ...')
a('{==}', [1,2], [1,2])
a('!{==}', [1,2], [2,1])
a('{==}', ['1',2], [1,2])
a('{==}', [['1',2], [1,2]], [[1,2], ['1',2]])


console.log('deepStrictEqual Array ...')
a('{===}', [1,2], [1,2])
a('!{===}', [1,2], [2,1])
a('!{===}', ['1',2], [1,2])
a('!{===}', [['1',2], [1,2]], [[1,2], ['1',2]])
a('{===}', [['1',2], [1,2]], [['1',2], [1,2]])

console.log('deepEqual Set')
a('{==}', new Set([1,2]), new Set([1,2]))//
a('!{==}', new Set([1,2]), new Set([2,1]))
a('{==}', new Set(['1',2]), new Set([1,2]))//
a('{==}', new Set([['1',2], [1,2]]), new Set([[1,2], ['1',2]]))//

console.log('deepStrictEqual Set')
a('{===}', new Set([1,2]), new Set([1,2]))
a('!{===}', new Set([1,2]), new Set([2,1]))
a('!{===}', new Set(['1',2]), new Set([1,2]))
a('!{===}', new Set([['1',2], [1,2]]), new Set([[1,2], ['1',2]]))
a('{===}', new Set([['1',2], [1,2]]), new Set([['1',2], [1,2]]))

console.log('deepEqual Map')
a('{==}', new Map([[1,2]]), new Map([[1,2]]))
a('{==}', new Map([[1,'2']]), new Map([[1,2]]))
a('!{==}', new Map([[1,'2']]), new Map([['1',2]]))
	// @ts-ignore
a('{==}', new Map([['1',2], [1,2]]), new Map([[1,2], ['1',2]]))

console.log('deepStrictEqual Map')
a('{===}', new Map([[1,2]]), new Map([[1,2]]))
a('!{===}', new Map([['1',2]]), new Map([[1,2]]))
	// @ts-ignore
a('{===}', new Map([['1',2], [1,2]]), new Map([[1,2], ['1',2]]))
	// @ts-ignore
a('{===}', new Map([['1',2], [1,2]]), new Map([['1',2], [1,2]]))

console.log('deepEqual Object')
a('{==}', {1: 1}, {'1': '1'})
a('{==}', {0:{1: 1}}, {'0': {'1': '1'}})
a('!{==}', {0:{1: 1, 2:2}}, {'0': {'1': '1'}})
a('!{==}', {0:{1: 1}}, {'0': {'1': '1', 2: 2}})

console.log('deepStrictEqual Object')
a('{===}', {1: 1}, {'1': 1})
a('!{===}', {1: 1}, {'1': '1'})

a('{===}', {0:{1: 1}}, {'0': {'1': 1}})
a('!{===}', {0:{1: 1}}, {'0': {'1': '1'}})

a('!{===}', {0:{1: 1, 2:2}}, {0: {1: 1}})
a('!{===}', {0:{1: 1}}, {0: {1: 1, 2: 2}})

function A(a,b) {this.a = a; this.b = b}
function B(a,b) {this.a = a; this.b = b}

console.log('deepEqual Instance')
a('{==}', new A(1,2), new A(1,2))
a('{==}', new A(1,2), new A('1',2))
a('!{==}', new A(1,2), new A(1,3))

a('{==}', new A(1,2), new B(1,2))
a('{==}', new A(1,2), new B('1',2))
a('!{==}', new A(1,2), new B(1,3))

console.log('deepStrictEqual Instance')
a('{===}', new A(1,2), new A(1,2))
a('!{===}', new A(1,2), new A('1',2))
a('!{===}', new A(1,2), new A(1,3))

a('!{===}', new A(1,2), new B(1,2))
a('!{===}', new A(1,2), new B('1',2))
a('!{===}', new A(1,2), new B(1,3))
