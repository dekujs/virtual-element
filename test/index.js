/**
 * @jsx element
 */

var assert = require('assert')
var element = require('../')

it('should throw an error for missing type', function(done){
  try {
    element()
  } catch (e) {
    done()
  }
})

it('should set the tagName', function(){
  assert(element('span').type === 'span')
})

it('should set attributes', function(){
  var node = element('div', { name: 'Foo' })
  assert(node.attributes.name === 'Foo')
})

it('should set class from a string', function () {
  var node = element('div', { class: 'foo bar baz' })
  assert(node.attributes.class === 'foo bar baz')
})

it('should render styles from a string', function () {
  var node = element('div', { style: 'text-align:leftheight:10pxwidth:10px' })
  assert(node.attributes.style === 'text-align:leftheight:10pxwidth:10px')
})

it('it should allow using array spread on children', function () {
  var children = [element('span')]
  var node = element('div', null, [
    ...children
  ])
  assert(node.children.length === 1)
  assert(node.children[0].type === 'span')
})

it('it should flatten nested children', function () {
  var node = element('div', null, [
    [element('span')]
  ])
  assert(node.children.length === 1)
  assert(node.children[0].type === 'span')
})

it('should allow a single DOM node as a child', function () {
  var node = element('div', null, element('span'))
  assert(node.children[0].type === 'span')
})

it('should allow children as rest params', function () {
  var node = element('div', { foo: 'bar' }, 'one', 'two', 'three', 'four')
  assert.equal(node.children.length, 4)
})

it('should allow children as rest params with no attrs', function () {
  var node = element('div', null, 'one', 'two', 'three', 'four')
  assert.equal(node.children.length, 4)
})

it('should allow skipping attributes and using an array of children', function () {
  var node = element('div', ['foo'])
  assert(node.children[0] === 'foo')
})

it('should allow skipping attributes and using a single child', function () {
  var node = element('div', 'foo')
  assert(node.children[0] === 'foo')
})

it('should allow sparse lists of children', function () {
  var node

  node = element('div', {}, null, 'a', 'b', null, 'c')
  assert(node.children.length, 5)

  // even w/o attrs
  node = element('div', 'a', null, 'c')
  assert(node.children.length, 3)
})

it('should allow nested arrays as children', function () {
  var node

  node = element('div', {}, null, [ 'a', 'b' ], 'c')
  assert(node.children.length, 3)

  node = element('div', null, [ 'a', 'b' ], 'c')
  assert(node.children.length, 3)
})

it('should not treat undefined as a child', function () {
  var node

  node = element('div')
  assert.strictEqual(node.children.length, 0)

  node = element('div', undefined)
  assert.strictEqual(node.children.length, 0)

  node = element('div', {})
  assert.strictEqual(node.children.length, 0)

  node = element('div', {}, undefined)
  assert.strictEqual(node.children.length, 0)
})

it('should not ignore subsequent children when the first is undefined', function () {
  var node

  node = element('div', {}, undefined, 'a')
  assert.strictEqual(node.children.length, 1)
})

it('render nodes that work with JSX', function(){
  assert.deepEqual(
    <div class="one" id="foo">Hello World</div>,
    element('div', { class: "one", id: "foo" }, ['Hello World'])
  )
})
