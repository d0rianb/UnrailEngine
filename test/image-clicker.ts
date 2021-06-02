import {
    Game,
    getWindowDimensions,
    OffscreenRenderer as Renderer,
    Texture
} from '../src'

let cursor = {
    x: 0,
    y: 0
}

let rect = null
let i = 0

window.onmousemove = e => {
    cursor.x = e.clientX
    cursor.y = e.clientY
}

let { width, height } = getWindowDimensions()
const bgTexture = new Texture('../resources/assets/metro-vols.jpg')

function render() {
    Renderer.clear('#000')
    Renderer.rectSprite(0, 0, width, height, bgTexture)
    if (rect) {
        let radius = (rect.height + 2 * i) * Math.sqrt(2) / 2
        let width = rect.width + 2 * i
        Renderer.rectFromCenter(rect.x, rect.y, width, width, { strokeStyle: '#bbb', globalAlpha: 0.75 })
        Renderer.circleFromRect(rect.x - width / 2, rect.y - width / 2, width, width, { strokeStyle: '#bbb', globalAlpha: 0.75 })
    }
    Renderer.line(cursor.x, 0, cursor.x, height, { strokeStyle: '#bbb', globalAlpha: 0.75 })
    Renderer.line(0, cursor.y, width, cursor.y, { strokeStyle: '#bbb', globalAlpha: 0.75 })
    Renderer.endFrame()
}

function update() {
    render()
    i += 2
}

const game = new Game('Image Cursor')
Renderer.create(width, height)

window.addEventListener('click', e => {
    i = 0
    rect = { x: e.clientX, y: e.clientY, width: 10, height: 10 }
    setTimeout(() => rect = 0, 300)
})

game.setMainLoop(update)
game.setFPS(60)
game.start()