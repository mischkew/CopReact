'use strict'

import React from 'react/addons'
import Context from '../../src/lib/Context'
import ContextControl from '../../src/lib/ContextControl'
import Layers from '../../src/lib/Layers'

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

const ParentComponent = React.createClass({
  mixins: [ ContextControl ],

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

window.onload = () => {
  React.addons.Perf.start()
  React.render(<ParentComponent layer="MyLayer" layerOn={true}><ChildComponent /></ParentComponent>, document.body)
  React.addons.Perf.stop()
  React.addons.Perf.printInclusive()
}
