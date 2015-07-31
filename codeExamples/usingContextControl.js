/* CODE EXAMPLE 4 - A ParentComponent using ContextControl */

import React from 'react'
import ContextControl from 'lib/ContextControl'

const ParentComponent = React.createClass({
  mixins: [ ContextControl ],

  // a React Lifecycle method
  // when the Component is added to the DOM
  // attach the layer
  componentDidMount() {
    this.setupLayerOnMount()
  },

  render() {
    return (
      <div>
        I am a Parent Component.
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})

// pass a layer and inital layer state on creation
React.render(<ParentComponent layer="MyLayer" layerOn={true}><ChildComponent /></ParentComponent>, document.body)
