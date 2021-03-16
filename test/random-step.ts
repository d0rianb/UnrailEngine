import { getWindowDimensions } from '../src'
import { Random, Vector2 } from '../src/core/math'

import { Renderer } from '../src/render'

const { width, height } = getWindowDimensions()

let pos = [new Vector2(width / 2, height)]
const step = 5
let offset = 0
Renderer.create(width, height)

// TODO : add interface

function update(ts: number) {
    let dir = Random.choice([-1, 1])
    let position = pos[pos.length - 1].clone()
    position.x += step * dir
    position.y -= step
    pos.push(position)
    if (position.y < height / 5) {
        pos.forEach(p => p.y += offset)
        offset += step
    }
    // console.log((position.x - width / 2) / 5) // Sn
    Renderer.clear()
    Renderer.line(new Vector2(width / 2, 0), new Vector2(width / 2, height), { strokeStyle: 'red', globalAlpha: .25 })
    Renderer.poly(pos)
}

window.setInterval(update, 100)