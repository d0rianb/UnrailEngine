import { Game, getWindowDimensions } from '../src'
import { Random, Vector2 } from '../src/'
import { Interface, OffscreenRenderer as Renderer } from '../src/render'

const { width, height } = getWindowDimensions()

let pos = [new Vector2(width / 2, height)]
const step = 5
let annulation = 0
let min = 0
let max = 0
Renderer.create(width, height)

Interface.addItem(() => `Iteration : ${pos.length}`, 'top-left', { 'color': '#111', 'fontSize': '1em' })
Interface.addItem(() => `Sn : ${(pos[pos.length - 1].x - width / 2) / 5}`, 'top-left')
Interface.addItem(() => `Nombre d'annulation : ${annulation}`, 'top-left')
Interface.addItem(() => `Min : ${min}`, 'top-left')
Interface.addItem(() => `Max : ${max}`, 'top-left')


function update(ts: number) {
    let dir = Random.sign()
    let position = pos[pos.length - 1].clone()
    if (pos.length % 2 === 0) {
        position.x += step * dir
    } else {
        position.y -= step
    }
    pos.push(position)
    let realPosition = (pos[pos.length - 1].x - width / 2) / 5
    if (realPosition == 0) {
        annulation++
    }
    max = Math.max(max, realPosition)
    min = Math.min(min, realPosition)
    if (position.y < height / 5) {
        pos.forEach(p => p.y += step)
    }
    Renderer.clear()
    Renderer.line(width / 2, 0, width / 2, height, { strokeStyle: 'red', globalAlpha: .25 })
    Renderer.poly(pos)
    Renderer.endFrame()
}

let game = new Game('Random Step')
game.setMainLoop(update)
game.toggleStats(false)
game.start()