import a from './assert.js'

/**
 * @param {string} msg
 * @param {function => void)} fcn
 * @returns {void}
 */
export default function test(msg, fcn) {
	try {
		fcn(a)
		console.info('.', msg)
	} catch (err) {
		console.error('!', msg, err)
	}
}
