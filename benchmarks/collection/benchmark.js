'use strict'

import React from 'react/addons'

const ParentComponent = React.createClass({
  getChildContext() {
    return {
      specialParent: this.props.layer
    }
  },

  childContextTypes: {
    specialParent: React.PropTypes.string
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
    const ChildComponent = React.createClass({
      contextTypes: {
        isSpecialParent: React.PropTypes.bool
      },

      myLayeredMethod() {
        if (this.context.specialParent == layerName) {
          return 'I am layered text for '+layerName+'.'
        } else {
          return 'I am unlayered text.'
        }
      },

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
      collection.push(<ParentComponent layer={layerName}><ChildComponent /></ParentComponent>)
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
