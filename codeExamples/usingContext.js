/* CODE EXAMPLE 6 - Using Context Mixin in a child Component */

import React from 'react'
import Context from 'lib/Context'
import Layers from 'lib/Layers'

const LayeredContext = {}
Object.extend(LayeredContext, Context)
Object.extend(LayeredContext, {
  myLayeredMethod() {
    return 'I am unlayered text.'
  }
})

Layers
  // same layer name as attached in the parent component
  .setupLayer('myLayer')
  .refineObject(LayeredContext, {
    myLayeredMethod() {
      return 'I am layered text.'
    }
  })

const ChildComponent = React.createClass({
  mixins: [ LayeredContext ],

  render() {
    return (<div>{this.myLayeredMethod()}</div>)
  }
})
