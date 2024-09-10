import { Renderer } from '../src/render'

Renderer.create()
console.log([0, 0],
    [100, 100],
    [20, 20],
    [0, 0])

Renderer.poly([
    [0, 0],
    [100, 100],
    [20, 20],
    [0, 0]
])

Renderer.line(10, 10, 100, 60)