// @ts-ignore
import t from '../index.js'

//function logE(e) {t('ERR:',e.message); return true}
function fail() { throw Error('err') }
function pass() { }

t(`throws`, a => {
	a('throws', fail, 'should throw')
	a('throws', fail, Error)
	a('throws', fail, ()=>true, 'should throw')
	a('throws', fail, e => e.message === 'err', 'should throw')
	a('throws', fail, /^err$/, 'should throw')
	a('throws', ()=>{ a('throws', pass) }, /^function.*throws/, 'valid message')
})

t('!throws', a=> {
	a('!throws', pass)
	a('!throws', fail, ()=>{ return false }, 'shouldn\'t throw')
	a('!throws', pass, function(e) { return e.message !== 'err' }, 'shouldn\'t throw')
	a('throws', ()=>{ a('!throws', fail) }, /^function.*!throws/, 'valid message')
})

t('===, !==, ==, !=', a=>{
	a(`===`, 2, 2)
	a('===', 2, 2)
	a('throws', ()=>{ a('===', {}, {}) }, /^\{} === {}$/, 'valid message')
	a('!==', {}, {})
	a('throws', ()=>{ a('!==', 2, 2) }, /^2 !== 2$/, 'valid message')
	a('==', null, undefined)
	a('throws', ()=>{ a('==', null, false) }, /^null == false$/, 'valid message')
	a('!=', undefined, true)
	a('throws', ()=>{ a('!=', undefined, null) }, /^undefined != null$/, 'valid message')
})

t('>, <, >=, <=, !>, !<, !>=, !<=', a => {
	a('>', 3, 2)
	a('throws', a.bind(null, '>', {a:1}, 3), /^\{a:1\} > 3$/, 'valid message')
	a('>=', -2, -3)
	a('throws', ()=>{ a('>=', [1], 3) }, /^\[1\] >= 3$/, 'valid message')
	a('<', 1, 2)
	a('throws', ()=>{ a('<', {a:1}, 3) }, /^\{a:1\} < 3$/, 'valid message')
	a('<=', -3, -2)
	a('throws', ()=>{ a('<=', [1], 0) }, /^\[1\] <= 0$/, 'valid message')

	a('!<=', 3, 2)
	a('throws', ()=>{ a('!<=', 2, 3) }, /^2 !<= 3$/, 'valid message')
	a('!<', -2, -3)
	a('throws', ()=>{ a('!<', [1], 3) }, /^\[1\] !< 3$/, 'valid message')
	a('!>=', 1, 2)
	a('throws', ()=>{ a('!>=', 4, 3) }, /^4 !>= 3$/, 'valid message')
	a('!>', -3, -2)
	a('throws', ()=>{ a('!>', 4, 3) }, /^4 !> 3$/, 'valid message')
})

t('!, !!', a=> {
	a('!', false)
	a('throws', ()=>{ a('!', true) }, /! true$/, 'valid message')
	a('!', null)
	a('throws', ()=>{ a('!', 1) }, /! 1$/, 'valid message')
	a('!', '')
	a('throws', ()=>{ a('!', 'a') }, /! "a"$/, 'valid message')

	a('!!', true)
	a('throws', ()=>{ a('!!', false) }, /!! false$/, 'valid message')
	a('!!', 1)
	a('throws', ()=>{ a('!!', 0) }, /!! 0$/, 'valid message')
	a('!!', 'a')
	a('throws', ()=>{ a('!!', '') }, /!! ""$/, 'valid message')
})

t('{===}, {==}, !{===}, !{==} ...', a => {
	a('{===}', [0,1], [0,1])
	a('throws', ()=>{ a('{===}', [0,1], [1,0]) }, /^\[0,1\] \{===\} \[1,0\]$/, 'valid message')
	a('{===}', {0:1}, {0:1})
	a('throws', ()=>{ a('{===}', {0:1}, {1:0}) }, /^\{0:1\} \{===\} \{1:0\}$/, 'valid message')
	a('{===}', new Set([0,1]), new Set([0,1]))
	a('throws', ()=>{ a('{===}', new Set([0,1]), new Map([[1,0]])) }, /^\Set \{===\} Map$/, 'valid message')
})

