import { test, describe, it, assert } from '../index.js'
import { setImmediate } from './example.js'

// These examples are taken from https://nodejs.org/api/test.html#test-runner

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('synchronous failing test', (t) => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2)
})

test('asynchronous passing test', async (t) => {
  // This test passes because the Promise returned by the async
  // function is settled and not rejected.
  assert.strictEqual(1, 1)
})

test('asynchronous failing test', async (t) => {
  // This test fails because the Promise returned by the async
  // function is rejected.
  assert.strictEqual(1, 2)
})

test('failing test using Promises', (t) => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'))
    })
  })
})

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes
  // done() with no arguments.
  setImmediate(done)
})

test('callback failing test', (t, done) => {
  // When the setImmediate() runs, done() is invoked with an Error object and
  // the test fails.
  setImmediate(() => {
    done(new Error('callback failure'))
  })
})

test('top level test', async (t) => {
  t.test('subtest 1', (t) => {
    assert.strictEqual(1, 1)
  })

  t.test('subtest 2', (t) => {
    assert.strictEqual(2, 2)
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
