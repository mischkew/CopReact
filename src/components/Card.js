'use strict'

import React from 'react'
import Context from '../lib/Context'
import Layers from '../lib/Layers'
import _ from 'lodash'

let CollapsedLayer = Layers.setupLayer('CollapsedTasks')
let ExpandedLayer = Layers.setupLayer('ExpandedTasks')

let CardMixin = _.extend({}, Context, {
  getInitialState() {
    return {
      tasks: [ "My Initial Task" ]
    }
  },

  showItems() {
    return (
      <div className="tasks">
        Tasks {this.state.tasks.length}
      </div>
    )
  }
})

ExpandedLayer.refineObject(CardMixin, {
  showItems() {
    let _makeTask = (taskDescription) => {
      return (<li>{taskDescription}</li>)
    }

    let tasks = _.map(this.state.tasks, _makeTask)

    return (
      <div className="tasks expanded">
        <h3>Tasks</h3>
        <ul>
          {tasks}
        </ul>
      </div>
    )
  }
})

const Card = React.createClass({
  mixins: [ CardMixin ],

  render() {
    return (
      <div className="card">
        MyCard
        {this.showItems()}
      </div>
    )
  }
})

export default Card
