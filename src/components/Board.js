'use strict'

import React from 'react'
import CloneChildren from '../lib/CloneChildren'
const boardStyle = {}

const Board = React.createClass({
  render() {
    return (
      <div style={boardStyle}>
        {CloneChildren(this.props.children)}
      </div>
    )
  }
})

export default Board
