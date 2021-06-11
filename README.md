<div align="center">
    <div> <img width="180" src="./resources/logo/unrail-engine.svg" alt="Unrail Engine logo"></div>
    <h1 style="margin: .5em"><b>Unrail Engine</b></h1>
    <a href="https://badge.fury.io/js/unrail-engine"><img src="https://badge.fury.io/js/unrail-engine.svg" alt="npm version"/></a>
    <a href="https://www.npmjs.com/package/unrail-engine"><img src="https://badgen.net/npm/dt/unrail-engine" alt="npm downloads"/></a>
</div>

**Unrail Engine** is a lightweight 2D game engine written in Typescript during a train ride.

It contains (or will soon contains) :
-   Core
-   Renderer (based on Canvas/OffscreenCanvas rendering & dynamics html `<span>` for the interface)
-   Event System (native and custom events)
-   Grid System
-   Stats
-   Configuration
-   Physics (maybe)
-   Particle System

Examples can be found at [/test](./test/). The engine is written using test driven development. Currently there is no test automatisation but the aim is to develop E2E efficient tests.

## Documentation

The full documentation is available [here](https://d0rianb.github.io/UnrailEngine/).

### Create a game

```ts
// main.ts
const { width, height } = getWindowDimensions() // Had to be imported
const env: Env = new Env(width, height) // Create an environment for the game
const game: Game = new Game('Game Name', env)

game.setMainLoop(() => env.update()) // register a main loop
game.start()
```

### Event System

```ts
import { Event } from 'unrail-engine/events'

// Key Events
Event.onKeyDown('ArrowLeft', e => callback(e)) // While key is down
Event.onKeyPressed('<keyCode>', e => callback(e)) // Fired once

// Custom Events
Event.emit('custom-event-name', params)
Event.on('custom-event-name', callback)
```

### Renderer

-   The `Renderer` object is a classic optimize canvas 2D renderer.
-   The `OffscreenRenderer` uses the `OffscreenCanvas` API and web worker to run in a different thread.

```ts
// Choose one or the other
import { Renderer } from 'unrail-engine/render'                      // classic canvas renderer
import { OffscreenRenderer as Renderer } from 'unrail-engine/render' // better performance

let style: StyleObject = { // Canvas2DContext options from : https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    fillStyle?: string,
    globalAlpha?: number,
    globalCompositeOperation?: string
}

// Create a canvas & init the Renderer
Renderer.create(width, height)

// Renderer is a static class. Here are the different methods
Renderer.clear()
Renderer.rect(x, y, width, height, style?)
Renderer.line(point1, point2, style?)
Renderer.poly(pointArray, style?)
Renderer.circle(x, y, radius, style?)
Renderer.point(x, y, style?)
Renderer.rectSprite(x, y, width, height, texture)
Renderer.circleSprite(x, y, radius, texture)
Renderer.tint(color, x, y, width, height)      // tint a rect width a color

```

### Interface

```ts
import { Interface } from 'unrail-engine/render'

let value = 'some value'

Interface.addItem(() => `Value : ${value}`, position, { CSSproperties })
// position is a string : 'top-left', 'top-right', 'bottom-left', 'bottom-right' or 'custom'
// CSSproperties is an object containing { css-attribute: value }

// Example :
Interface.addItem(() => `Iteration : ${i++}`, 'top-left', { color: '#999' })
```

---

2020 © Dorian Beauchesne
