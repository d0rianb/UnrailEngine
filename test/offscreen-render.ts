// Test for the offscreen renderer

import { GameEnvironement, createCanvas, getWindowDimensions, Game } from "../src"
import { OffscreenRenderer as Renderer } from "../src/render"

class Env extends GameEnvironement {
    canvas: HTMLCanvasElement
    constructor(width, height) {
        super(width, height)
        this.canvas = createCanvas(width, height, 1)

        const main = document.createElement('main')
        main.setAttribute('id', 'app')
        main.appendChild(this.canvas)
        document.querySelector('body').appendChild(main)
    }

    update() { }
}


// main.ts
const { width, height } = getWindowDimensions()
const env = new Env(width, height)
const game = new Game(env)
Renderer.transferTo(env.canvas, width, height)
Renderer.circle(100, 100, 50, { fillStyle: 'red' })

game.setMainLoop(() => env.update())
game.start()
