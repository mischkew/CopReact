'use strict'

import React from 'react/addons'
import ContextControl from './lib/ContextControl'
import Context from './lib/Context'
import Layers from './lib/Layers'

const divStyle = {
  width: 100,
  height: 100,
  backgroundColor: 'red'
}

const ParentComponent = React.createClass({
  mixins: [ ContextControl ],

  // getInitialState() {
  //   this.setupLayer('myLayer')
  //   console.log('state', this)
  //   this.applyLayersToSubcomponents()
  //   console.log('child context from parent', this.getChildContext())
  //
  //   return {}
  // },

  componentDidMount() {
    this.setupLayer('myLayer')
    this.applyLayersToSubcomponents()
  },

  render() {
    return (
      <div style={divStyle}>
        <ChildComponent />
      </div>
    )
  }
})

const divChildStyle = {
  width: 50,
  height: 50,
  backgroundColor: 'blue'
}

const LayeredContext = {
  renderExtra() {
    console.log('render extra')
    return 'my extra text'
  }
}
// Object.extend(LayeredContext, LayerableObjectTrait)

Layers.setupLayer('myLayer').refineObject(LayeredContext, {
  renderExtra() {
    return cop.proceed() + 'my special layered extra'
  }
})


const ChildComponent = React.createClass({
  mixins: [ Context, LayeredContext ],

  render() {
    console.log('child context layers', this.context.layers)
    return (
      <div style={divChildStyle}>
        {this.renderExtra()}
      </div>
    )
  }
})

window.onload = () => {
  React.render(<ParentComponent />, document.body)
}

// LayeredContext.setWithLayers([Layers.get('myLayer')])
// console.log('manual', LayeredContext.renderExtra())
// LayeredContext.setWithLayers([])
// console.log('manual2', LayeredContext.renderExtra())
