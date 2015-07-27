'use strict'

import _ from 'lodash'
import Layers from './Layers'
import React from 'react'
import warning from 'react/lib/warning'

const ContextControl = {
  attachLayer(layerName) {
    this.layerName = layerName
    this.layer = Layers.setupLayer(layerName) // create or get layer

    if (process.env.NODE_ENV !== 'production') {
      warning(
        this.layer,
        'could not instantiate a new layer for this context'
      )
    }
  },

  getInitialState() {
    return {
      activeLayers: this.alreadyActiveLayers()
    }
  },

  getDefaultProps() {
    return {
      layerOn: false
    }
  },

  propTypes: {
    layer: React.PropTypes.string,
    layerOn: React.PropTypes.bool
  },

  childContextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  },

  getChildContext() {
    return {
      layers: this.state.activeLayers
    }
  },

  setupLayerOnMount() {
    if (process.env.NODE_ENV !== 'production') {
      warning(
        this.props.layer !== undefined,
        'setup layer was called but no layer property was given'
      )
    }

    if (this.props.layer !== null) {
      this.attachLayer(this.props.layer)

      if (this.props.layerOn) {
        this.applyLayersToSubcomponents()
      }
    }
  },

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
