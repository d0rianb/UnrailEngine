import { Game, getWindowDimensions } from '../src'
import { Random, Vector2 } from '../src/core/math'

import { Renderer } from '../src/render'

const { width, height } = getWindowDimensions()

let pos = [new Vector2(width / 2, height)]
const step = 5
Renderer.create(width, height)

// TODO : add interface

function update(ts: number) {
    let dir = Random.choice([-1, 1])
    let position = pos[pos.length - 1].clone()
    if (pos.length % 2 === 0) {
        position.x += step * dir
    } else {
        position.y -= step
    }
    pos.push(position)
    if (position.y < height / 5) {
        pos.forEach(p => p.y += step)
    }
    // console.log((position.x - width / 2) / 5) // Sn
    Renderer.clear()
    Renderer.line(new Vector2(width / 2, 0), new Vector2(width / 2, height), { strokeStyle: 'red', globalAlpha: .25 })
    Renderer.poly(pos)
}

let game = new Game('Random Step')
game.setMainLoop(update)
game.start()