'use strict'

let layers = new Map()

class Layers {
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

  get(layerName) {
    return layers.get(layerName)
  }

  [Symbol.iterator]() {
    return layers[Symbol.iterator]()
  }
}

export default new Layers()
