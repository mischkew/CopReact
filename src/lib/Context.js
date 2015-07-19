'use strict'

import React from 'react/addons'
import _ from 'lodash'

const Context = {
  hasLayers() {
    return this.context && this.context.layers
  },

  updateLayers() {
    console.log('update layers')
    console.log('has layers?', this.context.layers)
    let layers = this.hasLayers() ? this.context.layers : []
    cop.withLayers(layers, () => this.render())
    // console.log('set with layers:', this.renderExtra())
  },

  // componentWillMount() {
  //   this.updateLayers()
  // },

  componentDidUpdate() {
    this.updateLayers()
  },

  // shouldComponentUpdate() {
  //   return _.difference(this.activeLayers(), this.context.layers).length !== 0
  //     && _.difference(this.context.layers, this.activeLayers()).length !== 0
  // },

  contextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  }
}

Object.extend(Context, LayerableObjectTrait)

export default Context
