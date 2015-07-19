'use strict'
// import 'lib/cop/miniprototype'
// import 'lib/cop/MiniBase'
// import 'lib/cop/Layers'
import React from 'react/addons'
// import lodash from 'lodash'

let layeredObj = {
  method() {
    return 5
  }
}

let wrapper = {
  traverse() {
    return layeredObj.method()
  }
}

let layer = new Layer("layer1")
layer.refineObject(layeredObj, {
  method() {
    return cop.proceed() + 6
  }
})

const MixinA = {
  componentWillMount() {
    console.log("mixin mount")
    const currentLayers = this.getWithLayers()
    // TODO: make the concat unqiue
    this.setWithLayers(currentLayers.concat(this.context.layers))
  },

  componentWillUnmount() {
    // do I even need to remove layers when component unmounts anyway?
    const currentLayers = this.getWithLayers()
    const layersWithoutContextLayers = _.difference(currentLayers, this.context.layers)
    this.setWithLayers(layersWithoutContextLayers)
  }
}

const MixinB = {
  func() {}
}

Object.extend(MixinA, LayerableObjectTrait)

layer.refineObject(MixinB, {
  func() {
    console.log("advanced logging")
  }
})

const Subcomponent = React.createClass({

  mixins: [MixinA, MixinB],

  contextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  },

  componentDidMount() {
    console.log("Subcomponent did mount", this.context)
    this.func()
  },

  render() {
    return (<h1>A subheader!</h1>)
  }
})

cop.withLayers([layer], () => {
  console.log(wrapper.traverse())
})

const SomeWrapper = React.createClass({
  render() {
    return (<div>
      <Subcomponent />
      <Subcomponent />
    </div>)
  }
})
// layer.beGlobal()


const Component = React.createClass({

  childContextTypes: {
    layers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Layer))
  },

  getChildContext() {
    return {
      layers: [layer]
    }
  },

  render() {
    return (<div>
      <SomeWrapper />
    </div>)
  }
})

window.onload = () => {
  React.render(<Component />, document.body)
}
