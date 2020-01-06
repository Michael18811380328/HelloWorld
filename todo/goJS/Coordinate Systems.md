# Coordinate Systems

A [Diagram](https://gojs.net/latest/api/symbols/Diagram.html) uses two major coordinate systems when drawing [Part](https://gojs.net/latest/api/symbols/Part.html)s: document and view coordinates. Furthermore each [Panel](https://gojs.net/latest/api/symbols/Panel.html) within a [Part](https://gojs.net/latest/api/symbols/Part.html) has its own coordinate system that its elements use.

All coordinate systems in **GoJS** have [Point](https://gojs.net/latest/api/symbols/Point.html)s with increasing values of X going rightwards and increasing values of Y going downwards.

## Document and View coordinates

The [Part.location](https://gojs.net/latest/api/symbols/Part.html#location) and [GraphObject.actualBounds](https://gojs.net/latest/api/symbols/GraphObject.html#actualBounds) and [GraphObject.position](https://gojs.net/latest/api/symbols/GraphObject.html#position) of Parts are in document coordinates. Thus the [Point](https://gojs.net/latest/api/symbols/Point.html)s that may be saved in the model's node data are normally in document coordinates:

```js
  diagram.model.nodeDataArray = [
    { key: "Alpha", loc: "0 0" },
    { key: "Beta", loc: "100 50" }
  ];
```

But a Part with a [Part.location](https://gojs.net/latest/api/symbols/Part.html#location) of (0, 0) in document coordinates is not always drawn at the top-left corner of the HTML Div element that the user sees in the page. When the user scrolls the diagram the part will need to be drawn elsewhere on the canvas. And if the user zooms in to make the parts appear larger, the parts will be drawn at different points in the canvas. Yet the [Part.location](https://gojs.net/latest/api/symbols/Part.html#location) does not change value as the user scrolls or zooms the diagram.

Points in the canvas are in view coordinates: distances from the top-left corner in device-independent pixels. The differences between document coordinates and view coordinates are primarily controlled by two [Diagram](https://gojs.net/latest/api/symbols/Diagram.html) properties: [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position) and [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale). Scrolling and panning change the Diagram.position. Zooming in or out changes the Diagram.scale. You can also convert between coordinate systems by calling [Diagram.transformDocToView](https://gojs.net/latest/api/symbols/Diagram.html#transformDocToView) and [Diagram.transformViewToDoc](https://gojs.net/latest/api/symbols/Diagram.html#transformViewToDoc). However very few properties and method arguments or return values are in view coordinates -- almost everything is in document coordinates or in panel coordinates.

The *viewport* is the area of the document that is visible in the canvas. That area is available as the [Diagram.viewportBounds](https://gojs.net/latest/api/symbols/Diagram.html#viewportBounds). Note that the viewport bounds is in document coordinates, not in view coordinates! The top-left corner of the viewport is (0,0) in view coordinates but is at [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position) in document coordinates. The bottom-right corner of the viewport is at the canvas's (width,height) in view coordinates. The bottom-right corner of the viewport in document coordinates depends on the [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale).

As an example of showing the viewport in the context of the whole document, an [Overview](https://gojs.net/latest/api/symbols/Overview.html) does exactly that. Take a look at the overview that is in the [Org Chart sample](https://gojs.net/latest/samples/orgChartStatic.html). The overview shows the whole document of the main diagram. The magenta box shows the main diagram's viewport within the whole document. As you scroll or pan the main diagram, the viewport moves. As you zoom out, the viewport gets larger.

To better understand the difference between document and viewport coordinates, look at this diagram:

## Coordinate systems example

This example shows three Parts at three different locations in document coordinates. Pass the mouse over each of the parts to see where those locations are in view coordinates. Initially you will see that the only difference between document and view coordinates are a constant offset. That offset is due to the [Diagram.padding](https://gojs.net/latest/api/symbols/Diagram.html#padding) that puts a little space between the edge of the canvas and the edge of where the diagram's objects are. It is also due to [Part.locationSpot](https://gojs.net/latest/api/symbols/Part.html#locationSpot) having the location be at the center of the "+" Shape, not at the top-left corner of the whole Part.

```js
  // read-only to avoid accidentally moving any Part in document coordinates
  diagram.isReadOnly = true;

  diagram.nodeTemplate =
    $(go.Part,  // no links or grouping, so use the simpler Part class instead of Node
      {
        locationSpot: go.Spot.Center, locationObjectName: "SHAPE",
        layerName: "Background",
        mouseOver: function (e, obj) { showPoint(obj.part.location); },
        click: function (e, obj) { showPoint(obj.part.location); }
      },
      new go.Binding("location", "loc", go.Point.parse),
      $(go.Shape, "PlusLine",
        { name: "SHAPE", width: 8, height: 8 }),
      $(go.TextBlock,
        { position: new go.Point(6, 6), font: "8pt sans-serif" },
        new go.Binding("text", "loc"))
    );

  diagram.model.nodeDataArray = [
    { loc: "0 0" },
    { loc: "100 0" },
    { loc: "100 50" }
  ];

  function showPoint(loc) {
    var docloc = diagram.transformDocToView(loc);
    var elt = document.getElementById("Message1");
    elt.textContent = "Selected node location,\ndocument coordinates: " + loc.x.toFixed(2) + " " + loc.y.toFixed(2) +
                      "\nview coordinates: " + docloc.x.toFixed(2) + " " + docloc.y.toFixed(2);
  }

  myDiagram = diagram;  // make accessible to the HTML buttons
```

 

 



Then try scrolling or zooming in and looking at the locations of those parts in view coordinates. Zooming in increases the [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale) by a small factor. That changes the locations in view coordinates, even though the locations in document coordinates did not change.

To "move" a node one must change its [GraphObject.position](https://gojs.net/latest/api/symbols/GraphObject.html#position) or [Part.location](https://gojs.net/latest/api/symbols/Part.html#location) in document coordinates. To "scroll" a diagram one must change the [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position). Either way will cause a node to appear at a different point in the viewport.

## Document bounds

All of the [Part](https://gojs.net/latest/api/symbols/Part.html)s of a diagram have positions and sizes (i.e. their [GraphObject.actualBounds](https://gojs.net/latest/api/symbols/GraphObject.html#actualBounds)) in document coordinates. The union of all of those parts' actualBounds constitutes the [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds). If all of the parts are close together, the document bounds might be small. If some or all of the parts are far apart from each other, the document bounds might be large, even if there are only two parts or if there is just one really large part. The [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds) value is independent of the [Diagram.viewportBounds](https://gojs.net/latest/api/symbols/Diagram.html#viewportBounds). The former only depends on the bounds of the parts; the latter only depends on the size of the canvas and the diagram's position and scale.

[Diagram.computeBounds](https://gojs.net/latest/api/symbols/Diagram.html#computeBounds), which is responsible for the bounds computation, also adds the [Diagram.padding](https://gojs.net/latest/api/symbols/Diagram.html#padding) Margin so that no Parts appear directly up against the edge of the diagram when scrolled to that side. You may want to keep some parts, particularly background decorations, from being included in the document bounds computation. Just set [Part.isInDocumentBounds](https://gojs.net/latest/api/symbols/Part.html#isInDocumentBounds) to false for such parts.

The diagram does not compute a new value for [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds) immediately upon any change to any part or the addition or removal of a part. Thus the [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds) property value may not be up-to-date until after a transaction completes.

The relative sizes of the [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds) and [Diagram.viewportBounds](https://gojs.net/latest/api/symbols/Diagram.html#viewportBounds) control whether or not scrollbars are needed. You can set [Diagram.hasHorizontalScrollbar](https://gojs.net/latest/api/symbols/Diagram.html#hasHorizontalScrollbar) and/or [Diagram.hasVerticalScrollbar](https://gojs.net/latest/api/symbols/Diagram.html#hasVerticalScrollbar) to false to make sure no scrollbar appears even when needed.

If you do not want the [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds) to always reflect the sizes and locations of all of the nodes and links, you can set the [Diagram.fixedBounds](https://gojs.net/latest/api/symbols/Diagram.html#fixedBounds) property. However if there are any nodes that are located beyond the fixedBounds, the user may be unable to scroll the diagram to see them.

If you want to be notified whenever the document bounds changes, you can register a "DocumentBoundsChanged" [DiagramEvent](https://gojs.net/latest/api/symbols/DiagramEvent.html) listener.

## Viewport bounds

The [Diagram.viewportBounds](https://gojs.net/latest/api/symbols/Diagram.html#viewportBounds) always has x and y values that are given by the [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position). It always has width and height values that are computed from the canvas size and the [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale).

Users can scroll the document contents using keyboard commands, scrollbars or panning. Programmatically, you can scroll using several means:

- setting [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position)
- calling [Diagram.scrollToRect](https://gojs.net/latest/api/symbols/Diagram.html#scrollToRect) or [Diagram.centerRect](https://gojs.net/latest/api/symbols/Diagram.html#centerRect) or [Diagram.scroll](https://gojs.net/latest/api/symbols/Diagram.html#scroll)
- calling [Diagram.alignDocument](https://gojs.net/latest/api/symbols/Diagram.html#alignDocument)
- setting [Diagram.contentAlignment](https://gojs.net/latest/api/symbols/Diagram.html#contentAlignment)
- calling [CommandHandler.scrollToPart](https://gojs.net/latest/api/symbols/CommandHandler.html#scrollToPart)

Furthermore, scrolling may happen automatically as nodes or links are added to or removed from or change visibility in the diagram. Also, zooming will typically result in scrolling as well.

When scrolling, the [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position) normally will be limited to the range specified by the [Diagram.documentBounds](https://gojs.net/latest/api/symbols/Diagram.html#documentBounds). The short or "line" scrolling distance is controlled by [Diagram.scrollHorizontalLineChange](https://gojs.net/latest/api/symbols/Diagram.html#scrollHorizontalLineChange) and [Diagram.scrollVerticalLineChange](https://gojs.net/latest/api/symbols/Diagram.html#scrollVerticalLineChange). The long or "page" scrolling distance is controlled by the size of the viewport. If you want to control the precise values that the [Diagram.position](https://gojs.net/latest/api/symbols/Diagram.html#position) may have, you can specify a [Diagram.positionComputation](https://gojs.net/latest/api/symbols/Diagram.html#positionComputation) function. See the example below.

User can zoom in or out using keyboard commands, mouse wheel, or pinching. Programmatically, you can zoom using several means:

- setting [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale)
- calling [Diagram.zoomToFit](https://gojs.net/latest/api/symbols/Diagram.html#zoomToFit) or [Diagram.zoomToRect](https://gojs.net/latest/api/symbols/Diagram.html#zoomToRect)
- setting [Diagram.autoScale](https://gojs.net/latest/api/symbols/Diagram.html#autoScale)
- calling [CommandHandler.decreaseZoom](https://gojs.net/latest/api/symbols/CommandHandler.html#decreaseZoom), [CommandHandler.increaseZoom](https://gojs.net/latest/api/symbols/CommandHandler.html#increaseZoom), [CommandHandler.resetZoom](https://gojs.net/latest/api/symbols/CommandHandler.html#resetZoom), or [CommandHandler.zoomToFit](https://gojs.net/latest/api/symbols/CommandHandler.html#zoomToFit)

When zooming in or out, the [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale) normally will be limited to the range given by [Diagram.minScale](https://gojs.net/latest/api/symbols/Diagram.html#minScale) and [Diagram.maxScale](https://gojs.net/latest/api/symbols/Diagram.html#maxScale). If you want to control the precise values that the [Diagram.scale](https://gojs.net/latest/api/symbols/Diagram.html#scale) may have, you can specify a [Diagram.scaleComputation](https://gojs.net/latest/api/symbols/Diagram.html#scaleComputation) function. See the example below.

If you want to be notified whenever the viewport bounds changes, you can register a "ViewportBoundsChanged" [DiagramEvent](https://gojs.net/latest/api/symbols/DiagramEvent.html) listener.

## Scroll margin

[Diagram.scrollMargin](https://gojs.net/latest/api/symbols/Diagram.html#scrollMargin) allows the user to scroll into empty space at the edges of the viewport, when the document bounds (plus margin) is greater than the viewport bounds. This can be useful when users need extra space at the edges of a Diagram, for instance to have an area to create new nodes with the [ClickCreatingTool](https://gojs.net/latest/api/symbols/ClickCreatingTool.html).

[Diagram.padding](https://gojs.net/latest/api/symbols/Diagram.html#padding) is added as if part of the document bounds, whereas `scrollMargin` makes sure you can scroll to empty space beyond the document bounds. Because of this, `scrollMargin` does not create additional scrollable empty space if none is needed to scroll the margin distance beyond, such as when the document bounds are very small in the viewport.

Below is a Diagram with `scrollMargin` set to `100`. As you drag to the boundary, you will find the additional space created by the margin.

## Scrolling modes

[Diagram.scrollMode](https://gojs.net/latest/api/symbols/Diagram.html#scrollMode) allows the user to either scroll to document bound borders with [Diagram.DocumentScroll](https://gojs.net/latest/api/symbols/Diagram.html#static-DocumentScroll) (the default), or scroll endlessly with [Diagram.InfiniteScroll](https://gojs.net/latest/api/symbols/Diagram.html#static-InfiniteScroll).

[Diagram.positionComputation](https://gojs.net/latest/api/symbols/Diagram.html#positionComputation) and [Diagram.scaleComputation](https://gojs.net/latest/api/symbols/Diagram.html#scaleComputation) allow you to determine what positions and scales are acceptable to be scrolled to. For instance, you could allow only integer position values, or only allow scaling to the values of 0.5, 1, or 2.

The [Scroll Modes sample](https://gojs.net/latest/samples/scrollModes.html) displays all the code for the example below, which lets you toggle these three properties.

Enable Infinite Scrolling, setting [Diagram.scrollMode](https://gojs.net/latest/api/symbols/Diagram.html#scrollMode)

```js
  myDiagram.scrollMode = checked ? go.Diagram.InfiniteScroll : go.Diagram.DocumentScroll;
```

Enable [Diagram.positionComputation](https://gojs.net/latest/api/symbols/Diagram.html#positionComputation) function

```js
  function positionfunc(diagram, pos) {
    var size = diagram.grid.gridCellSize;
    return new go.Point(
      Math.round(pos.x / size.width) * size.width,
      Math.round(pos.y / size.height) * size.height);
  }
```

Enable [Diagram.scaleComputation](https://gojs.net/latest/api/symbols/Diagram.html#scaleComputation) function

```js
  function scalefunc(diagram, scale) {
    var oldscale = diagram.scale;
    if (scale > oldscale) {
      return oldscale + 0.25;
    } else if (scale < oldscale) {
      return oldscale - 0.25;
    }
    return oldscale;
  }
```

## Panel coordinates

A [GraphObject](https://gojs.net/latest/api/symbols/GraphObject.html) that is not a [Part](https://gojs.net/latest/api/symbols/Part.html) but is an element of a [Panel](https://gojs.net/latest/api/symbols/Panel.html) has measurements that are in panel coordinates, not in document coordinates. That means that [GraphObject.position](https://gojs.net/latest/api/symbols/GraphObject.html#position), [GraphObject.actualBounds](https://gojs.net/latest/api/symbols/GraphObject.html#actualBounds), [GraphObject.maxSize](https://gojs.net/latest/api/symbols/GraphObject.html#maxSize), [GraphObject.minSize](https://gojs.net/latest/api/symbols/GraphObject.html#minSize), [GraphObject.measuredBounds](https://gojs.net/latest/api/symbols/GraphObject.html#measuredBounds), [GraphObject.margin](https://gojs.net/latest/api/symbols/GraphObject.html#margin), and [RowColumnDefinition](https://gojs.net/latest/api/symbols/RowColumnDefinition.html) properties apply to all elements of a panel using the same coordinate system.

Some [GraphObject](https://gojs.net/latest/api/symbols/GraphObject.html) properties use units that have values before they are transformed for use by the containing [Panel](https://gojs.net/latest/api/symbols/Panel.html)'s coordinate system. In particular, [GraphObject.desiredSize](https://gojs.net/latest/api/symbols/GraphObject.html#desiredSize) (which means [GraphObject.width](https://gojs.net/latest/api/symbols/GraphObject.html#width) and [GraphObject.height](https://gojs.net/latest/api/symbols/GraphObject.html#height)), [GraphObject.naturalBounds](https://gojs.net/latest/api/symbols/GraphObject.html#naturalBounds), [Shape.geometry](https://gojs.net/latest/api/symbols/Shape.html#geometry), and [Shape.strokeWidth](https://gojs.net/latest/api/symbols/Shape.html#strokeWidth) are in "local" coordinates, before the object is scaled and rotated by the value of [GraphObject.scale](https://gojs.net/latest/api/symbols/GraphObject.html#scale) and [GraphObject.angle](https://gojs.net/latest/api/symbols/GraphObject.html#angle).

[GraphObject.actualBounds](https://gojs.net/latest/api/symbols/GraphObject.html#actualBounds) will tell you the position and size of an element within its panel. If you want to get the document position of some object that is within a Node, call [GraphObject.getDocumentPoint](https://gojs.net/latest/api/symbols/GraphObject.html#getDocumentPoint).

For examples of the sizes of elements in a panel, see [Sizing GraphObjects](https://gojs.net/latest/intro/sizing.html).

### Nested Panel coordinates

The transformations of each element in a [Panel](https://gojs.net/latest/api/symbols/Panel.html) are compounded by that panel's transformations.

The [TextBlock](https://gojs.net/latest/api/symbols/TextBlock.html) that is "Bottom" has the default [GraphObject.angle](https://gojs.net/latest/api/symbols/GraphObject.html#angle) of zero, so that the text is drawn upright. But that TextBlock is an element in the green "Spot" [Panel](https://gojs.net/latest/api/symbols/Panel.html) whose [GraphObject.angle](https://gojs.net/latest/api/symbols/GraphObject.html#angle) to 30, so it and its text should appear somewhat tilted. However the blue "Vertical" Panel itself has an [GraphObject.angle](https://gojs.net/latest/api/symbols/GraphObject.html#angle) of 165. Because each Panel has its own coordinate system and because transformations on nested elements are compounded, the effective angle for the green Panel is 195 degrees, the sum of those individual angles (30 + 165), which is nearly upside down.

The [GraphObject.scale](https://gojs.net/latest/api/symbols/GraphObject.html#scale) property also affects how an object is sized in its container Panel. The brown "Position" [Panel](https://gojs.net/latest/api/symbols/Panel.html) has a scale of 0.8 relative to its container. But because the "Vertical" Panel has a scale of 1.5, its effective scale is 1.2 overall, the product of those individual scales (0.8 x 1.5).