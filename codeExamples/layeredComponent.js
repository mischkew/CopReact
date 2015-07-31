/* CODE EXAMPLE 3 -- Layered Component with Mixins */

import React from 'react'

// the same mixin and component as before
let MyMixin = {
  generateText() {
    return 'I am a Component'
  }
}

const MyComponent = React.createClass({
  mixins: [ MyMixin ],

  render() {
    return (<div>{this.generateText()}</div>)
  }
})

// add layered behavior to the mixin
let myLayer = new Layer('myLayer')
myLayer.refineObject(MyMixin, {
  generateText() {
    return 'I am a layered Component'
  }
})

// activate the layer
myLayer.beGlobal()

// render a layered instance of the component into the DOM
React.render(<MyComponent />, document.body)
