<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 -->
# assert-op

*assertions with javascript comparison operators*

• [Why](#why) • [Example](#example) • [Features](#features) • [License](#license) •

## Why

This originated as an attempt to have assertions that are less verbose because `assert.notDeepStrictEqual` and the likes are ugly.

## Example

```javascript
const assert = require('assert-op')

assert('==', 2, 2)
assert('!==', 3, 4, 'should be unequal')
assert('<', 1, 2)
assert('!', null, 'should be falsy')
assert('!{===}', [], 'str', 'should be notDeepStrictEqual')
assert('{==}', [2], 2, 'should be deepEqual')
assert('!==', 3, 4)
assert('{===}', new Set([1,2]), new Set([1,2]))
assert('{===}', new Map([[1,2]]), new Map([[1,2]]))
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
* Single function
* Support ES2015 `Set` and `Map`
* ES Module, Browser IIFE and Node CJS support


# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
