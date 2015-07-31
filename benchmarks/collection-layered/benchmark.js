'use strict'

import React from 'react/addons'
import Context from '../../src/lib/Context'
import ContextControl from '../../src/lib/ContextControl'
import Layers from '../../src/lib/Layers'

const ParentComponent = React.createClass({
  mixins: [ ContextControl ],

  componentDidMount() {
    this.setupLayerOnMount()
  },

  render() {
    return (
      <div>
        I am a Parent Component.
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})

const  CollectionFactory  = {
  buildChild(layerName) {
    const LayeredContext = {}
    Object.extend(LayeredContext, Context)
    Object.extend(LayeredContext, {
      myLayeredMethod() {
        return 'I am unlayered text.'
      }
    })

    Layers
      // same layer name as attached in the parent component
      .setupLayer(layerName)
      .refineObject(LayeredContext, {
        myLayeredMethod() {
          return 'I am layered text for '+layerName+'.'
        }
      })

    const ChildComponent = React.createClass({
      mixins: [ LayeredContext ],

      render() {
        return (<div>{this.myLayeredMethod()}</div>)
      }
    })

    return ChildComponent
  },

  buildCollection(numOfSiblings) {
    const collection = []
    for (let i = 0; i < numOfSiblings; i++) {
      const layerName = 'MyLayer'+i
      const ChildComponent = this.buildChild(layerName)
      collection.push(<ParentComponent layer={layerName} layerOn={true}><ChildComponent /></ParentComponent>)
    }

    return collection
  }
}

window.onload = () => {
  const numOfRenderings = 100
  const results = []
  let sum = 0

  for (let i = 0; i < numOfRenderings; i++) {
    React.addons.Perf.start()
    React.render(<div>{CollectionFactory.buildCollection(1000)}</div>, document.body)
    React.addons.Perf.stop()

    React.unmountComponentAtNode(document.body)
    let m = React.addons.Perf.getLastMeasurements()
    let totalTime = m[1].totalTime
    results.push(totalTime)
    sum += totalTime
  }

  console.log('Average total time in %d runs: %dms', numOfRenderings, sum/numOfRenderings)
  console.log('All results:', results)
}
