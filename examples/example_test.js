// import { test, describe, it, assert } from 'https://cdn.jsdelivr.net/gh/eobrain/in-browser-test/index.min.js'
import { test, describe, it, assert } from '../index.js'
import { setImmediate } from './example.js'

// These examples are taken from https://nodejs.org/api/test.html#test-runner

test('synchronous passing test', () => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('synchronous failing test', () => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2)
})

test('asynchronous passing test', async () => {
  // This test passes because the Promise returned by the async
  // function is settled and not rejected.
  assert.strictEqual(1, 1)
})

test('asynchronous failing test', async () => {
  // This test fails because the Promise returned by the async
  // function is rejected.
  assert.strictEqual(1, 2)
})

test('failing test using Promises', () => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'))
    })
  })
})

describe('A thing', () => {
  it('should work', () => {
    assert.strictEqual(1, 1)
  })

  it('should be ok', () => {
    assert.strictEqual(2, 2)
  })

  describe('a nested thing', () => {
    it('should work', () => {
      assert.strictEqual(3, 3)
    })
  })
})
