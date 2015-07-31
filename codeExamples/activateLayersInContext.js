/* CODE EXAMPLE 5 - Activating layers in Context Mixin */

// inside the Context Mixin
activeLayers() {
  return this.hasLayers() ? this.context.layers : []
}
