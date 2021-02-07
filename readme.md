<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->
# assert-op

*assertions with javascript comparison operators*

• [Why](#why) • [Example](#example) • [Features](#features) • [License](#license) •

## Why

This originated as an attempt to have assertions that are less verbose because `assert.notDeepStrictEqual` and the likes are ugly.

## Example

```javascript
import t from 'assert-op'

t('mytest', a => {
  a('==', 2, 2)
  a`==`(2, 2, 'this alternate form is also possible')
  a('!==', 3, 4, 'should be unequal')
  a('<', 1, 2)
  a('!', null, 'should be falsy')
  a('!{===}', [], 'str', 'should be notDeepStrictEqual')
  a('{==}', [2], 2, 'should be deepEqual')
  a('!==', 3, 4)
  a('{===}', new Set([1,2]), new Set([1,2]))
  a('{===}', new Map([[1,2]]), new Map([[1,2]]))
})
```

## Features

* Javascript Comparison Operators (`==`, `!==`, `===`, `!===`, `<`, `<=`, `>`, `>=`)
* Negation (`!`, `!!`)
* Other symbols for nested object
  * `{==}`: deepEqual
  * `!{==}`: notDeepEqual
  * `{===}`: strictDeepEqual
  * `!{===}`: notStrictDeepEqual
* `throws` and `!throws` for assert.throws
* Support ES2015 `Set` and `Map`

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
