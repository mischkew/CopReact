'use strict'

let layers = new Map()

class Layers {
  constructor() {
  }

  setupLayer(layerName) {
    if (this.layerExists(layerName)) {
      return this.get(layerName)
    }

    let layer = new Layer(layerName)
    layers.set(layerName, layer)
    return layer
  }

  layerExists(layerName) {
    return layers.has(layerName)
  }

  [Symbol.iterator]() {
    return layers[Symbol.iterator]()
  }

  get(layerName) {
    return layers.get(layerName)
  }
}

export default new Layers()
