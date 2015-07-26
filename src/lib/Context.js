'use strict'

import React from 'react/addons'

let Context = {}
Object.extend(Context, LayerableObjectTrait)
Object.extend(Context, {
  hasLayers() {
    return this.context && this.context.layers
  },

  activeLayers() {
    return this.hasLayers() ? this.context.layers : []
  },

  contextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  }
})

export default Context
