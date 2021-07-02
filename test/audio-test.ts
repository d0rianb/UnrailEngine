import { Game, Interface, PlayerObject, GameObject, Event, Renderer, Sound, clamp } from '../src'

const SPEED = 5
const player = new PlayerObject(50, 50, 10)
const soundZone = new GameObject(100, 100, 200)
soundZone.width = 200
soundZone.height = 200

Event.onKeyDown('ArrowLeft', () => move(-1, 0))
Event.onKeyDown('ArrowRight', () => move(1, 0))
Event.onKeyDown('ArrowUp', () => move(0, -1))
Event.onKeyDown('ArrowDown', () => move(0, 1))

function move(dx, dy) {
    player.x += dx * SPEED
    player.y += dy * SPEED
}

function update() {
    if (player.collide(soundZone)) {
        sound.play()
    }
    render()
}

function render() {
    Renderer.beginFrame()
    Renderer.rect(player.x, player.y, player.width, player.height)
    Renderer.rect(soundZone.x, soundZone.y, soundZone.width, soundZone.height)
    Renderer.endFrame()
}

Renderer.create()
const game = new Game('Audio Test')
const sound = new Sound('../resources/sounds/ominous-drums.wav')
const button = Interface.addButton('Play Sound', () => {
    console.log('click')
    sound.play()
})
console.dir(sound)
game.setMainLoop(update)
game.toggleStats()
game.start()