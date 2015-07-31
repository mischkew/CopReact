'use strict'

import React from 'react/addons'

const ChildComponent = React.createClass({
  contextTypes: {
    isSpecialParent: React.PropTypes.bool
  },

  myLayeredMethod() {
    if (this.context.isSpecialParent) {
      return 'I am layered text.'
    } else {
      return 'I am unlayered text.'
    }
  },

  render() {
    return (<div>{this.myLayeredMethod()}</div>)
  }
})

const ParentComponent = React.createClass({
  getChildContext() {
    return {
      isSpecialParent: true
    }
  },

  childContextTypes: {
    isSpecialParent: React.PropTypes.bool
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

window.onload = () => {
  React.addons.Perf.start()
  React.render(<ParentComponent><ChildComponent /></ParentComponent>, document.body)
  React.addons.Perf.stop()
  React.addons.Perf.printInclusive()
}
