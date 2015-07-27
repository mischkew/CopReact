'use strict'

import React from 'react'
import CloneChildren from '../lib/CloneChildren'
import ContextControl from '../lib/ContextControl'

const List = React.createClass({
  mixins: [ ContextControl ],

  componentDidMount() {
    this.setupLayerOnMount()
  },

  render() {
    return (
      <div>
        {CloneChildren(this.props.children)}
      </div>
    )
  }
})

export default List
