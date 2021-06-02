import { Animation, Easing, Game, getWindowDimensions, Renderer } from '../src'

const { width, height } = getWindowDimensions()
const NB_TEST = 4
const offset = 25
const dimension = (width - 2 * NB_TEST * offset) / NB_TEST

let linear_x = new Animation(0, dimension, 2000, Easing.linear, { autostart: true, loop: true })
let linear_y = new Animation(dimension, 0, 2000, Easing.linear, { autostart: true, loop: true })
let easeIn_y = new Animation(dimension, 0, 2000, Easing.easeIn, { autostart: true, loop: true })
let easeOut_y = new Animation(dimension, 0, 2000, Easing.easeOut, { autostart: true, loop: true })
let easeInOut_y = new Animation(dimension, 0, 2000, Easing.easeInOutBack, { autostart: true, loop: true })

function draw() {
    // Renderer.clear()

    Renderer.rect(offset, offset, dimension, dimension, { lineWidth: .5 })
    Renderer.circle(offset + linear_x.value, offset + linear_y.value, 1)

    Renderer.rect(dimension + 2 * offset, offset, dimension, dimension, { lineWidth: .5 })
    Renderer.circle(dimension + 2 * offset + linear_x.value, offset + easeIn_y.value, 1)

    Renderer.rect(2 * dimension + 3 * offset, offset, dimension, dimension, { lineWidth: .5 })
    Renderer.circle(2 * dimension + 3 * offset + linear_x.value, offset + easeOut_y.value, 1)

    Renderer.rect(3 * dimension + 4 * offset, offset, dimension, dimension, { lineWidth: .5 })
    Renderer.circle(3 * dimension + 4 * offset + linear_x.value, offset + easeInOut_y.value, 1)
}

const game = new Game('Animation Test')
Renderer.create()
game.setMainLoop(draw)
game.toggleStats()
game.setFPS(60)
game.start()