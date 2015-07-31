/* CODE EXAMPLE 1 -- A layered Object */

// define a plain object
let myObject = {
  getValue() {
    return 3
  }
}

// create a layer
let layer = new Layer('MyLayer')

// add layered behavior to a plain object
layer.refineObject(myObject, {
  getValue() {
    // similar proceed method known from AspectJ
    return cop.proceed() + 2
  }
})

myObject.method() // returns 3

layer.beGlobal()
myObject.method() // returns 5
layer.beNotGlobal()
