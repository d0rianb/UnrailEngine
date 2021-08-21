import {
    AnimatedSprite,
    Game,
    Renderer,
    Event,
    getWindowDimensions,
    SpriteSheet
} from '../src'


let game = new Game('Sprite Sheet Test')
let spriteSheet = new SpriteSheet('../resources/assets/spritesheet.png', 6, 3)

Renderer.create()

let { width, height } = getWindowDimensions()

let idle = new AnimatedSprite(spriteSheet, [1, 1], [1, 1])
let walking = new AnimatedSprite(spriteSheet, [1, 2], [6, 2], { interval: 150, loop: true })
let jump = new AnimatedSprite(spriteSheet, [1, 3], [6, 3], { interval: 90 })
let crouch = new AnimatedSprite(spriteSheet, [1, 1], [4, 1], { interval: 50 })

let sprite = idle

Event.onKeyDown('ArrowDown', () => { crouch.run(); sprite = crouch })
Event.onKeyDown('ArrowUp', () => { jump.run(); sprite = jump })
Event.onKeyDown(['ArrowLeft', 'ArrowRight'], () => { walking.run(); sprite = walking })
Event.onAnyKeyReleased(() => {
    sprite.reset()
    sprite = idle
})

function render() {
    Renderer.clear()
    Renderer.rectSprite(10, 10, sprite.spriteWidth, sprite.spriteHeight, sprite)
}

game.setMainLoop(() => render())
game.start()
game.toggleStats()