# Unrail Engine

**Unrail Engine** is a lightweight 2D game engine written in Typescript during a train ride.

It contains (or will soon contains) :

-   Core
-   Renderer (based on canvas rendering & _Vue_ for the interface)
-   Event System (native and custom events)
-   Grid System
-   Stats
-   Configuration
-   Physics
-   Particle System

Examples can be found at /test

## Documentation

### Create a game

```ts
// main.ts
const { width, height } = getWindowDimensions() // Had to be imported
const env: Env = new Env(width, height) // Create an environment for the game
const game: Game = new Game(env)

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

```ts
import { Renderer } from 'unrail-engine/render'

let style: StyleObject = { // Canvas2DContext options from : https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    fillStyle?: string,
    globalAlpha?: number,
    globalCompositeOperation?: string
}

Renderer.clear(ctx)
Renderer.rect(ctx, x, y, width, height, style?)
Renderer.line(ctx, point1, point2, style?)
Renderer.poly(ctx, pointArray, style?)
Renderer.circle(ctx, x, y, radius, style?)

```

---

2020 © Dorian Beauchesne