t('deepEqual Array', a => {
	a('{==}', [1,2], [1,2])
	a('!{==}', [1,2], [2,1])
	a('{==}', ['1',2], [1,2])
	a('{==}', [['1',2], [1,2]], [[1,2], ['1',2]])
})

t('deepStrictEqual Array', a => {
	a('{===}', [1,2], [1,2])
	a('!{===}', [1,2], [2,1])
	a('!{===}', ['1',2], [1,2])
	a('!{===}', [['1',2], [1,2]], [[1,2], ['1',2]])
	a('{===}', [['1',2], [1,2]], [['1',2], [1,2]])
})

t('deepEqual Set', a => {
	a('{==}', new Set([1,2]), new Set([1,2]))//
	a('!{==}', new Set([1,2]), new Set([2,1]))
	a('{==}', new Set(['1',2]), new Set([1,2]))//
	a('{==}', new Set([['1',2], [1,2]]), new Set([[1,2], ['1',2]]))//
})

t('deepStrictEqual Set', a => {
	a('{===}', new Set([1,2]), new Set([1,2]))
	a('!{===}', new Set([1,2]), new Set([2,1]))
	a('!{===}', new Set(['1',2]), new Set([1,2]))
	a('!{===}', new Set([['1',2], [1,2]]), new Set([[1,2], ['1',2]]))
	a('{===}', new Set([['1',2], [1,2]]), new Set([['1',2], [1,2]]))
})

t('deepEqual Map', a => {
	a('{==}', new Map([[1,2]]), new Map([[1,2]]))
	a('{==}', new Map([[1,'2']]), new Map([[1,2]]))
	a('!{==}', new Map([[1,'2']]), new Map([['1',2]]))
	// @ts-ignore
	a('{==}', new Map([['1',2], [1,2]]), new Map([[1,2], ['1',2]]))
})

t('deepStrictEqual Map', a => {
	a('{===}', new Map([[1,2]]), new Map([[1,2]]))
	a('!{===}', new Map([['1',2]]), new Map([[1,2]]))
	// @ts-ignore
	a('{===}', new Map([['1',2], [1,2]]), new Map([[1,2], ['1',2]]))
	// @ts-ignore
	a('{===}', new Map([['1',2], [1,2]]), new Map([['1',2], [1,2]]))
})

t('deepEqual Object', a => {
	a('{==}', {1: 1}, {'1': '1'})
	a('{==}', {0:{1: 1}}, {'0': {'1': '1'}})
	a('!{==}', {0:{1: 1, 2:2}}, {'0': {'1': '1'}})
	a('!{==}', {0:{1: 1}}, {'0': {'1': '1', 2: 2}})
})

t('deepStrictEqual Object', a => {
	a('{===}', {1: 1}, {'1': 1})
	a('!{===}', {1: 1}, {'1': '1'})

	a('{===}', {0:{1: 1}}, {'0': {'1': 1}})
	a('!{===}', {0:{1: 1}}, {'0': {'1': '1'}})

	a('!{===}', {0:{1: 1, 2:2}}, {0: {1: 1}})
	a('!{===}', {0:{1: 1}}, {0: {1: 1, 2: 2}})
})


t('deepEqual Instance', a => {
	function A(aa,bb) { this.a = aa; this.b = bb }
	function B(aa,bb) { this.a = aa; this.b = bb }

	a('{==}', new A(1,2), new A(1,2))
	a('{==}', new A(1,2), new A('1',2))
	a('!{==}', new A(1,2), new A(1,3))

	a('{==}', new A(1,2), new B(1,2))
	a('{==}', new A(1,2), new B('1',2))
	a('!{==}', new A(1,2), new B(1,3))
})

t('deepStrictEqual Instance', a => {
	function A(aa,bb) { this.a = aa; this.b = bb }
	function B(aa,bb) { this.a = aa; this.b = bb }

	a('{===}', new A(1,2), new A(1,2))
	a('!{===}', new A(1,2), new A('1',2))
	a('!{===}', new A(1,2), new A(1,3))

	a('!{===}', new A(1,2), new B(1,2))
	a('!{===}', new A(1,2), new B('1',2))
	a('!{===}', new A(1,2), new B(1,3))
})
