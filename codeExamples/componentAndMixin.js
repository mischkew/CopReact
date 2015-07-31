/* CODE EXAMPLE 2 -- Component and Mixin */

import React from 'react'

// a mixin is a plain object
let MyMixin = {
  generateText() {
    return 'I am a Component'
  }
}

const MyComponent = React.createClass({
  // include reusable functionality
  mixins: [ MyMixin ],

  // this method produces DOM fragments
  render() {
    // access the text generator method from the mixin
    return (<div>{this.generateText()}</div>)
  }
})

// render an instance of the component into the DOM
React.render(<MyComponent />, document.body)
