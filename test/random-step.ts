import { Game, getWindowDimensions } from '../src'
import { Random, Vector2 } from '../src/'
import { Interface, OffscreenRenderer as Renderer } from '../src/render'

const { width, height } = getWindowDimensions()

let pos = [new Vector2(width / 2, height)]
const step = 5
let annulation = 0
Renderer.create(width, height)

// TODO : add interface

Interface.addItem(() => `Iteration : ${pos.length}`)
Interface.addItem(() => `Sn : ${(pos[pos.length - 1].x - width / 2) / 5}`)
Interface.addItem(() => `Nombre d'annulation : ${annulation}`)

function update(ts: number) {
    let dir = Random.choice([-1, 1])
    let position = pos[pos.length - 1].clone()
    if (pos.length % 2 === 0) {
        position.x += step * dir
    } else {
        position.y -= step
    }
    pos.push(position)
    if (pos[pos.length - 1].x - width / 2 == 0) {
        annulation++
    }
    if (position.y < height / 5) {
        pos.forEach(p => p.y += step)
    }
    Renderer.clear()
    Renderer.line(new Vector2(width / 2, 0), new Vector2(width / 2, height), { strokeStyle: 'red', globalAlpha: .25 })
    Renderer.poly(pos)
}

let game = new Game('Random Step')
game.setMainLoop(update)
game.toggleStats(false)
game.start()