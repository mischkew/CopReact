'use strict'

import React from 'react/addons'
import ContextControl from './lib/ContextControl'
import Context from './lib/Context'
import Layers from './lib/Layers'
import _ from 'lodash'


const divStyle = {
  width: 100,
  height: 100,
  backgroundColor: 'red'
}

const ParentComponent = React.createClass({
  mixins: [ ContextControl ],

  getInitialState() {
    return {
      layerOn: false
    }
  },

  componentDidMount() {
    this.attachLayer('myLayer')
    this.applyLayersToSubcomponents()

    this.setState({ layerOn: true })
  },

  handleClick() {
    let layerOn = !this.state.layerOn
    let newState = React.addons.update(this.state, {
      layerOn: { $set: layerOn }
    })
    this.setState(newState)

    if (layerOn) {
      console.log('apply layers')
      this.applyLayersToSubcomponents()
    } else {
      this.unapplyLayersFromSubcomponents()
    }
  },

  render() {
    console.log('render of parent', this.getChildContext())
    return (
      <div style={divStyle}>
        <div onClick={this.handleClick}>ToggleLayer</div>
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})

const divChildStyle = {
  width: 50,
  height: 50,
  backgroundColor: 'blue'
}

const LayeredContext = Context
_.extend(LayeredContext, {
  renderExtra() {
    return 'my extra text'
  }
})

Layers.setupLayer('myLayer').refineObject(LayeredContext, {
  renderExtra() {
    return cop.proceed() + 'my special layered extra'
  }
})

const ChildComponent = React.createClass({
  mixins: [ LayeredContext ],

  render() {
    console.log(this.context)
    return (
      <div style={divChildStyle}>
        {this.renderExtra()}
      </div>
    )
  }
})

const Wrapper = React.createClass({
  render() {
    return (<div className="wrapped">
      <ParentComponent><ChildComponent /></ParentComponent>
    </div>)
  }
})

window.onload = () => {
  React.render(<Wrapper />, document.getElementById('wrapper'))
}
