// Test for the offscreen renderer

import { getWindowDimensions } from "../src"
import { OffscreenRenderer as Renderer } from "../src/render"

// main.ts
const { width, height } = getWindowDimensions()
Renderer.create(width, height)
let i = 0

window.setInterval(() => {
    i++
    Renderer.clear()
    Renderer.circle(100 + i, 100, 50, { fillStyle: 'red' })
}, 100)

