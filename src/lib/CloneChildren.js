'use strict'

import React from 'react'

let CloneChildren = (children) => {
  let _clone = (child) => React.cloneElement(child)
  return React.Children.map(children, _clone)
}

export default CloneChildren
