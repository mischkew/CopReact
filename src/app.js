'use strict'

import React from 'react'

let Component = React.createClass({
  myFunc() { return 'func' },
  render() {
    return <div>{this.myFunc()}</div>
  }
})

let L = new Layer('layer')
L.refineClass(Component, {
  myFunc() { return cop.proceed() + 'func' }
})

class MyClass {
  myFunc() { return 'func' }
}

L.refineClass(MyClass, {
  myFunc() { return cop.proceed() + 'func' }
})

let m = new MyClass()
console.log(m.myFunc())
L.beGlobal()
console.log(m.myFunc())

window.onload = () => {
  React.render(<Component></Component>, document.body)
}
