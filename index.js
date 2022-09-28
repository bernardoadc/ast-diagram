import esprima from 'esprima'
import traverse from 'ast-traverse'

const ast = esprima.parseScript(`
  const x = {
    y: {
      z: function b () {
      }
    }
  }

  function a (x) {
    x.y.z()
  }

  a(3)
`)

var Program = ''
var FunctionDeclaration = ''
var CallExpression = false
var Identifier = ''
traverse(ast, {
  pre: function (node) {
    if (node.type === 'Program') Program = '* --> '
    if (node.type === 'FunctionDeclaration') FunctionDeclaration = node.id.name + ' --> '
    CallExpression = (node.type === 'CallExpression')
    if (CallExpression && node.type === 'Identifier') Identifier += node.name + '.'
  },
  post: function (node) {
    if (node.type === 'Program') console.log(Program)
    if (node.type === 'FunctionDeclaration') console.log(FunctionDeclaration)
    if (node.type === 'CallExpression') {
      // CallExpression = CallExpression.substring(0, -1)
      console.log(Identifier)
      CallExpression = false
      Identifier = ''
    }
  }
})
