'use strict'

import React from 'react'
import Board from './components/Board'
import List from './components/List'
import Card from './components/Card'

//console.log(Board, List, Card)

const Wrapper = React.createClass({
  render() {
    return (
      <Board>
        <List layer="CollapsedTasks" layerOn={true}>
          <Card />
        </List>
        <List layer="ExpandedTasks" layerOn={true}>
          <Card />
        </List>
      </Board>
    )
  }
})

window.onload = () => {
  React.render(<Wrapper />, document.getElementById('wrapper'))
}
