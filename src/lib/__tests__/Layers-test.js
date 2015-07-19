'use strict'

jest.dontMock('../Layers')
// import Layers from '../Layers'

console.log('running one')

describe( 'Layers', () => {
  
  let Layers = require('../layers')
  // let setOfLayers = ['layer1', 'layer2', 'layer3']
  let layerName = 'dummyLayer'

  it( 'should create non existant layer', () => {
    let createdLayer = Layers.setupLayer(layerName)

    expect(Layers.get(layerName).getName()).toEqual(layerName)
    expect(Layers.get(layerName)).toBe(createdLayer)
  })

  it( 'should not create an already existing layer', () => {
    Layers.setupLayer(layerName)
    let createdLayer = Layers.setupLayer(layerName)

    expect(Layers.get(layerName)).toBeDefined()
    expect(createdLayer).toBeNull()
  })

  it( 'should return an existing layer', () => {
    expect(false).toBeTruthy()
  })

  it( 'should iterate over all layers', () => {
    expect(false).toBeTruthy()
  })

})
