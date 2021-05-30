import { Game, getWindowDimensions, Renderer } from '../src'

let { width, height } = getWindowDimensions()
let gap = width / 20

function grid() {
    for (let i = 0; i < 50; i++) {
        Renderer.line(i * gap, 0, i * gap, height, { lineWidth: .5, strokeStyle: '#999', })
        Renderer.line(0, i * gap, width, i * gap, { lineWidth: .5, strokeStyle: '#999', })
    }
}

function draw() {
    grid()
    Renderer.rect(gap, gap, 5 * gap, 5 * gap, { strokeStyle: 'red' })
    // Renderer.rectFromCenter(gap, gap, 30, 30, { strokeStyle: 'red' })
    // Renderer.rectFromPoints(gap - 2, gap - 2, 2 * gap + 2, 2 * gap + 2, { strokeStyle: 'red' })
    Renderer.circleFromRect(gap, gap, 5 * gap, 5 * gap, { strokeStyle: 'blue' })
    Renderer.line(gap, gap, 6 * gap, 6 * gap, { strokeStyle: 'green' })
    Renderer.line(gap, 6 * gap, 6 * gap, gap, { strokeStyle: 'green' })
}

let game = new Game('Test Rect')
Renderer.create()
game.setMainLoop(draw)
game.toggleStats()
game.setFPS(1)
game.start()