const $body = document.getElementsByTagName('body')[0]
$body.insertAdjacentHTML(
  'beforeend',
  '<h1>Test Output</h1><ul id="$testLog"></ul>'
)

/* global $testLog */

const addLi = ($element, html) =>
  $element.insertAdjacentHTML('beforeend', `<li>${html}</li>`)

let $suite = $testLog
export const describe = (name, fn) => {
  const describeId = `d${Math.random()}`
  addLi($testLog, `${name}<ul id="${describeId}"></ul>`)
  $suite = document.getElementById(describeId)
  fn.$parent = $suite
  fn()
}

export const test = async (description, fn) => {
  const $parent = $suite
  try {
    const y = fn()
    if (isPromise(y)) {
      await y
    }
    addLi($parent, `✔️ ${where()}${description}`)
  } catch (error) {
    addLi($parent, `❌ ${where()}${description} - ${error.message}`)
  }
}

export const it = async (description, fn) => test('It ' + description, fn)

export const assert = (condition, message) => {
  if (!condition) {
    throw new Error((message || 'Assertion failed') + ` (${where()})`)
  }
}

assert.strictEqual = (actual, expected, message) => {
  const prefix = message ? `${message}: ` : ''
  if (actual !== expected) {
    throw new Error(
      `${prefix}Expected ${expected}, but got ${actual} (${where()})`
    )
  }
}

const where = () => {
  const stack = new Error().stack.split('\n')
  return (stack.length >= 4 ? stack[3] : '')
    .replace(/\s*at /, '')
    .replace(/.*\/([^/]+)/, '$1 - ')
}

const isPromise = (x) => Boolean(x && typeof x.then === 'function')
