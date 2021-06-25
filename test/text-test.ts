import { OffscreenRenderer as Renderer } from '../src/render'

Renderer.create()
Renderer.beginFrame()
Renderer.text('test : regular', 100, 100)
Renderer.centeredText('test: center', 100, 200)
Renderer.line(100, 0, 100, 300, { lineWidth: .1 })
Renderer.line(0, 100, 300, 100, { lineWidth: .1 })
Renderer.line(0, 200, 300, 200, { lineWidth: .1 })
Renderer.endFrame()