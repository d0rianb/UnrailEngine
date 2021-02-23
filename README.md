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
const { width, height } = getWindowDimensions(); // Had to be imported
const env: Env = new Env(width, height); // Create an environment for the game
const game: Game = new Game(env);

game.setMainLoop(() => env.update()); // register a main loop
game.start();
```

### Event System

```ts
import { Event } from "unrail-engine/events";

// Key Events
Event.onKeyDown("ArrowLeft", (e) => callback(e)); // While key is down
Event.onKeyPressed("<keyCode>", (e) => callback(e)); // Fired once

// Custom Events
Event.emit("custom-event-name", params);
Event.on("custom-event-name", callback);
```

### Renderer

```ts
import { Renderer } from "unrail-engine/render";

Renderer.clear(ctx)
Renderer.rect(ctx, x, y, width, height, style?);
```

---

2020 &copy; Dorian Beauchesne
