# API

*New to React DnD? [Read the overview](https://react-dnd.github.io/react-dnd/docs/overview) before jumping into the docs.*

# useDrag

A hook to use the current component as a drag-source.

```jsx
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collectedProps, drag] = useDrag({
    item: { id, type },
  })
  return <div ref={drag}>...</div>
}
```

#### Parameters

- **`spec`**A specification object, see below for details on how to construct this

#### Return Value Array

- **`Index 0`**: An object containing collected properties from the collect function. If no `collect`function is defined, an empty object is returned.
- **`Index 1`**: A connector function for the drag source. This must be attached to the draggable portion of the DOM.
- **`Index 2`**: A connector function for the drag preview. This may be attached to the preview portion of the DOM.

### Specification Object Members

- **`item`**: Required. A plain JavaScript object describing the data being dragged. This is the *only* information available to the drop targets about the drag source so it's important to pick the *minimal* data they need to know. You may be tempted to put a complex reference here, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like `{ type, id }`from this method.

  `item.type`**must be set**, and it must be either a string, an ES6 symbol. Only the [drop targets](https://react-dnd.github.io/react-dnd/docs/api/drop-target) registered for the same type will react to this item. Read the [overview](https://react-dnd.github.io/react-dnd/docs/overview) to learn more about the items and types.

- **`previewOptions`**: Optional. A plain JavaScript object describing drag preview options.

- **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)`function inside the`options`object can improve the performance. Unless you have performance problems, don't worry about it.

- **`begin(monitor)`**: Optional. Fired when a drag operation begins. Nothing needs to be returned, but if an object is returned it will override the default `item`property of the spec.

- **`end(item, monitor)`**: Optional. When the dragging stops, `end`is called. For every `begin`call, a corresponding `end`call is guaranteed. You may call `monitor.didDrop()`to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a *drop result* by returning a plain object from its `drop()`method, it will be available as `monitor.getDropResult()`. This method is a good place to fire a Flux action. *Note: If the component is unmounted while dragging, `component`parameter is set to be `null`.*

- **`canDrag(monitor)`**: Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over `props`. *Note: You may not call `monitor.canDrag()`inside this method.*

- **`isDragging(monitor)`**: Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom `isDragging`method. It might return something like `props.id === monitor.getItem().id`. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. *Note: You may not call `monitor.isDragging()`inside this method.*

- **`collect`**: Optional. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor`and `props`. Read the [overview](https://react-dnd.github.io/react-dnd/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.



# useDrop

A hook to use the current component as a drop target.

```jsx
import { useDrop } from 'react-dnd'

function myDropTarget(props) {
  const [collectedProps, drop] = useDrop({
    accept,
  })

  return <div ref={drop}>Drop Target</div>
}
```

#### Parameters

- **`spec`**A specification object, see below for details on how to construct this

#### Return Value Array

- **`Index 0`**: An object containing collected properties from the collect function. If no `collect`function is defined, an empty object is returned.
- **`Index 1`**: A connector function for the drop target. This must be attached to the drop-target portion of the DOM.

### Specification Object Members

- **`accept`**: Required. A string, an ES6 symbol, an array of either, or a function that returns either of those, given component's `props`. This drop target will only react to the items produced by the [drag sources](https://react-dnd.github.io/react-dnd/docs/api/drag-source) of the specified type or types. Read the [overview](https://react-dnd.github.io/react-dnd/docs/overview) to learn more about the items and types.
- **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)`function inside the `options`object can improve the performance. Unless you have performance problems, don't worry about it.
- **`drop(item, monitor)`**: Optional. Called when a compatible item is dropped on the target. You may either return undefined, or a plain object. If you return an object, it is going to become *the drop result* and will be available to the drag source in its `endDrag`method as `monitor.getDropResult()`. This is useful in case you want to perform different actions depending on which target received the drop. If you have nested drop targets, you can test whether a nested target has already handled `drop`by checking `monitor.didDrop()`and `monitor.getDropResult()`. Both this method and the source's `endDrag`method are good places to fire Flux actions. This method will not be called if `canDrop()`is defined and returns `false`.
- **`hover(item, monitor)`**: Optional. Called when an item is hovered over the component. You can check `monitor.isOver({ shallow: true })`to test whether the hover happens over *just* the current target, or over a nested one. Unlike `drop()`, this method will be called even if `canDrop()`is defined and returns `false`. You can check `monitor.canDrop()`to test whether this is the case.
- **`canDrop(item, monitor)`**: Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over `props`or `monitor.getItem()`. *Note: You may not call `monitor.canDrop()`inside this method.*
- **`collect`**: Optional. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor`and `props`. Read the [overview](https://react-dnd.github.io/react-dnd/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.



# useDragLayer

A hook to use the current component as a drag-layer.

```jsx
import { useDragLayer } from 'react-dnd'

function DragLayerComponent(props) {
  const collectedProps = useDragLayer(spec)
  return <div>...</div>
}
```

#### Parameters

- **`collect`**: Required. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor`and `props`. Read the [overview](https://react-dnd.github.io/react-dnd/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.

#### Return Value

An object of collected properties from the collect function.



# DndProvider

The DndProvider component provides React-DnD capabilities to your application. This must be injected with a backend via the `backend`prop, but it may can be injected with a `window`object.

### Usage

```jsx
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        /* Your Drag-and-Drop Application */
      </DndProvider>
    )
  }
}
```

### Props

- **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](https://react-dnd.github.io/react-dnd/docs/backends/html5) that ships with React DnD.
- **`context`**: Optional. The backend context used to configure the backend. This is dependent on the backend implementation.
- **`options`**: Optional. An options object used to configure the backend. This is dependent on the backend implementation.

# DragPreviewImage

A Component to render an HTML Image element as a disconnected drag preview.

### Usage

```jsx
import { DragSource, DragPreviewImage } from 'react-dnd'

function DraggableHouse({ connectDragSource, connectDragPreview }) {
  return (
    <>
      <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
      <div ref={connectDragSource}>🏠</div>
    </>
  )
}
export default DragSource(
  /* ... */
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
)
```

### Props

- **`connect`**: Required. The drag preview connector function

