# DocumentFragment

The **DocumentFragment** interface represents a minimal document object that has no parent. It is used as a lightweight version of [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) that stores a segment of a document structure comprised of nodes just like a standard document. 

The key difference is that because the document fragment isn't part of the active document tree structure, ==changes made to the fragment don't affect the document, cause [reflow](https://developer.mozilla.org/en-US/docs/Glossary/reflow), or incur any performance impact that can occur== when changes are made.

A common use for `DocumentFragment` is to create one, assemble a DOM subtree within it, then append or insert the fragment into the DOM using [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface methods such as [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) or [`insertBefore()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore). Doing this moves the fragment's nodes into the DOM, leaving behind an empty `DocumentFragment`. Because all of the nodes are inserted into the document at once, only one reflow and render is triggered instead of potentially one for each node inserted if they were inserted separately.

This interface is also of great use with Web components: elements contain a `DocumentFragment` in their [`HTMLTemplateElement.content` property.

An empty `DocumentFragment` can be created using the [`document.createDocumentFragment()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment) method or the constructor.

## Properties

*This interface has no specific properties, but inherits those of its parent, Node, and implements those of the ParentNode interface.*

- [`ParentNode.children`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children) Read only

  Returns a live [`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) containing all objects of type [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) that are children of the `DocumentFragment` object.

- [`ParentNode.firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild) Read only

  Returns the [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) that is the first child of the `DocumentFragment` object, or `null` if there is none.

- [`ParentNode.lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/lastElementChild) Read only

  Returns the [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) that is the last child of the `DocumentFragment` object, or `null` if there is none.

- [`ParentNode.childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/childElementCount) Read only

  Returns an `unsigned long` giving the amount of children that the `DocumentFragment`has.

## Constructor

- [`DocumentFragment()`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/DocumentFragment) 

  Returns an empty `DocumentFragment` object.

## Methods

This interface inherits the methods of its parent, Node, and implements those of the ParentNode interface.

- [`DocumentFragment.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelector)

  Returns the first [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) node within the `DocumentFragment`, in document order, that matches the specified selectors.

- [`DocumentFragment.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelectorAll)

  Returns a [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) of all the [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) nodes within the `DocumentFragment` that match the specified selectors.

- [`DocumentFragment.getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/getElementById)

  Returns the first [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) node within the `DocumentFragment`, in document order, that matches the specified ID.

## Specifications

| Specification                                                | Status          | Comment                                                      |
| ------------------------------------------------------------ | --------------- | ------------------------------------------------------------ |
| [DOM The definition of 'DocumentFragment' in that specification.](https://dom.spec.whatwg.org/#interface-documentfragment) | Living Standard | Added the constructor and the implementation of [`ParentNode`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode). |
| [Selectors API Level 1 The definition of 'DocumentFragment' in that specification.](https://www.w3.org/TR/selectors-api/#the-apis) | Obsolete        | Added the `querySelector()` and `querySelectorAll()` methods. |
| [Document Object Model (DOM) Level 3 Core Specification The definition of 'DocumentFragment' in that specification.](https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-B63ED1A3) | Obsolete        | No change from [Document Object Model (DOM) Level 2 Core Specification](https://www.w3.org/TR/DOM-Level-2-Core/) |
| [Document Object Model (DOM) Level 2 Core Specification The definition of 'DocumentFragment' in that specification.](https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-B63ED1A3) | Obsolete        | No change from [Document Object Model (DOM) Level 1 Specification](https://www.w3.org/TR/REC-DOM-Level-1/) |
| [Document Object Model (DOM) Level 1 Specification The definition of 'DocumentFragment' in that specification.](https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-B63ED1A3) | Obsolete        | Initial definition                                           |