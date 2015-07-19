'use strict'

import _ from 'lodash'
import Layers from './Layers'
import React from 'react/addons'

const ContextControl = {
  setupLayer(layerName) {
    this.layerName = layerName
    this.layer = Layers.setupLayer(layerName)

    if (!this.layer) {
      throw new Error('could not instantiate a new layer for this context')
    }
  },

  getInitialState() {
    return {
      activeLayers: this.alreadyActiveLayers()
    }
  },

  childContextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  },

  getChildContext() {
    return {
      layers: this.state.activeLayers
    }
  },

  /** PUBLIC API **/

  alreadyActiveLayers() {
    return this.context && this.context.layers && _.isArray(this.context.layers) ? this.context.layers : []
  },

  applyLayersToSubcomponents() {
    this.setState({ activeLayers: this.alreadyActiveLayers().concat([ this.layer ]) })
  },

  unapplyLayersFromSubcomponents() {
    this.setState({ activeLayers: this.alreadyActiveLayers() })
  }
}

export default ContextControl
