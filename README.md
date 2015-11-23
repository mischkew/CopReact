# CopReact
Context-oriented programming integration for React based on ContextJS.

## Description
Cross-cutting concerns are to be considered in constantly evolving software projects. The programming paradigm context-oriented programming presents language constructs like layers and partial methods to manage cross-cuts. The management of layer composition can be a non-trivial task too. This paper introduces an approach of explicit layer definitions with implicit layer activation. Therefore the position of stateful web UI-components in the DOM-tree is encoded as the component's context. Layers are directly attached to components. Layer scope is propagated through the DOM-hierarchy so that nested components can apply behavioral variations accordingly. This solution is based on ContextJS and React.

## Read the paper
[implicit-layer-composition.pdf](implicit-layer-composition.pdf)
