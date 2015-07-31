/* CODE EXAMPLE 7 - Showcase for implicit layer activation */

// rendering identical ChildComponents in a different context
React.render(
  <div>
    <ParentComponent layerName="MyLayer">
      <ChildComponent /> // shows 'I am layered text.'
    </ParentComponent>
    <ParentComponent>
      <ChildComponent /> // shows 'I am unlayered text.'
    </ParentComponent>
  </div>, document.body
)
