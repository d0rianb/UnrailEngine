<div align="center">
    <div> <img width="180" src="./resources/logo/unrail-engine.svg" alt="Unrail Engine logo"></div>
    <h1 style="margin: .5em"><b>Unrail Engine</b></h1>
    <a href="https://badge.fury.io/js/unrail-engine"><img src="https://badge.fury.io/js/unrail-engine.svg" alt="npm version"/></a>
    <a href="https://www.npmjs.com/package/unrail-engine"><img src="https://badgen.net/npm/dt/unrail-engine" alt="npm downloads"/></a>
</div>

**Unrail Engine** is a modern and lightweight 2D game engine written in Typescript during a train ride.

This engine is not only for games, its modules can be used independently. For instance, the `render` module and the `interface` one can be used for an animated project.

The renderer is based on the __OffscreenCanvas API__ (currently not supported by Safari & Firefox). The render process is done in a DedicatedWorker which threads the process and speed up the operation.

Examples can be found at [/test](./test/). <br>
The engine is written using test driven development. Currently there is no test automatisation but the aim is to develop E2E efficient tests.

I   - [Getting Started](#getting-started)<br>
II  - [Documentation](#documentation)<br>
III - [Uses](#uses)<br>


## <a name="getting-started"></a>Getting Started
### Installation
To import the engine, you can include the script in your `index.html` file : 

```html
<!-- Production minified ~10kB gzipped -->
<script type="module" src="./unrail-engine.es.js" defer></script> 
```
Then import it like a regular moduel in your `.js` file : 
```ts 
import { /* Stuff you need */ } from './unrail-engine/dist/unrail-engine.es.js'
```

or via [NPM](https://www.npmjs.com/package/unrail-engine): 
```bash
npm i --save unrail-engine
```
and import it as an ES module : (the types are included in the package)
```ts 
import { /* Stuff you need */ } from 'unrail-engine'
```

### Starting a game
The UnrailEngine entry point is the `Game` object. With this object, all the modules will be instantiated and will work properly.
All the objects have to be imported first.

```ts 
import { Game } from 'unrail-engine'

let game = new Game('Game name')
```

Then you can register a main loop which will be called the right amout of time to respecct the fps limitation (which can be set by the `game.setFPS(fpsNumber)` method - default is 60fps)

```ts 
function update(deltaTime) {
    // Do the update & render job here
}

game.setMainLoop(update)
```

Then just call `game.start()` and there you go.
## <a name="documentation"></a>Documentation

>The full documentation is available [here](https://d0rianb.github.io/UnrailEngine/).


```ts
// main.ts
const { width, height } = getWindowDimensions() // Had to be imported
const env = new Env(width, height) // Create an environment for the game
const game = new Game('Game Name', env)

game.setMainLoop(() => env.update()) // register a main loop
game.start()
```

### Event System

The event system is usefull to communicate between differente classes or objects.<br>
Native events are handled by the system.<br>
The keydown management ideo comes from [keydrown](https://github.com/jeremyckahn/keydrown) and eliminate the delay when long pressing a key.<br>

```ts
import { Event } from 'unrail-engine'

// Key Events
Event.onKeyDown('ArrowLeft', e => callback(e)) // While key is down
Event.onKeyPressed('<keyCode>', e => callback(e)) // Fired once

// Custom Events
Event.emit('custom-event-name', params)
Event.on('custom-event-name', callback)
```

### Renderer
The UnrailEngine currently supports 2 render methods : (_WebGL_ rendering is planned) <br>
-   The `Renderer` object is a classic optimized canvas 2D renderer.<br>
-   The `OffscreenRenderer` uses the `OffscreenCanvas` API and web worker to run in a different thread.<br>
Both renderer uses the same methods name so switching from one to another is as simple as replacing an import alias.<br>
```ts 
// Choose one or another
import { Renderer } from 'unrail-engine'                      // to use the regular renderer
import { OffscreenRenderer as Renderer } from 'unrail-engine' // to use the multithreaded renderer for better performances
```

```ts
let style: StyleObject = { // Canvas2DContext options from : https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    fillStyle?: string,
    globalAlpha?: number,
    globalCompositeOperation?: string
}

// Create a canvas & init the Renderer
Renderer.create()               // To create a canvas with the dimension of the window
Renderer.create(width, height)  // To create a canvas with custom dimensions
Renderer.createFromCanvas('#canvas')  // To create a Renderer from an existing canvas

// Renderer is a static class. Here are the different methods
Renderer.clear()
Renderer.rect(x, y, width, height, style?)
Renderer.line(x1, y1, x2, y2, style?)
Renderer.poly(pointArray, style?)
Renderer.circle(x, y, radius, style?)
Renderer.point(x, y, style?)
Renderer.rectSprite(x, y, width, height, texture)
Renderer.circleSprite(x, y, radius, texture)
Renderer.tint(color, x, y, width, height)      // tint a rect width a color
```

### Interface

```ts
import { Interface } from 'unrail-engine'

let value = 'some value'

Interface.addItem(() => `Value : ${value}`, position, { CSSproperties })
// position is a string : 'top-left', 'top-right', 'bottom-left', 'bottom-right' or 'custom'
// CSSproperties is an object containing { css-attribute: value }

// Example :
Interface.addItem(() => `Iteration : ${i++}`, 'top-left', { color: '#999' })
```

## <a name="uses"></a>Example
- The [Swatch Demo](https://github.com/d0rianb/SwatchDemo) uses the UnrailEngine for rendering & handling the update loop.
- The [TowerDefenseGame](https://github.com/d0rianb/TowerDefenseGame) & [Run&Gun](https://github.com/d0rianb/RunAndGun) will soon use the UnrailEngine too.

---

2021 © Dorian Beauchesne
